"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { revenueChartData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-3 rounded-xl text-sm"
        style={{
          background: "rgba(12, 18, 32, 0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <p className="text-slate-400 text-xs mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-slate-300 text-xs capitalize">
              {entry.name === "revenue" ? "Revenue" : "Target"}:
            </span>
            <span className="font-bold text-white text-xs">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const totalRevenue = 24500000;
  const lastMonth = 20000000;
  const changePercent = ((totalRevenue - lastMonth) / lastMonth * 100).toFixed(1);

  return (
    <div className="glass-card p-5 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Campaign Performance Overview
          </p>
          <p className="text-xs text-slate-600">Revenue Trend</p>
        </div>
        <select className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/08 text-slate-400 focus:outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Big number */}
      <div className="flex items-end gap-4 mb-5">
        <div>
          <p
            className="text-3xl font-extrabold text-white leading-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {formatCurrency(totalRevenue)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
              <TrendingUp size={13} />
              <span>+{changePercent}%</span>
            </div>
            <span className="text-slate-600 text-xs">vs last month</span>
          </div>
        </div>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-xs text-slate-500">21 May 2025</p>
          <p className="text-xs font-semibold text-brand-400">
            Revenue: {formatCurrency(21200000)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueChartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatCurrency(v).replace("₹", "").trim()}
              tick={{ fontSize: 10, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#06b6d4"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#targetGradient)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
