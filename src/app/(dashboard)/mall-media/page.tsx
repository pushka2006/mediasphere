"use client";

import { useState } from "react";
import {
  Store,
  Plus,
  MapPin,
  Search,
  CheckCircle2,
  X,
  Loader2,
  Users,
  Eye,
  Zap,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MallAsset {
  id: string;
  mall: string;
  location: string;
  city: string;
  spot: string;
  spotType: string;
  dimensions: string;
  footfall: string;
  rate: number;
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE";
  image: string;
  features: string[];
}

const initialMallAssets: MallAsset[] = [
  {
    id: "m1",
    mall: "Phoenix Palladium",
    location: "Lower Parel, Mumbai",
    city: "Mumbai",
    spot: "Central Grand Atrium Hanging Banner",
    spotType: "ATRIUM",
    dimensions: "60ft × 30ft",
    footfall: "8.5 Lakh / mo",
    rate: 350000,
    status: "AVAILABLE",
    image: "/images/mall-media/phoenix-palladium.png",
    features: ["Dual-sided LED", "360° Viewing", "High Purchasing Power Audience"],
  },
  {
    id: "m2",
    mall: "Select CITYWALK",
    location: "Saket, New Delhi",
    city: "Delhi NCR",
    spot: "Main Entrance Archway & LED Screen",
    spotType: "ENTRANCE",
    dimensions: "40ft × 20ft",
    footfall: "7.2 Lakh / mo",
    rate: 280000,
    status: "AVAILABLE",
    image: "/images/mall-media/select-citywalk.png",
    features: ["Prime Entrance Exposure", "100% Entry Footfall Catchment", "Ultra HD Screen"],
  },
  {
    id: "m3",
    mall: "Nexus Elante Mall",
    location: "Industrial Area Phase 1, Chandigarh",
    city: "Chandigarh",
    spot: "Food Court Mega LED Display Wall",
    spotType: "FOOD_COURT",
    dimensions: "30ft × 16ft",
    footfall: "6.8 Lakh / mo",
    rate: 195000,
    status: "AVAILABLE",
    image: "/images/mall-media/nexus-elante.png",
    features: ["High Dwell Time (45+ min)", "Audio Synchronized", "Food Court Central View"],
  },
  {
    id: "m4",
    mall: "Orion Mall",
    location: "Brigade Gateway, Bangalore",
    city: "Bangalore",
    spot: "Lakeside Escalator & Atrium Branding",
    spotType: "ESCALATOR",
    dimensions: "25ft × 12ft",
    footfall: "6.0 Lakh / mo",
    rate: 220000,
    status: "BOOKED",
    image: "/images/mall-media/orion-mall.png",
    features: ["Heavy Flow Escalator Panels", "Multiplex Corridor Link", "Glass Wrap"],
  },
  {
    id: "m5",
    mall: "Express Avenue",
    location: "Royapettah, Chennai",
    city: "Chennai",
    spot: "Central Atrium Hanging Canopy",
    spotType: "ATRIUM",
    dimensions: "50ft × 25ft",
    footfall: "5.5 Lakh / mo",
    rate: 210000,
    status: "AVAILABLE",
    image: "/images/mall-media/express-avenue.png",
    features: ["Giant Ceiling Drop Banner", "Visible across 4 levels", "Backlit Flex"],
  },
  {
    id: "m6",
    mall: "Inorbit Mall",
    location: "Hitech City, Hyderabad",
    city: "Hyderabad",
    spot: "Outdoor Facade 3D LED Display Screen",
    spotType: "FACADE",
    dimensions: "50ft × 30ft",
    footfall: "5.2 Lakh / mo",
    rate: 310000,
    status: "AVAILABLE",
    image: "/images/mall-media/inorbit-mall.png",
    features: ["Anamorphic 3D Capabilities", "Main Road Traffic View", "Night Glow LED"],
  },
];

export default function MallMediaPage() {
  const [mallAssets, setMallAssets] = useState<MallAsset[]>(initialMallAssets);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [spotFilter, setSpotFilter] = useState("ALL");
  const [selectedMall, setSelectedMall] = useState<MallAsset | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const filteredAssets = mallAssets.filter((asset) => {
    if (
      search &&
      !asset.mall.toLowerCase().includes(search.toLowerCase()) &&
      !asset.location.toLowerCase().includes(search.toLowerCase()) &&
      !asset.spot.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (cityFilter !== "ALL" && asset.city !== cityFilter) return false;
    if (spotFilter !== "ALL" && asset.spotType !== spotFilter) return false;
    return true;
  });

  const handleBookSpot = (asset: MallAsset) => {
    setSelectedMall(asset);
  };

  const confirmBooking = () => {
    if (!selectedMall) return;
    setIsBooking(true);

    setTimeout(() => {
      setMallAssets((prev) =>
        prev.map((item) =>
          item.id === selectedMall.id ? { ...item, status: "BOOKED" } : item
        )
      );
      setIsBooking(false);
      setToastMsg(`Successfully booked ${selectedMall.spot} at ${selectedMall.mall}!`);
      setSelectedMall(null);

      setTimeout(() => setToastMsg(""), 3500);
    }, 1000);
  };

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
            <Store className="text-brand-400" size={26} />
            Mall Media Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real Premium Shopping Malls in India – Atriums, Food Courts, LED Walls & Entrance Arches
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Plus size={15} />
            <span>Add Mall Location</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Partner Malls</p>
          <p className="text-2xl font-bold text-white mt-1">42 Premium Malls</p>
          <p className="text-[10px] text-slate-400 mt-1">Tier 1 & Tier 2 Metro Cities</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Monthly Mall Footfall</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">3.9 Crore / mo</p>
          <p className="text-[10px] text-emerald-400 mt-1">High Intent Shoppers</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Active Media Spots</p>
          <p className="text-2xl font-bold text-brand-300 mt-1">186 Spots</p>
          <p className="text-[10px] text-slate-400 mt-1">Atriums, LEDs, Escalators</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Occupancy Rate</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">82%</p>
          <p className="text-[10px] text-slate-400 mt-1">High Demand Peak Season</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search real mall name, location, or spot..."
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
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <select
            value={spotFilter}
            onChange={(e) => setSpotFilter(e.target.value)}
            aria-label="Filter Spot Type"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Media Types</option>
            <option value="ATRIUM">Central Atrium</option>
            <option value="ENTRANCE">Entrance Arch</option>
            <option value="FOOD_COURT">Food Court LED</option>
            <option value="ESCALATOR">Escalator Wrap</option>
            <option value="FACADE">Outdoor 3D Facade</option>
          </select>
        </div>
      </div>

      {/* Real Mall Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="glass-card overflow-hidden hover:border-brand-500/50 transition duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Real Mall Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={asset.image}
                  alt={asset.mall}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/40 shadow-md">
                    {asset.spotType.replace("_", " ")}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md ${
                      asset.status === "AVAILABLE"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-300 transition truncate drop-shadow-sm">
                    {asset.mall}
                  </h3>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={12} className="text-brand-400 shrink-0" />
                    <span className="truncate">{asset.location}</span>
                  </p>
                </div>
              </div>

              {/* Mall Media Spot Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{asset.spot}</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                    <Users size={12} />
                    <span>Monthly Footfall: {asset.footfall}</span>
                  </p>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-1.5">
                  {asset.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/05 border border-white/08 text-slate-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/03 border border-white/06 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Dimensions</span>
                    <span className="font-bold text-slate-100">{asset.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">City Location</span>
                    <span className="font-bold text-slate-100">{asset.city}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="px-4 pb-4 pt-2 border-t border-white/06 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Monthly Rate</p>
                <p className="text-base font-extrabold text-white">
                  {formatCurrency(asset.rate)}
                </p>
              </div>

              <button
                disabled={asset.status === "BOOKED"}
                onClick={() => handleBookSpot(asset)}
                className={`btn-primary text-xs py-2 px-4 flex items-center gap-1.5 ${
                  asset.status === "BOOKED" && "opacity-50 cursor-not-allowed"
                }`}
              >
                <Zap size={14} />
                <span>{asset.status === "BOOKED" ? "Booked" : "Book Spot"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  <Store size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Book Mall Media Spot</h2>
                  <p className="text-xs text-slate-400">{selectedMall.mall}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMall(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="relative h-36 w-full rounded-xl overflow-hidden">
                <img src={selectedMall.image} alt={selectedMall.mall} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <p className="font-bold text-sm">{selectedMall.spot}</p>
                  <p className="text-[11px] text-slate-300">{selectedMall.location}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/05 border border-white/08 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Spot Dimensions:</span>
                  <span className="font-semibold">{selectedMall.dimensions}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Monthly Footfall:</span>
                  <span className="font-semibold text-emerald-400">{selectedMall.footfall}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Monthly Rate:</span>
                  <span className="font-bold text-white text-sm">{formatCurrency(selectedMall.rate)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedMall(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                disabled={isBooking}
                className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
              >
                {isBooking ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
