#!/usr/bin/env python3
"""
RückbauRadar pipeline entry point.

Runs all stages in order. Each stage is a separate, idempotent module.
Errors in one stage are logged but never abort subsequent stages.
Usage: python run_pipeline.py [--stages fetch,classify,score,geocode,embed,dedupe,publish]
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from typing import Any

import structlog

# Configure structured logging
structlog.configure(
    wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.JSONRenderer(),
    ],
)
log = structlog.get_logger()

STAGE_ORDER = ["fetch", "parse", "classify", "score", "geocode", "embed", "dedupe", "publish"]


def run_stage(name: str) -> dict[str, Any]:
    import importlib
    module = importlib.import_module(f"rueckbauradar.stages.{name}")
    return module.run()


def main() -> None:
    parser = argparse.ArgumentParser(description="RückbauRadar pipeline")
    parser.add_argument(
        "--stages",
        default=",".join(STAGE_ORDER),
        help="Comma-separated list of stages to run (default: all)",
    )
    args = parser.parse_args()

    stages = [s.strip() for s in args.stages.split(",") if s.strip()]
    total_tokens = 0
    run_stats: dict[str, Any] = {}

    log.info("pipeline_start", stages=stages)

    for stage in stages:
        if stage not in STAGE_ORDER:
            log.error("unknown_stage", stage=stage)
            continue

        t0 = time.monotonic()
        try:
            result = run_stage(stage)
            elapsed = time.monotonic() - t0
            run_stats[stage] = result
            log.info("stage_complete", stage=stage, elapsed_s=round(elapsed, 2), **result)
            if "tokens" in result:
                total_tokens += result["tokens"]
        except Exception as exc:
            elapsed = time.monotonic() - t0
            log.error("stage_failed", stage=stage, elapsed_s=round(elapsed, 2), error=str(exc))
            run_stats[stage] = {"error": str(exc)}

    log.info("pipeline_complete", total_tokens_used=total_tokens, stats=run_stats)


if __name__ == "__main__":
    main()
