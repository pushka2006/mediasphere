"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ArrowLeft,
  Building2,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { mockClients, mockUsers } from "@/lib/mockData";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.name.trim()) {
      setErrorMsg("Company Name and Primary Contact Name are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setSuccessMsg("Client created successfully!");
        // Add to local mock array if client-side fallback is needed
        if (!mockClients.some((c) => c.id === result.data.id)) {
          mockClients.unshift(result.data);
        }
        setTimeout(() => {
          router.push("/clients");
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(result.error || "Failed to create client.");
      }
    } catch (err: any) {
      // Client-side fallback if API fails
      const newClient = {
        id: `c${Date.now()}`,
        company: formData.company.trim(),
        name: formData.name.trim(),
        email:
          formData.email.trim() ||
          `${formData.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: formData.phone.trim() || "+91 98765 00000",
        city: formData.city,
        state: formData.state,
        industry: formData.industry,
        segment: formData.segment as any,
        status: formData.status as any,
        rating: Number(formData.rating),
        totalRevenue: formData.totalRevenue ? Number(formData.totalRevenue) : 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.company
        )}&background=6366f1&color=fff`,
        manager: mockUsers[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _count: { campaigns: 0, invoices: 0 },
      };

      mockClients.unshift(newClient);
      setSuccessMsg("Client added successfully!");
      setTimeout(() => {
        router.push("/clients");
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Client CRM</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="glass-card p-6 md:p-8 space-y-6 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Add New Client Entry</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter enterprise client information to add them to your MediaSphere CRM & active pipeline.
            </p>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Company & Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-2">
              <Building2 size={14} />
              <span>Company & Primary Contact</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Company Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="e.g. Reliance Retail Ltd."
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">
                  Contact Person Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <UserCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Vikramaditya Shah"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. v.shah@reliance.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +91 98200 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Classification */}
          <div className="space-y-4 pt-4 border-t border-white/08">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-2">
              <MapPin size={14} />
              <span>Location & Industry Classification</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  aria-label="Select Industry"
                  className="form-input"
                >
                  <option value="FMCG">FMCG</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Sports & Lifestyle">Sports & Lifestyle</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Automotive">Automotive</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                  <option value="Food Tech">Food Tech</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              <div>
                <label className="form-label">Client Segment</label>
                <select
                  name="segment"
                  value={formData.segment}
                  onChange={handleChange}
                  aria-label="Select Client Segment"
                  className="form-input"
                >
                  <option value="ENTERPRISE">Enterprise</option>
                  <option value="MID_MARKET">Mid Market</option>
                  <option value="SME">SME</option>
                  <option value="STARTUP">Startup</option>
                  <option value="GOVERNMENT">Government</option>
                </select>
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  aria-label="Select Status"
                  className="form-input"
                >
                  <option value="ACTIVE">Active Client</option>
                  <option value="PROSPECT">Prospect</option>
                  <option value="LEAD">Lead</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Revenue & Rating */}
          <div className="space-y-4 pt-4 border-t border-white/08">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-2">
              <Briefcase size={14} />
              <span>Revenue & Rating</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Initial Revenue / Contract Value (₹)</label>
                <input
                  type="number"
                  name="totalRevenue"
                  placeholder="e.g. 5000000"
                  value={formData.totalRevenue}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Client Relationship Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  aria-label="Select Rating"
                  className="form-input"
                >
                  <option value="5">5 Stars ★★★★★ (Strategic Partner)</option>
                  <option value="4">4 Stars ★★★★ (High Value)</option>
                  <option value="3">3 Stars ★★★ (Standard)</option>
                  <option value="2">2 Stars ★★ (Requires Attention)</option>
                  <option value="1">1 Star ★ (At Risk)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
            <Link href="/clients" className="btn-secondary px-6">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-2.5 flex items-center gap-2 text-sm font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Creating Client...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Save New Client</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
