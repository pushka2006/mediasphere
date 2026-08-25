"use client";

import { useState } from "react";
import { mockInvoices, mockVendors } from "@/lib/mockData";
import { formatCurrency, getStatusColor, formatDate } from "@/lib/utils";
import {
  Wallet,
  IndianRupee,
  FileText,
  Plus,
  Search,
  Download,
  TrendingUp,
  CreditCard,
  Building,
  CheckCircle,
} from "lucide-react";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "pos" | "gst">("invoices");

  const totalInvoiced = mockInvoices.reduce((acc, i) => acc + i.total, 0);
  const totalPaid = mockInvoices
    .filter((i) => i.status === "PAID")
    .reduce((acc, i) => acc + i.total, 0);
  const totalOverdue = mockInvoices
    .filter((i) => i.status === "OVERDUE")
    .reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Wallet className="text-brand-400" size={26} />
            Finance & Billing Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Client invoicing, purchase orders, vendor payments, GST breakdown & revenue reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Plus size={15} />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Invoiced</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalInvoiced)}</p>
          <p className="text-[10px] text-slate-400 mt-1">Including 18% GST</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Collected</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(totalPaid)}</p>
          <p className="text-[10px] text-emerald-400 mt-1">82% Collection Efficiency</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Overdue Payments</p>
          <p className="text-2xl font-bold text-rose-400 mt-1">{formatCurrency(totalOverdue)}</p>
          <p className="text-[10px] text-rose-400 mt-1">1 Invoice Overdue</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Net Profit Margin</p>
          <p className="text-2xl font-bold text-brand-300 mt-1">38.4%</p>
          <p className="text-[10px] text-emerald-400 mt-1">+4.2% vs Q1</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 flex items-center gap-2 border-b border-white/08">
        {[
          { key: "invoices", label: "Client Invoices" },
          { key: "pos", label: "Vendor Purchase Orders" },
          { key: "gst", label: "GST Summary (18%)" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === tab.key
                ? "bg-brand-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      {activeTab === "invoices" && (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Campaign</th>
                <th>Subtotal</th>
                <th>GST (18%)</th>
                <th>Total</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-bold text-slate-100">{inv.invoiceNo}</td>
                  <td>{inv.client.company}</td>
                  <td className="text-xs text-slate-400">{inv.campaign?.name || "N/A"}</td>
                  <td>{formatCurrency(inv.amount)}</td>
                  <td>{formatCurrency(inv.tax)}</td>
                  <td className="font-bold text-white">{formatCurrency(inv.total)}</td>
                  <td>
                    <span className={`badge ${getStatusColor(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="text-xs text-slate-400">
                    {inv.dueDate ? formatDate(inv.dueDate) : "—"}
                  </td>
                  <td>
                    <button className="btn-secondary text-xs py-1 px-2.5">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Purchase Orders */}
      {activeTab === "pos" && (
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Vendor Purchase Orders</h3>
          <div className="space-y-3">
            {mockVendors.map((vendor) => (
              <div key={vendor.id} className="p-3.5 rounded-xl bg-white/03 border border-white/06 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{vendor.company}</p>
                  <p className="text-[11px] text-slate-400">{vendor.type} • {vendor.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-brand-300">
                    Total Paid: {formatCurrency(vendor.totalPaid)}
                  </p>
                  <span className="badge badge-active mt-1">Active Vendor</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GST Summary */}
      {activeTab === "gst" && (
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">GST Filing & Tax Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/05 border border-white/08">
              <p className="text-xs text-slate-400 font-semibold">Output GST (Collected)</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">₹25.10 Lakh</p>
            </div>
            <div className="p-4 rounded-xl bg-white/05 border border-white/08">
              <p className="text-xs text-slate-400 font-semibold">Input Tax Credit (ITC)</p>
              <p className="text-xl font-bold text-cyan-300 mt-1">₹14.80 Lakh</p>
            </div>
            <div className="p-4 rounded-xl bg-white/05 border border-white/08">
              <p className="text-xs text-slate-400 font-semibold">Net GST Payable</p>
              <p className="text-xl font-bold text-brand-300 mt-1">₹10.30 Lakh</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
