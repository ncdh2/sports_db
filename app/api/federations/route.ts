import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth, requireRole } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const federationsCollection = db?.collection("federations");

    const federations = await federationsCollection?.find({}).toArray();
    return NextResponse.json({ federations }, { status: 200 });
  } catch (error) {
    console.error("Get federations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch federations" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const roleCheck = requireRole(user, [UserRole.MAIN_ADMIN]);
    if (roleCheck) return roleCheck;

    const data = await request.json();
    const db = await getDb();
    const federationsCollection = db?.collection("federations");

    const federationData = {
      name: data.name,
      acronym: data.acronym,
      sport: data.sport,
      description: data.description || "",
      president: data.president,
      email: data.email,
      phone: data.phone,
      address: data.address,
      state: data.state,
      website: data.website || "",
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await federationsCollection?.insertOne(federationData);
    return NextResponse.json(
      { federation: { _id: result?.insertedId, ...federationData } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create federation error:", error);
    return NextResponse.json(
      { error: "Failed to create federation" },
      { status: 500 },
    );
  }
}
