'use strict';
const fs = require('fs'); const path = require('path');
const REPO_ROOT = path.join(__dirname, '..');
const REFERENCE_PATTERNS = [
  { name: 'file_path', re: /\b((?:lib|scripts|memory|tools|skills|agents|.claude)\/[a-z0-9_./-]+\.(?:cjs|mjs|js|md|json|jsonl|py|sh))\b/gi, verify: 'file_exists' },
  { name: 'sm_number', re: /\bSM-(\d{2,3})\b/g, verify: 'sm_exists' },
  { name: 'commit_sha', re: /\b(?:commit|sha|hash)\s+([a-f0-9]{7,40})\b/gi, verify: 'noop' },
];
function verifyOutput(text) {
  const flags = []; if (!text || typeof text !== 'string') return flags;
  for (const { name, re, verify } of REFERENCE_PATTERNS) {
    re.lastIndex = 0;
    for (const m of [...text.matchAll(re)]) {
      const r = checkClaim(name, m[1], verify);
      if (!r.ok) flags.push({ type: name, claim: m[1], verified: false, reason: r.reason });
    }
  } return flags;
}
function checkClaim(type, claim, verifyKind) {
  switch (verifyKind) {
    case 'file_exists': { const p = path.join(REPO_ROOT, claim);
      return fs.existsSync(p) ? { ok: true } : { ok: false, reason: 'file not found at ' + claim }; }
    case 'sm_exists': try {
      const md = fs.existsSync(path.join(REPO_ROOT, 'CLAUDE.md')) ? fs.readFileSync(path.join(REPO_ROOT, 'CLAUDE.md'), 'utf8') : '';
      return md.includes(`SM-${claim}`) ? { ok: true } : { ok: false, reason: `SM-${claim} not found` };
    } catch (_) { return { ok: true }; }
    default: return { ok: true };
  }
}
module.exports = { verifyOutput, REFERENCE_PATTERNS };
