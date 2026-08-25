"use client";

import { Eye, TrendingUp, ThumbsUp, UserCheck, CheckCircle2, Activity } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      label: "Total Reach",
      value: "12.45 Cr",
      change: "+16.2%",
      icon: Eye,
      color: "#6366f1",
    },
    {
      label: "Impressions",
      value: "98.32 Cr",
      change: "+18.7%",
      icon: TrendingUp,
      color: "#06b6d4",
    },
    {
      label: "Engagements",
      value: "2.45 Cr",
      change: "+20.4%",
      icon: ThumbsUp,
      color: "#a855f7",
    },
    {
      label: "Leads Generated",
      value: "18,542",
      change: "+14.3%",
      icon: UserCheck,
      color: "#10b981",
    },
    {
      label: "Conversions",
      value: "3,245",
      change: "+21.7%",
      icon: CheckCircle2,
      color: "#ec4899",
    },
    {
      label: "Avg. Frequency",
      value: "3.6",
      change: "+8.6%",
      icon: Activity,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="glass-card px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${stat.color}18` }}
            >
              <Icon size={16} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-emerald-400">
                  {stat.change}
                </span>
              </div>
            </div>
            {idx < stats.length - 1 && (
              <div className="hidden lg:block w-[1px] h-6 bg-white/08 ml-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}
