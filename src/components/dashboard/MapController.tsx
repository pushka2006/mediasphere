"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapControllerProps {
  center: [number, number];
  zoom?: number;
}

export default function MapController({ center, zoom = 11 }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    // Force Leaflet to re-calculate container size and render all surrounding tiles
    map.invalidateSize();
    map.setView(center, zoom, { animate: true });

    // Additional check after DOM finishes any transitions/animations
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => clearTimeout(timer);
  }, [center, zoom, map]);

  return null;
}
