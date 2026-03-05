/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth, requireRole } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const competitionsCollection = db?.collection("competitions");

    const { searchParams } = new URL(request.url);
    const query: any = {};

    const status = searchParams.get("status");
    if (status) {
      query.status = status;
    }

    const sport = searchParams.get("sport");
    if (sport) {
      query.sport = sport;
    }

    const competitions = await competitionsCollection?.find(query).toArray();
    return NextResponse.json({ competitions }, { status: 200 });
  } catch (error) {
    console.error("Get competitions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch competitions" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const roleCheck = requireRole(user, [
      UserRole.MAIN_ADMIN,
      UserRole.FEDERATION_ADMIN,
    ]);
    if (roleCheck) return roleCheck;

    const data = await request.json();
    let federationId = data.federationId;
    if (user?.role === UserRole.FEDERATION_ADMIN) {
      federationId = user.federationId;
    }

    const db = await getDb();
    const competitionsCollection = db?.collection("competitions");

    const competitionData = {
      name: data.name,
      description: data.description || "",
      sport: data.sport,
      federationId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      location: data.location,
      facilityId: data.facilityId,
      type: data.type,
      status: data.status || "Upcoming",
      participants: data.participants || [],
      rules: data.rules || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await competitionsCollection?.insertOne(competitionData);
    return NextResponse.json(
      { competition: { _id: result?.insertedId, ...competitionData } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create competition error:", error);
    return NextResponse.json(
      { error: "Failed to create competition" },
      { status: 500 },
    );
  }
}
