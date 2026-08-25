"use client";

import Link from "next/link";
import {
  Rocket,
  Bot,
  CalendarCheck,
  UserPlus,
  FileSpreadsheet,
  BarChart2,
  Zap,
  UploadCloud,
  CheckSquare,
} from "lucide-react";

const actions = [
  { label: "New Campaign", href: "/campaigns/new", icon: Rocket, color: "#6366f1" },
  { label: "AI Media Planner", href: "/ai-planner", icon: Bot, color: "#a855f7" },
  { label: "Media Booking", href: "/media-buying", icon: CalendarCheck, color: "#06b6d4" },
  { label: "Add Client", href: "/clients/new", icon: UserPlus, color: "#ec4899" },
  { label: "Create Proposal", href: "/documents?type=proposal", icon: FileSpreadsheet, color: "#3b82f6" },
  { label: "Generate Report", href: "/analytics", icon: BarChart2, color: "#10b981" },
  { label: "Add Activation", href: "/activations/new", icon: Zap, color: "#f59e0b" },
  { label: "Upload Creative", href: "/creatives", icon: UploadCloud, color: "#8b5cf6" },
  { label: "Add Task", href: "/tasks", icon: CheckSquare, color: "#ef4444" },
];

export default function QuickActions() {
  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Quick Actions
      </p>

      <div className="grid grid-cols-3 gap-2.5 my-auto">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/03 border border-white/06 hover:bg-white/08 hover:border-white/15 transition text-center group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition group-hover:scale-110"
                style={{
                  background: `${action.color}15`,
                  boxShadow: `0 0 15px ${action.color}20`,
                }}
              >
                <Icon size={18} style={{ color: action.color }} />
              </div>
              <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
