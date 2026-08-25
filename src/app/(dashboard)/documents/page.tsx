"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Download,
  Search,
  FileCheck,
  Building,
  Calendar,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  const docs = [
    { id: "d1", name: "Coca-Cola Summer Blast - OOH Media Proposal.pdf", type: "PROPOSAL", client: "Coca-Cola India", date: "2024-05-15", size: "2.4 MB" },
    { id: "d2", name: "Samsung S24 Launch - Quotation & Rate Card.pdf", type: "QUOTATION", client: "Samsung India", date: "2024-06-01", size: "1.8 MB" },
    { id: "d3", name: "Puma Retail Branding - Client Agreement.pdf", type: "AGREEMENT", client: "Puma Sports", date: "2024-07-10", size: "3.1 MB" },
    { id: "d4", name: "Tata Motors EV - Campaign Completion Report.pdf", type: "CAMPAIGN_REPORT", client: "Tata Motors", date: "2024-07-20", size: "4.5 MB" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="text-brand-400" size={26} />
            Documents & Proposals
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-generate OOH proposals, rate cards, client quotations & completion reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Plus size={15} />
            <span>Generate New Proposal</span>
          </button>
        </div>
      </div>

      {/* Document Table */}
      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Type</th>
              <th>Client</th>
              <th>Date Created</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td className="font-bold text-white flex items-center gap-2">
                  <FileCheck size={16} className="text-brand-400 shrink-0" />
                  <span>{doc.name}</span>
                </td>
                <td>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                    {doc.type}
                  </span>
                </td>
                <td className="text-slate-300">{doc.client}</td>
                <td className="text-xs text-slate-400">{formatDate(doc.date)}</td>
                <td className="text-xs text-slate-500">{doc.size}</td>
                <td>
                  <button className="btn-secondary text-xs py-1 px-3 flex items-center gap-1">
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
