import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth, checkRole, requireRole } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const db = await getDb();
    const coachesCollection = db?.collection("coaches");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (user?.role === UserRole.FEDERATION_ADMIN && user?.federationId) {
      query.federationId = user.federationId;
    }

    const coaches = await coachesCollection?.find(query).toArray();
    return NextResponse.json({ coaches }, { status: 200 });
  } catch (error) {
    console.error("Get coaches error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coaches" },
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
    const coachesCollection = db?.collection("coaches");

    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      specialization: data.specialization || [],
      qualifications: data.qualifications || [],
      experience: data.experience || 0,
      federationId,
      athletes: [],
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await coachesCollection?.insertOne(coachData);
    return NextResponse.json(
      { coach: { _id: result?.insertedId, ...coachData } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create coach error:", error);
    return NextResponse.json(
      { error: "Failed to create coach" },
      { status: 500 },
    );
  }
}
