"use client";

import { useState } from "react";
import { formatCurrency, INDIA_CITIES } from "@/lib/utils";
import {
  Bot,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Download,
} from "lucide-react";

export default function AIPlannerPage() {
  const [budget, setBudget] = useState(2500000);
  const [duration, setDuration] = useState(30);
  const [selectedCities, setSelectedCities] = useState<string[]>(["Mumbai", "Delhi NCR"]);
  const [audience, setAudience] = useState("Youth / Gen Z (18-35)");
  const [industry, setIndustry] = useState("FMCG & Retail");
  const [objective, setObjective] = useState("Brand Awareness & Footfall");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(true);

  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 800);
  };

  // Calculated estimates based on inputs
  const estimatedReach = Math.round((budget / 100) * (duration / 30) * 0.85);
  const estimatedImpressions = estimatedReach * 8;
  const roiPrediction = Math.min(350, Math.round(150 + (budget / 500000) * 12));
  const oohAlloc = Math.round(budget * 0.55);
  const mallAlloc = Math.round(budget * 0.25);
  const digitalAlloc = Math.round(budget * 0.2);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bot className="text-brand-400" size={26} />
            AI Media Planner & Recommendation Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generative AI recommendations for optimal media mix, location selection, budget allocation & ROI prediction
          </p>
        </div>

        {hasResult && (
          <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            <Download size={14} />
            <span>Export AI Proposal (PDF)</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 glass-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/08 pb-3">
            <Sliders size={16} className="text-brand-400" />
            Campaign Parameters
          </h3>

          {/* Budget Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Campaign Budget</span>
              <span className="font-bold text-brand-300">{formatCurrency(budget)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-label="Campaign Budget"
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹5 Lakh</span>
              <span>₹50 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="form-label">Duration (Days)</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2 text-xs rounded-xl font-semibold transition border ${
                    duration === d
                      ? "bg-brand-600 border-brand-500 text-white"
                      : "bg-white/05 border-white/08 text-slate-400 hover:text-white"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* Target Cities */}
          <div>
            <label className="form-label">Target Cities</label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-white/03 rounded-xl border border-white/06">
              {INDIA_CITIES.slice(0, 10).map((city) => {
                const isSelected = selectedCities.includes(city);
                return (
                  <button
                    key={city}
                    onClick={() => toggleCity(city)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      isSelected
                        ? "bg-brand-500 text-white"
                        : "bg-white/05 text-slate-400 hover:text-white"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industry & Objective */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="form-input text-xs"
                aria-label="Select Industry"
              >
                <option>FMCG & Retail</option>
                <option>Automotive</option>
                <option>Consumer Electronics</option>
                <option>E-Commerce</option>
                <option>Banking & Finance</option>
              </select>
            </div>
            <div>
              <label className="form-label">Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="form-input text-xs"
                aria-label="Select Objective"
              >
                <option>Brand Awareness & Footfall</option>
                <option>Product Launch</option>
                <option>Direct Sales Conversion</option>
                <option>Event Promotion</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running AI Models...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate AI Media Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Output Recommendations (7 cols) */}
        {hasResult && (
          <div className="lg:col-span-7 space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-card p-3.5">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Expected Reach</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">
                  {(estimatedReach / 100000).toFixed(1)} Lakh
                </p>
              </div>
              <div className="glass-card p-3.5">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Impressions</p>
                <p className="text-lg font-bold text-cyan-300 mt-0.5">
                  {(estimatedImpressions / 10000000).toFixed(2)} Cr
                </p>
              </div>
              <div className="glass-card p-3.5">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">ROI Prediction</p>
                <p className="text-lg font-bold text-purple-400 mt-0.5">{roiPrediction}%</p>
              </div>
              <div className="glass-card p-3.5">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Frequency</p>
                <p className="text-lg font-bold text-amber-400 mt-0.5">4.2x</p>
              </div>
            </div>

            {/* AI Media Mix Allocation */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Recommended Media Allocation</span>
                <span className="text-[10px] text-brand-400 font-semibold">AI Optimized</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Large Format Billboards & Unipoles (55%)</span>
                    <span className="font-bold text-white">{formatCurrency(oohAlloc)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/05 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: "55%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Premium Mall Media & Atriums (25%)</span>
                    <span className="font-bold text-white">{formatCurrency(mallAlloc)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/05 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Digital LED Screens & Transit (20%)</span>
                    <span className="font-bold text-white">{formatCurrency(digitalAlloc)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/05 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommended Specific Locations */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Top AI Recommended Locations
              </h3>

              <div className="space-y-2.5">
                {[
                  { name: "Western Express Highway Billboard A1", city: "Mumbai", rate: 185000, reach: "25L", score: 98 },
                  { name: "Connaught Place Unipole 01", city: "Delhi NCR", rate: 225000, reach: "30L", score: 95 },
                  { name: "Phoenix Mall Atrium Branding", city: "Mumbai", rate: 350000, reach: "8L", score: 92 },
                  { name: "MG Road Digital LED Screen", city: "Bangalore", rate: 150000, reach: "18L", score: 89 },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl bg-white/03 border border-white/06 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                          {item.score}% Match
                        </span>
                        <p className="text-xs font-bold text-white">{item.name}</p>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.city} • Est. Reach: {item.reach}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-300">
                      {formatCurrency(item.rate)}/mo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
