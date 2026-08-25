import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCampaigns,
    count: mockCampaigns.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCampaign = {
      id: `camp_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, data: newCampaign }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}
