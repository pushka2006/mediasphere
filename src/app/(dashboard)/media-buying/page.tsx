"use client";

import { ShoppingCart, Plus, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mockVendors } from "@/lib/mockData";

export default function MediaBuyingPage() {
  const deals = [
    { id: "b1", asset: "Western Express Highway Billboard A1", vendor: "Rajesh Outdoor", askingPrice: 200000, agreedPrice: 185000, status: "AGREED" },
    { id: "b2", asset: "Connaught Place Unipole 01", vendor: "PrintXpress India", askingPrice: 250000, agreedPrice: 225000, status: "NEGOTIATING" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShoppingCart className="text-brand-400" size={26} />
            Media Buying & Rate Negotiation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Vendor quotes, price negotiations, purchase orders, approval workflows & booking verification
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>New Quote Request</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Target Media Asset</th>
              <th>Vendor</th>
              <th>Asking Rate</th>
              <th>Agreed Rate</th>
              <th>Discount Saved</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => {
              const saved = d.askingPrice - d.agreedPrice;
              return (
                <tr key={d.id}>
                  <td className="font-bold text-white">{d.asset}</td>
                  <td>{d.vendor}</td>
                  <td>{formatCurrency(d.askingPrice)}</td>
                  <td className="font-bold text-emerald-400">{formatCurrency(d.agreedPrice)}</td>
                  <td className="font-bold text-cyan-300">{formatCurrency(saved)}</td>
                  <td>
                    <span className="badge badge-active">{d.status}</span>
                  </td>
                  <td>
                    <button className="btn-secondary text-xs py-1 px-3">Issue PO</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
