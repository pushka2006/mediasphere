"use client";

import { useState } from "react";
import { mockClients, mockUsers } from "@/lib/mockData";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { Client } from "@/types";
import {
  Users,
  Search,
  Plus,
  Filter,
  Star,
  Mail,
  Phone,
  Building2,
  MoreVertical,
  Download,
  FileSpreadsheet,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [segmentFilter, setSegmentFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    city: "Mumbai",
    state: "Maharashtra",
    industry: "FMCG",
    segment: "ENTERPRISE",
    status: "ACTIVE",
    rating: "5",
    totalRevenue: "",
  });

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setClients([result.data, ...clients]);
      } else {
        throw new Error(result.error);
      }
    } catch {
      // Fallback
      const newClient: Client = {
        id: `c${Date.now()}`,
        company: formData.company.trim(),
        name: formData.name.trim(),
        email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: formData.phone.trim() || "+91 98765 00000",
        city: formData.city,
        state: formData.state,
        industry: formData.industry,
        segment: formData.segment as any,
        status: formData.status as any,
        rating: Number(formData.rating),
        totalRevenue: formData.totalRevenue ? Number(formData.totalRevenue) : 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.company)}&background=6366f1&color=fff`,
        manager: mockUsers[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _count: { campaigns: 0, invoices: 0 },
      };
      mockClients.unshift(newClient);
      setClients([newClient, ...clients]);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setToastMsg(`Successfully added ${formData.company}!`);
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        city: "Mumbai",
        state: "Maharashtra",
        industry: "FMCG",
        segment: "ENTERPRISE",
        status: "ACTIVE",
        rating: "5",
        totalRevenue: "",
      });
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const filteredClients = clients.filter((client) => {
    if (search && !client.company.toLowerCase().includes(search.toLowerCase()) && !client.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (statusFilter !== "ALL" && client.status !== statusFilter) return false;
    if (segmentFilter !== "ALL" && client.segment !== segmentFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 glass p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl animate-bounce-slow">
          <CheckCircle2 size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="text-brand-400" size={26} />
            Client CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage clients, contracts, lead pipeline, communication history & revenue
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Clients</p>
          <p className="text-2xl font-bold text-white mt-1">{mockClients.length}</p>
          <p className="text-[10px] text-emerald-400 mt-1">+2 new this month</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Active Clients</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {mockClients.filter((c) => c.status === "ACTIVE").length}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Retention Rate: 94%</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Lead Pipeline</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {mockClients.filter((c) => c.status === "LEAD" || c.status === "PROSPECT").length}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Est. Value: ₹85 Lakh</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Client Revenue</p>
          <p className="text-2xl font-bold text-brand-300 mt-1">
            {formatCurrency(mockClients.reduce((acc, c) => acc + c.totalRevenue, 0))}
          </p>
          <p className="text-[10px] text-emerald-400 mt-1">+24.5% YoY Growth</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by client or company name..."
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
            <option value="PROSPECT">Prospect</option>
            <option value="LEAD">Lead</option>
          </select>

          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            aria-label="Filter Segment"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Segments</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="MID_MARKET">Mid Market</option>
            <option value="SME">SME</option>
          </select>
        </div>
      </div>

      {/* Clients Data Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="glass-card p-5 hover:border-brand-500/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={client.avatar}
                    alt={client.company}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition">
                      {client.company}
                    </h3>
                    <p className="text-xs text-slate-400">{client.name}</p>
                  </div>
                </div>
                <span className={`badge ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>

              <div className="space-y-1.5 py-3 border-y border-white/06 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Industry:</span>
                  <span className="font-semibold text-slate-200">{client.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-300">{client.city}, {client.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Segment:</span>
                  <span className="px-2 py-0.5 rounded bg-white/05 text-[10px] font-bold text-purple-300">
                    {client.segment}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/06">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-500">Total Spent</p>
                <p className="text-sm font-bold text-white">{formatCurrency(client.totalRevenue)}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${client.email}`}
                  className="p-2 rounded-lg bg-white/05 hover:bg-white/10 text-slate-400 hover:text-white transition"
                  title="Send Email"
                >
                  <Mail size={14} />
                </a>
                <a
                  href={`tel:${client.phone}`}
                  className="p-2 rounded-lg bg-white/05 hover:bg-white/10 text-slate-400 hover:text-white transition"
                  title="Call"
                >
                  <Phone size={14} />
                </a>
                <Link
                  href={`/clients/${client.id}`}
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-2xl p-6 rounded-2xl border border-white/10 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Add New Client</h2>
                  <p className="text-xs text-slate-400">Enter client information to add to your CRM list.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="form-label">
                    Company Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reliance Retail Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Contact Person Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Shah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. contact@reliance.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="form-label">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    aria-label="Select Industry"
                    className="form-input text-xs"
                  >
                    <option value="FMCG">FMCG</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Sports & Lifestyle">Sports</option>
                    <option value="Food & Beverage">F&B</option>
                    <option value="Automotive">Automotive</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Banking & Finance">Banking</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Segment</label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    aria-label="Select Segment"
                    className="form-input text-xs"
                  >
                    <option value="ENTERPRISE">Enterprise</option>
                    <option value="MID_MARKET">Mid Market</option>
                    <option value="SME">SME</option>
                    <option value="STARTUP">Startup</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    aria-label="Select Status"
                    className="form-input text-xs"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PROSPECT">Prospect</option>
                    <option value="LEAD">Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="form-label">Total Spent / Revenue (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 5000000"
                    value={formData.totalRevenue}
                    onChange={(e) => setFormData({ ...formData, totalRevenue: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    aria-label="Select Rating"
                    className="form-input text-xs"
                  >
                    <option value="5">5 Stars ★★★★★</option>
                    <option value="4">4 Stars ★★★★</option>
                    <option value="3">3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Add Client</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
