"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { campaignStatusData } from "@/lib/mockData";

export default function CampaignStatusChart() {
  const total = campaignStatusData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Campaigns by Status
        </p>
        <select className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/08 text-slate-400 focus:outline-none">
          <option>This Month</option>
          <option>This Quarter</option>
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
                        {data.value} campaigns (
                        {((data.value / total) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={campaignStatusData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {campaignStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Donut Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-white leading-none">
            {total}
          </span>
          <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
            Total
          </span>
        </div>
      </div>

      {/* Legend List */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/06">
        {campaignStatusData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-300 truncate">{item.name}</span>
            </div>
            <span className="font-semibold text-slate-400 text-[11px] ml-1">
              {item.value} ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
