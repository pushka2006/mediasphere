"use client";

import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Megaphone,
  IndianRupee,
  Layers,
  Target,
  MapPin,
  Clock,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  className?: string;
  delay?: number;
}

export default function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  subtitle,
  icon: Icon,
  iconColor = "#6366f1",
  iconBg,
  prefix = "",
  suffix = "",
  isCurrency = false,
  className,
  delay = 0,
}: KPICardProps) {
  const displayValue = isCurrency
    ? formatCurrency(Number(value))
    : typeof value === "number" && value > 1000
    ? formatNumber(value)
    : `${prefix}${value}${suffix}`;

  const TrendIcon =
    changeType === "up"
      ? TrendingUp
      : changeType === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    changeType === "up"
      ? "#10b981"
      : changeType === "down"
      ? "#ef4444"
      : "#64748b";

  return (
    <div
      className={cn("kpi-card animate-slide-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 rounded-xl opacity-5"
        style={{ background: `radial-gradient(circle at top right, ${iconColor}, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: iconBg || `${iconColor}18`,
              boxShadow: `0 0 20px ${iconColor}20`,
            }}
          >
            <Icon size={20} style={{ color: iconColor }} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="relative">
        <p
          className="text-2xl font-extrabold text-white leading-none tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {displayValue}
        </p>

        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}

        {/* Change indicator */}
        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-3">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: `${trendColor}15`,
                color: trendColor,
              }}
            >
              <TrendIcon size={11} />
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
            <span className="text-xs text-slate-600">this month</span>
          </div>
        )}
      </div>

      {/* Mini sparkline placeholder */}
      <div className="absolute bottom-3 right-3 opacity-20">
        <svg width="60" height="24" viewBox="0 0 60 24">
          <polyline
            points="0,20 10,14 20,18 30,8 40,12 50,4 60,8"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── Preset KPI Cards ─────────────────────────────────────────────────────────

export function TotalCampaignsCard({ value, change }: { value: number; change: number }) {
  return (
    <KPICard
      title="Total Campaigns"
      value={value}
      change={change}
      changeType="up"
      icon={Megaphone}
      iconColor="#6366f1"
      delay={0}
    />
  );
}

export function TotalRevenueCard({ value, change }: { value: number; change: number }) {
  return (
    <KPICard
      title="Total Revenue"
      value={value}
      change={change}
      changeType="up"
      isCurrency
      icon={IndianRupee}
      iconColor="#10b981"
      delay={50}
    />
  );
}

export function MediaBookingsCard({ value, change }: { value: number; change: number }) {
  return (
    <KPICard
      title="Media Bookings"
      value={value}
      change={change}
      changeType="up"
      icon={Layers}
      iconColor="#06b6d4"
      delay={100}
    />
  );
}

export function CampaignROICard({ value, change }: { value: number; change: number }) {
  return (
    <KPICard
      title="Campaign ROI"
      value={value}
      change={change}
      changeType="up"
      suffix="%"
      icon={Target}
      iconColor="#f59e0b"
      delay={150}
    />
  );
}

export function ActiveCitiesCard({ value }: { value: number }) {
  return (
    <KPICard
      title="Active Cities"
      value={value}
      subtitle="Across India"
      icon={MapPin}
      iconColor="#a855f7"
      delay={200}
    />
  );
}

export function PendingApprovalsCard({ value, change }: { value: number; change: number }) {
  return (
    <KPICard
      title="Pending Approvals"
      value={value}
      change={change}
      changeType="down"
      icon={Clock}
      iconColor="#ef4444"
      delay={250}
    />
  );
}
