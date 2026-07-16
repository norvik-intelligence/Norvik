"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeedSignal } from "./FeedView";

// Free raster style (OSM tiles) – no API key, fair use with attribution
const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

export default function FeedMap({ signals }: { signals: FeedSignal[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center: [10.45, 51.16], // Germany centroid
      zoom: 5.3,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    const markers: maplibregl.Marker[] = [];
    const bounds = new maplibregl.LngLatBounds();
    let hasPoints = false;

    for (const s of signals) {
      if (s.lat == null || s.lng == null) continue;
      hasPoints = true;
      bounds.extend([s.lng, s.lat]);

      const popupHtml = `
        <div style="font-family:system-ui;max-width:220px">
          <strong style="font-size:12px">${escapeHtml(s.title)}</strong>
          <p style="font-size:11px;color:#6b7280;margin:4px 0 0">
            ${escapeHtml(s.municipality ?? "")}
          </p>
        </div>`;

      const marker = new maplibregl.Marker({ color: "#1A3A2A" })
        .setLngLat([s.lng, s.lat])
        .setPopup(new maplibregl.Popup({ offset: 18 }).setHTML(popupHtml))
        .addTo(map);
      markers.push(marker);
    }

    if (hasPoints) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 11 });
    }

    return () => {
      markers.forEach((mk) => mk.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [signals]);

  return <div ref={containerRef} className="h-[480px] rounded-xl overflow-hidden border border-gray-200" />;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
