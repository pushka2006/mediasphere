"use client";

import MediaInventoryMap from "@/components/dashboard/MediaInventoryMap";
import { Map, Layers, Filter } from "lucide-react";

export default function MediaPlanningPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Map className="text-brand-400" size={26} />
          GIS Media Planning Map
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Geographic spatial visualization of billboards, transit routes, competitor density & footfall heatmaps
        </p>
      </div>

      <div className="h-[600px] glass-card p-2">
        <MediaInventoryMap />
      </div>
    </div>
  );
}
