"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  PieChart as PieIcon,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyFinanceData, cityWiseData } from "@/lib/mockData";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="text-brand-400" size={26} />
            Reports & Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Campaign performance, footfall analytics, city-wise revenue & ROI forecasting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
            <Download size={14} />
            <span>Export Analytics Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue & Profit Growth (8 cols) */}
        <div className="lg:col-span-8 glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Monthly Revenue & Profit Growth</h3>
            <span className="text-xs text-emerald-400 font-semibold">+28.5% YoY</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(12, 18, 32, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  formatter={(val: any) => formatCurrency(Number(val))}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Performance Table (4 cols) */}
        <div className="lg:col-span-4 glass-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-white">City Performance Ranking</h3>

          <div className="space-y-3">
            {cityWiseData.map((c) => (
              <div key={c.city} className="flex items-center justify-between text-xs pb-2 border-b border-white/06 last:border-0">
                <div>
                  <p className="font-bold text-white">{c.city}</p>
                  <p className="text-[10px] text-slate-400">{c.campaigns} Active Campaigns</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-300">{formatCurrency(c.revenue)}</p>
                  <p className="text-[10px] text-slate-500">{c.bookings} Bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
