"use client";

import { Settings, Save, Lock, Bell, Globe, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Settings className="text-brand-400" size={26} />
          System Settings & Platform Config
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Agency profile, tax rates (GST 18%), currency settings, API keys & integrations
        </p>
      </div>

      <div className="glass-card p-6 space-y-6 max-w-3xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/08 pb-2">
            Agency Branding & Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Agency Name</label>
              <input type="text" defaultValue="MediaSphere AI Agencies Pvt Ltd" className="form-input text-xs" />
            </div>
            <div>
              <label className="form-label">GSTIN Number</label>
              <input type="text" defaultValue="27AAAAA0000A1Z5" className="form-input text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Default Currency</label>
              <select className="form-input text-xs" aria-label="Default Currency">
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
              </select>
            </div>
            <div>
              <label className="form-label">Standard GST Rate</label>
              <input type="text" defaultValue="18%" className="form-input text-xs" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/08 pb-2">
            Integrations & API Keys
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/03 border border-white/06 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Google Maps GIS API</p>
                <p className="text-slate-500">Active • Heatmap & Geocoding enabled</p>
              </div>
              <button className="btn-secondary py-1 px-3">Configure</button>
            </div>

            <div className="p-3 rounded-xl bg-white/03 border border-white/06 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">WhatsApp & SMS Notifications API</p>
                <p className="text-slate-500">Connected</p>
              </div>
              <button className="btn-secondary py-1 px-3">Configure</button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/08 flex justify-end">
          <button className="btn-primary py-2 px-5 flex items-center gap-2 font-bold text-xs">
            <Save size={14} />
            <span>Save Platform Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
