"use client";

import { mockActivityFeed } from "@/lib/mockData";
import { Activity } from "lucide-react";

export default function LiveActivityFeed() {
  return (
    <div className="glass px-4 py-2.5 rounded-xl border border-white/08 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
      <div className="flex items-center gap-2 text-xs truncate">
        <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider shrink-0">
          Live Feed:
        </span>
        <span className="text-slate-300 font-medium truncate">
          {mockActivityFeed[0].entity}
        </span>
        <span className="text-slate-500 text-[10px] shrink-0">
          • {mockActivityFeed[0].time}
        </span>
      </div>
    </div>
  );
}
