"use client";

import { Sparkles, ArrowRight, Brain, Zap, Target, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

export default function AIRecommendationPanel() {
  return (
    <div className="glass-card p-5 relative overflow-hidden gradient-border">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
            <Brain size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI RECOMMENDATION ENGINE
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-accent-500/20 text-accent-300 font-bold border border-accent-500/30">
                PRO
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Smart suggestions for your next OOH & media campaign
            </p>
          </div>
        </div>

        <Link
          href="/ai-planner"
          className="btn-primary text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
        >
          <span>Open AI Planner</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
        {/* Recommendation 1 */}
        <div className="p-3.5 rounded-xl bg-white/05 border border-white/08 hover:border-brand-500/40 transition group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Target size={13} />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Best City
            </span>
          </div>
          <p className="text-sm font-bold text-white group-hover:text-purple-300 transition">
            Mumbai
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Expected Reach: <span className="text-slate-200 font-semibold">2.45 Cr People</span>
          </p>
        </div>

        {/* Recommendation 2 */}
        <div className="p-3.5 rounded-xl bg-white/05 border border-white/08 hover:border-cyan-500/40 transition group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap size={13} />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Best Media Mix
            </span>
          </div>
          <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
            OOH + Mall Media
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Expected ROI: <span className="text-emerald-400 font-semibold">210% – 240%</span>
          </p>
        </div>

        {/* Recommendation 3 */}
        <div className="p-3.5 rounded-xl bg-white/05 border border-white/08 hover:border-emerald-500/40 transition group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign size={13} />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Budget Optimization
            </span>
          </div>
          <p className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition">
            Save up to ₹12.4 Lakh
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            By shifting 15% budget to Digital Screens
          </p>
        </div>

        {/* Recommendation 4 */}
        <div className="p-3.5 rounded-xl bg-white/05 border border-white/08 hover:border-amber-500/40 transition group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Calendar size={13} />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Optimal Duration
            </span>
          </div>
          <p className="text-sm font-bold text-white group-hover:text-amber-300 transition">
            28 – 35 Days
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Maximum ad frequency saturation
          </p>
        </div>
      </div>
    </div>
  );
}
