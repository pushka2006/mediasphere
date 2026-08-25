"use client";

import { useState } from "react";
import { mockMediaAssets } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Eye,
  Sun,
  Maximize2,
  CalendarCheck,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function OOHMediaPage() {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filteredAssets = mockMediaAssets.filter((asset) => {
    if (search && !asset.name.toLowerCase().includes(search.toLowerCase()) && !asset.address?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (cityFilter !== "ALL" && asset.city !== cityFilter) return false;
    if (typeFilter !== "ALL" && asset.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="text-brand-400" size={26} />
            OOH Media Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Billboards, Unipoles, Gantries, Bus Shelters, Metro Panels & Digital LED Screens
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/ooh-media/new" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Plus size={15} />
            <span>Add Media Asset</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Media Assets</p>
          <p className="text-2xl font-bold text-white mt-1">1,240</p>
          <p className="text-[10px] text-slate-400 mt-1">Across 26 Indian Cities</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Available For Booking</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">842</p>
          <p className="text-[10px] text-emerald-400 mt-1">68% Occupancy Rate</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Monthly Reach Potential</p>
          <p className="text-2xl font-bold text-cyan-300 mt-1">45.8 Cr</p>
          <p className="text-[10px] text-slate-400 mt-1">Audience Impressions</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Avg. Billboard Cost</p>
          <p className="text-2xl font-bold text-brand-300 mt-1">₹1.45 Lakh/mo</p>
          <p className="text-[10px] text-slate-400 mt-1">Standard 40x20 Size</p>
        </div>
      </div>

      {/* Filter controls */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search location, billboard name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            aria-label="Filter City"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter Media Type"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Media Types</option>
            <option value="BILLBOARD">Billboard</option>
            <option value="UNIPOLE">Unipole</option>
            <option value="DIGITAL_LED">Digital LED</option>
            <option value="METRO_PANEL">Metro Panel</option>
            <option value="AIRPORT">Airport</option>
            <option value="GANTRY">Gantry</option>
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="glass-card overflow-hidden hover:border-brand-500/50 transition duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Product Ad Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                {asset.photos && asset.photos.length > 0 ? (
                  <img
                    src={asset.photos[0]}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 text-xs font-semibold">
                    No Ad Preview Available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-brand-300 border border-brand-500/40 shadow-md">
                    {asset.type.replace("_", " ")}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md ${
                      asset.isAvailable
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                    }`}
                  >
                    {asset.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition truncate drop-shadow-sm">
                    {asset.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={12} className="text-brand-400 shrink-0" />
                    <span className="truncate">{asset.address}</span>
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/03 border border-white/06 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Dimensions</span>
                    <span className="font-bold text-slate-100">
                      {asset.width}ft × {asset.height}ft
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Illumination</span>
                    <span className="font-bold text-slate-100">{asset.illumination}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Daily Traffic</span>
                    <span className="font-bold text-slate-100">
                      {asset.trafficCount?.toLocaleString()} / day
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Monthly Reach</span>
                    <span className="font-bold text-emerald-400">
                      {(asset.monthlyReach! / 100000).toFixed(1)} Lakh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-white/06 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Monthly Rate</p>
                <p className="text-base font-extrabold text-white">
                  {formatCurrency(asset.monthlyRate)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/ooh-media/${asset.id}`} className="btn-secondary text-xs py-1.5 px-3">
                  Details
                </Link>
                <button
                  disabled={!asset.isAvailable}
                  className={`btn-primary text-xs py-1.5 px-3 ${
                    !asset.isAvailable && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Book Asset
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
