"use client";

import { mockCampaigns } from "@/lib/mockData";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function RecentCampaigns() {
  const recent = mockCampaigns.slice(0, 5);

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Recent Campaigns
        </p>
        <Link
          href="/campaigns"
          className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium transition"
        >
          View All <ExternalLink size={12} />
        </Link>
      </div>

      <div className="space-y-2.5 my-auto">
        {recent.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/05 transition border border-transparent hover:border-white/08 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                }}
              >
                {campaign.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate group-hover:text-brand-300 transition">
                  {campaign.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {campaign.cities.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-right">
              <span className={`badge ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  {formatCurrency(campaign.budget)}
                </p>
                <p className="text-[10px] text-slate-500">Budget</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
