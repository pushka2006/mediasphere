"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { mockMapMarkers } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Layers, MapPin, SlidersHorizontal, Eye } from "lucide-react";

// Dynamically import Leaflet to prevent SSR window reference issues
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

export default function MediaInventoryMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [leafletIcon, setLeafletIcon] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((L) => {
      // Fix default leafet icon issue in Next.js
      const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setLeafletIcon(customIcon);
    });
  }, []);

  const filteredMarkers = mockMapMarkers.filter((marker) => {
    if (selectedCity !== "All" && marker.city !== selectedCity) return false;
    if (selectedFilter !== "All" && marker.type !== selectedFilter) return false;
    return true;
  });

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
            center={[19.076, 72.8777]}
            zoom={10}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
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
            {leafletIcon &&
              filteredMarkers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={leafletIcon}
                >
                  <Popup>
                    <div className="p-1 text-slate-900">
                      <p className="font-bold text-xs">{marker.name}</p>
                      <p className="text-[11px] text-slate-600">
                        {marker.type} • {marker.city}
                      </p>
                      <p className="font-semibold text-xs text-indigo-600 mt-1">
                        {formatCurrency(marker.rate)}/mo
                      </p>
                      <span
                        className={`inline-block px-1.5 py-0.5 mt-1 rounded text-[10px] font-bold text-white ${
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
        <div className="absolute bottom-2 left-2 z-10 glass p-2 rounded-lg text-[10px] space-y-1 border border-white/10">
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
