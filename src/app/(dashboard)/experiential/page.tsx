"use client";

import { Sparkles, Plus, Eye, Award } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ExperientialMarketingPage() {
  const campaigns = [
    { id: "e1", title: "Samsung 3D Anamorphic Billboard Experience", location: "DLF CyberHub, Gurgaon", type: "3D Anamorphic LED", status: "ACTIVE", reach: "4.2M Impressions", budget: 4500000 },
    { id: "e2", title: "Coca-Cola Interactive Augmented Reality Kiosk", location: "Phoenix Marketcity, Bangalore", type: "AR Experience Kiosk", status: "COMPLETED", reach: "1.8M Engagements", budget: 2800000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-brand-400" size={26} />
            Experiential & 3D Anamorphic Marketing
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immersive 3D billboards, AR/VR kiosks, projection mapping, influencer events & product launches
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>New Experiential Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((c) => (
          <div key={c.id} className="glass-card p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="badge badge-brand">{c.type}</span>
              <span className="badge badge-active">{c.status}</span>
            </div>
            <h3 className="text-base font-bold text-white">{c.title}</h3>
            <p className="text-xs text-slate-400">{c.location}</p>
            <div className="p-3 rounded-xl bg-white/03 border border-white/06 text-xs flex justify-between">
              <span className="text-slate-500">Impressions & Reach</span>
              <span className="font-bold text-cyan-300">{c.reach}</span>
            </div>
            <div className="pt-2 border-t border-white/06 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Budget</p>
                <p className="text-sm font-bold text-white">{formatCurrency(c.budget)}</p>
              </div>
              <button className="btn-primary text-xs py-1.5 px-3">View 3D Render</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
