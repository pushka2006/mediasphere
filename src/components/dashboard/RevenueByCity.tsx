"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { revenueByCityData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function RevenueByCity() {
  const total = 24500000;

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Revenue By City
        </p>
        <select className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/08 text-slate-400 focus:outline-none">
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="relative h-44 my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="glass p-2.5 rounded-lg text-xs border border-white/10">
                      <p className="font-semibold text-white">{data.name}</p>
                      <p className="text-slate-400">
                        {formatCurrency(data.revenue)} ({data.percent}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={revenueByCityData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="revenue"
              stroke="none"
            >
              {revenueByCityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-white leading-none">
            {formatCurrency(total)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
            Total Revenue
          </span>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-white/06 pt-2">
        {revenueByCityData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">
                {formatCurrency(item.revenue)}
              </span>
              <span className="text-slate-500 text-[10px]">({item.percent}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
