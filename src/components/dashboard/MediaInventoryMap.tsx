"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { mockMapMarkers } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Eye } from "lucide-react";

// Dynamically import Leaflet components to prevent SSR window reference issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const MapController = dynamic(
  () => import("./MapController"),
  { ssr: false }
);

const CITY_COORDINATES: Record<string, [number, number]> = {
  All: [19.076, 72.8777],
  Mumbai: [19.076, 72.8777],
  "Delhi NCR": [28.6139, 77.209],
  Bangalore: [12.9716, 77.5946],
  Hyderabad: [17.385, 78.4867],
};

export default function MediaInventoryMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [icons, setIcons] = useState<{ available: any; booked: any } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((L) => {
      const available = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;">
            <div style="position:absolute;width:22px;height:22px;border-radius:50%;background:#10b981;opacity:0.35;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="position:relative;width:12px;height:12px;border-radius:50%;background:#10b981;border:2px solid #ffffff;box-shadow:0 0 10px rgba(16,185,129,0.8);"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });

      const booked = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;width:20px;height:20px;">
            <div style="position:relative;width:12px;height:12px;border-radius:50%;background:#f43f5e;border:2px solid #ffffff;box-shadow:0 0 8px rgba(244,63,94,0.7);"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      });

      setIcons({ available, booked });
    });
  }, []);

  const filteredMarkers = mockMapMarkers.filter((marker) => {
    if (selectedCity !== "All" && marker.city !== selectedCity) return false;
    if (selectedFilter !== "All" && marker.type !== selectedFilter) return false;
    return true;
  });

  const currentCenter = CITY_COORDINATES[selectedCity] || [19.076, 72.8777];
  const currentZoom = selectedCity === "All" ? 10 : 11;

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between relative overflow-hidden">
      {/* Map Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Media Inventory Map
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            aria-label="Filter Media Type"
            className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/08 text-slate-300 focus:outline-none"
          >
            <option value="All">All Media</option>
            <option value="BILLBOARD">Billboards</option>
            <option value="UNIPOLE">Unipoles</option>
            <option value="DIGITAL_LED">Digital Screens</option>
            <option value="MALL_ATRIUM">Mall Media</option>
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            aria-label="Filter City"
            className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/08 text-slate-300 focus:outline-none"
          >
            <option value="All">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <button className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 hover:bg-brand-500/30 transition">
            <Eye size={12} />
            <span>Heat Map</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[280px] rounded-xl overflow-hidden relative border border-white/08">
        {isMounted ? (
          <MapContainer
            center={currentCenter}
            zoom={currentZoom}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <MapController center={currentCenter} zoom={currentZoom} />

            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
              maxNativeZoom={16}
            />
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
              maxNativeZoom={16}
            />

            {icons &&
              filteredMarkers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={marker.isAvailable ? icons.available : icons.booked}
                >
                  <Popup>
                    <div className="p-1 min-w-[150px]">
                      <p className="font-bold text-xs text-white">{marker.name}</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {marker.type} • {marker.city}
                      </p>
                      <p className="font-semibold text-xs text-indigo-400 mt-1">
                        {formatCurrency(marker.rate)}/mo
                      </p>
                      <span
                        className={`inline-block px-1.5 py-0.5 mt-1.5 rounded text-[10px] font-bold text-white ${
                          marker.isAvailable ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      >
                        {marker.isAvailable ? "Available" : "Booked"}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        ) : (
          <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center text-xs text-slate-500">
            Loading Interactive GIS Map...
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-2 left-2 z-10 glass p-2 rounded-lg text-[10px] space-y-1 border border-white/10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="text-slate-300">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
