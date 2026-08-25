"use client";

import { Zap, Plus, MapPin, Users, QrCode } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ActivationsPage() {
  const activations = [
    { id: "a1", name: "Coca-Cola Summer Sampling Roadshow", location: "Colaba & Marine Drive, Mumbai", footprint: "1.2L Engagements", status: "ACTIVE", budget: 2400000 },
    { id: "a2", name: "Tata Motors EV Mall Activation", location: "CyberHub, Delhi NCR", footprint: "45K Test Drives", status: "UPCOMING", budget: 1800000 },
    { id: "a3", name: "Puma College Fest Brand Activation", location: "IIT Bombay & St. Xavier's", footprint: "85K Lead QR Scans", status: "COMPLETED", budget: 950000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Zap className="text-brand-400" size={26} />
            Brand Activations & Event Marketing
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Roadshows, Mall activations, College festivals, Corporate events, Sampling & Lead collection
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>New Activation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activations.map((a) => (
          <div key={a.id} className="glass-card p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="badge badge-brand">Activation</span>
              <span className="badge badge-active">{a.status}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{a.name}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin size={12} className="text-slate-500" /> {a.location}
            </p>
            <div className="p-3 rounded-xl bg-white/03 border border-white/06 text-xs flex justify-between">
              <span className="text-slate-500">Audience Engaged</span>
              <span className="font-bold text-emerald-400">{a.footprint}</span>
            </div>
            <div className="pt-2 border-t border-white/06 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Budget</p>
                <p className="text-sm font-bold text-white">{formatCurrency(a.budget)}</p>
              </div>
              <button className="btn-secondary text-xs py-1.5 px-3">Lead Data</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
