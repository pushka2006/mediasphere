"use client";

import { mockVendors } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Users, Plus, Star, Phone, Mail, MapPin } from "lucide-react";

export default function VendorsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="text-brand-400" size={26} />
            Vendor & Partner Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Media owners, printing partners, installation teams, fabricators & electricians
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>Add Vendor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVendors.map((v) => (
          <div key={v.id} className="glass-card p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                  {v.type}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">{v.company}</h3>
                <p className="text-xs text-slate-400">{v.name}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">
                <Star size={12} fill="#f59e0b" />
                <span>{v.rating}</span>
              </div>
            </div>

            <div className="py-2 border-y border-white/06 text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-1">
                <MapPin size={12} className="text-slate-500" />
                <span>{v.city}</span>
              </p>
              <p className="flex items-center gap-1">
                <Mail size={12} className="text-slate-500" />
                <span>{v.email}</span>
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-500">Total Paid</p>
                <p className="text-sm font-bold text-white">{formatCurrency(v.totalPaid)}</p>
              </div>
              <button className="btn-secondary text-xs py-1.5 px-3">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
