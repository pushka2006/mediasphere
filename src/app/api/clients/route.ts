import { NextResponse } from "next/server";
import { mockClients, mockUsers } from "@/lib/mockData";
import { Client } from "@/types";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockClients,
    count: mockClients.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, phone, city, state, industry, segment, status, rating, totalRevenue } = body;

    if (!company || !name) {
      return NextResponse.json(
        { success: false, error: "Company name and contact name are required" },
        { status: 400 }
      );
    }

    const newClient: Client = {
      id: `c${Date.now()}`,
      company: company.trim(),
      name: name.trim(),
      email: email?.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: phone?.trim() || "+91 98765 00000",
      city: city?.trim() || "Mumbai",
      state: state?.trim() || "Maharashtra",
      industry: industry || "FMCG",
      segment: segment || "ENTERPRISE",
      status: status || "ACTIVE",
      rating: rating ? Number(rating) : 5,
      totalRevenue: totalRevenue ? Number(totalRevenue) : 0,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=6366f1&color=fff`,
      manager: mockUsers[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: { campaigns: 0, invoices: 0 },
    };

    mockClients.unshift(newClient);

    return NextResponse.json(
      {
        success: true,
        message: "Client created successfully",
        data: newClient,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create client" },
      { status: 500 }
    );
  }
}
