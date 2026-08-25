"use client";

import {
  TotalCampaignsCard,
  TotalRevenueCard,
  MediaBookingsCard,
  CampaignROICard,
  ActiveCitiesCard,
  PendingApprovalsCard,
} from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import CampaignStatusChart from "@/components/dashboard/CampaignStatusChart";
import TopMediaTypes from "@/components/dashboard/TopMediaTypes";
import MediaInventoryMap from "@/components/dashboard/MediaInventoryMap";
import RecentCampaigns from "@/components/dashboard/RecentCampaigns";
import QuickActions from "@/components/dashboard/QuickActions";
import AIRecommendationPanel from "@/components/dashboard/AIRecommendationPanel";
import RevenueByCity from "@/components/dashboard/RevenueByCity";
import StatsBar from "@/components/dashboard/StatsBar";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import AIAssistant from "@/components/dashboard/AIAssistant";
import { dashboardKPIs } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Cards Row (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <TotalCampaignsCard
          value={dashboardKPIs.totalCampaigns.value}
          change={dashboardKPIs.totalCampaigns.change}
        />
        <TotalRevenueCard
          value={dashboardKPIs.totalRevenue.value}
          change={dashboardKPIs.totalRevenue.change}
        />
        <MediaBookingsCard
          value={dashboardKPIs.mediaBookings.value}
          change={dashboardKPIs.mediaBookings.change}
        />
        <CampaignROICard
          value={dashboardKPIs.campaignROI.value}
          change={dashboardKPIs.campaignROI.change}
        />
        <ActiveCitiesCard value={dashboardKPIs.activeCities.value} />
        <PendingApprovalsCard
          value={dashboardKPIs.pendingApprovals.value}
          change={dashboardKPIs.pendingApprovals.change}
        />
      </div>

      {/* Row 2: Revenue Trend (6 cols), Campaign Status (3 cols), Top Media Types (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        <div className="lg:col-span-6 min-h-[320px]">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3 min-h-[320px]">
          <CampaignStatusChart />
        </div>
        <div className="lg:col-span-3 min-h-[320px]">
          <TopMediaTypes />
        </div>
      </div>

      {/* Row 3: Inventory Map (5 cols), Recent Campaigns (4 cols), Quick Actions (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        <div className="lg:col-span-5 min-h-[340px]">
          <MediaInventoryMap />
        </div>
        <div className="lg:col-span-4 min-h-[340px]">
          <RecentCampaigns />
        </div>
        <div className="lg:col-span-3 min-h-[340px]">
          <QuickActions />
        </div>
      </div>

      {/* Row 4: AI Recommendation Banner (8 cols) + Revenue By City (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        <div className="lg:col-span-8">
          <AIRecommendationPanel />
        </div>
        <div className="lg:col-span-4">
          <RevenueByCity />
        </div>
      </div>

      {/* Bottom Summary Ribbon & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
        <div className="lg:col-span-9">
          <StatsBar />
        </div>
        <div className="lg:col-span-3">
          <LiveActivityFeed />
        </div>
      </div>
    </div>
  );
}
