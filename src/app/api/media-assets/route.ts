import { NextResponse } from "next/server";
import { mockMediaAssets } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockMediaAssets,
    count: mockMediaAssets.length,
  });
}
