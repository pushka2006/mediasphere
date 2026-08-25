"use client";

import { Palette, Plus, Camera, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function RetailBrandingPage() {
  const projects = [
    { id: "r1", title: "Puma Flagship Store Launch", stores: 45, type: "Window & Shelf Branding", status: "IN_PROGRESS", budget: 1875000 },
    { id: "r2", title: "Samsung Galaxy Experience Zones", stores: 120, type: "Glow Signs & LED Signage", status: "COMPLETED", budget: 3500000 },
    { id: "r3", title: "McDonald's POSM Drive", stores: 80, type: "POSM & Display Units", status: "ACTIVE", budget: 1200000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Palette className="text-brand-400" size={26} />
            Retail Branding & Store Visibility
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store branding, Window wraps, Shelf branding, POSM, Glow signs, LED signage & ACP Boards
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>New Retail Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="badge badge-brand">{p.type}</span>
              <span className="badge badge-active">{p.status}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{p.title}</h3>
            <p className="text-xs text-slate-400">{p.stores} Retail Stores Covered</p>

            <div className="p-3 rounded-xl bg-white/03 border border-white/06 flex items-center justify-between text-xs">
              <span className="text-slate-500">Installation Tracking:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Camera size={13} /> Photo Verified
              </span>
            </div>

            <div className="pt-2 border-t border-white/06 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Budget</p>
                <p className="text-sm font-bold text-white">{formatCurrency(p.budget)}</p>
              </div>
              <button className="btn-secondary text-xs py-1.5 px-3">Audit Photos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
