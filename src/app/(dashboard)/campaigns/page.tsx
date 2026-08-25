"use client";

import { useState } from "react";
import { mockCampaigns } from "@/lib/mockData";
import { formatCurrency, getStatusColor, formatDate } from "@/lib/utils";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  Calendar,
  IndianRupee,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function CampaignsPage() {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCampaigns = mockCampaigns.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Megaphone className="text-brand-400" size={26} />
            Campaign Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track, schedule, and execute OOH & Experiential campaigns across all media assets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/05 rounded-xl p-1 border border-white/08">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                viewMode === "table" ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <TableIcon size={14} />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                viewMode === "kanban" ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Kanban size={14} />
              <span>Board</span>
            </button>
          </div>

          <Link href="/campaigns/new" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Plus size={15} />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Active Campaigns</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {mockCampaigns.filter((c) => c.status === "ACTIVE").length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Pending Approvals</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {mockCampaigns.filter((c) => c.status === "PENDING_APPROVAL").length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Campaign Budget</p>
          <p className="text-2xl font-bold text-brand-300 mt-1">
            {formatCurrency(mockCampaigns.reduce((acc, c) => acc + c.budget, 0))}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Average Campaign ROI</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">186%</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter Status"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="COMPLETED">Completed</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Cities</th>
                  <th>Dates</th>
                  <th>Budget</th>
                  <th>ROI</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div>
                        <p className="font-bold text-slate-100">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.type} • {c.objective}</p>
                      </div>
                    </td>
                    <td>
                      <p className="font-medium text-slate-300">{c.client.company}</p>
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {c.cities.map((city) => (
                          <span key={city} className="px-1.5 py-0.5 rounded bg-white/05 text-[10px] text-slate-300">
                            {city}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-xs text-slate-400">
                      {formatDate(c.startDate)} - {formatDate(c.endDate)}
                    </td>
                    <td className="font-bold text-white">
                      {formatCurrency(c.budget)}
                    </td>
                    <td>
                      {c.roi ? (
                        <span className="font-bold text-emerald-400">{c.roi}%</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="btn-secondary text-xs py-1 px-2.5"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["DRAFT", "PENDING_APPROVAL", "ACTIVE", "COMPLETED"].map((status) => {
            const list = filteredCampaigns.filter((c) => c.status === status);
            return (
              <div key={status} className="glass-card p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/08">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {status.replace("_", " ")}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-slate-300 font-bold">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {list.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-white/05 border border-white/08 space-y-2">
                      <p className="text-xs font-bold text-white">{c.name}</p>
                      <p className="text-[11px] text-slate-400">{c.client.company}</p>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/06">
                        <span className="text-slate-500">{c.cities[0]}</span>
                        <span className="font-bold text-brand-300">{formatCurrency(c.budget)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
