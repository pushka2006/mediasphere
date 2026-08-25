"use client";

import { mediaTypeRevenue } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Monitor, Store, Bus, Sparkles, Layers } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Billboards":
      return Monitor;
    case "Mall Media":
      return Store;
    case "Transit Media":
      return Bus;
    case "Retail Branding":
      return Sparkles;
    default:
      return Layers;
  }
};

export default function TopMediaTypes() {
  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Top Media Types <span className="text-[10px] text-slate-600 font-normal">(By Revenue)</span>
        </p>
        <select className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/08 text-slate-400 focus:outline-none">
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="space-y-3.5 my-auto">
        {mediaTypeRevenue.map((item) => {
          const Icon = getIcon(item.name);
          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon size={14} style={{ color: item.color }} />
                  </div>
                  <span className="font-medium text-slate-200">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(item.revenue)}
                  </span>
                  <span className="text-slate-500 text-[11px] min-w-[40px]">
                    ({item.percent}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-white/05 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
