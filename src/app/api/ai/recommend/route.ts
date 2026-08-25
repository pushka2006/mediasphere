import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { budget = 2500000, duration = 30, cities = ["Mumbai"] } = body;

    const estimatedReach = Math.round((budget / 100) * (duration / 30) * 0.85);
    const estimatedImpressions = estimatedReach * 8;
    const roiPrediction = Math.min(350, Math.round(150 + (budget / 500000) * 12));

    const recommendation = {
      bestCity: {
        name: cities[0] || "Mumbai",
        expectedReach: `${(estimatedReach / 100000).toFixed(1)} Lakh People`,
        reason: "Highest traffic density and impression yield",
      },
      bestMediaMix: {
        mix: "OOH Billboards (55%) + Mall Media (25%) + Digital Screens (20%)",
        expectedRoi: `${roiPrediction}% - ${roiPrediction + 30}%`,
        reason: "Balanced upper funnel awareness and mid-funnel activation",
      },
      budgetOptimization: {
        saving: `₹${(budget * 0.08 / 100000).toFixed(1)} Lakh`,
        strategy: "Consolidate volume bookings with top 2 regional media owners",
      },
      forecast: {
        reach: estimatedReach,
        impressions: estimatedImpressions,
        roi: roiPrediction,
      },
    };

    return NextResponse.json({ success: true, recommendation });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
