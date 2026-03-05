/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth, checkRole, requireRole } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const facilitiesCollection = db?.collection("facilities");

    const query: any = {};
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const facilities = await facilitiesCollection?.find(query).toArray();
    return NextResponse.json({ facilities }, { status: 200 });
  } catch (error) {
    console.error("Get facilities error:", error);
    return NextResponse.json(
      { error: "Failed to fetch facilities" },
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
    const facilitiesCollection = db?.collection("facilities");

    const facilityData = {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      description: data.description || "",
      sports: data.sports || [],
      capacity: data.capacity || 0,
      amenities: data.amenities || [],
      contact: data.contact,
      owner: data.owner,
      federationId,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await facilitiesCollection?.insertOne(facilityData);
    return NextResponse.json(
      { facility: { _id: result?.insertedId, ...facilityData } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create facility error:", error);
    return NextResponse.json(
      { error: "Failed to create facility" },
      { status: 500 },
    );
  }
}
