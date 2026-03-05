import { NextRequest, NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

import { UserRole } from "@/lib/types";
import { requireRole, verifyAuth } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const db = await getDb();

    if (!db) {
      return NextResponse.json({ athletes: [] }, { status: 200 });
    }

    const athletesCollection = db.collection("athletes");

    const { searchParams } = new URL(request.url);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    // Filter by federation if user is federation admin
    if (user?.role === UserRole.FEDERATION_ADMIN && user?.federationId) {
      query.federationId = user.federationId;
    }

    // Search by name
    const search = searchParams.get("search");
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by sport
    const sport = searchParams.get("sport");
    if (sport) {
      query.sports = { $in: [sport] };
    }

    // Filter by status
    const status = searchParams.get("status");
    if (status) {
      query.status = status;
    }

    const athletes = await athletesCollection.find(query).toArray();
    return NextResponse.json({ athletes }, { status: 200 });
  } catch (error) {
    console.error("Get athletes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch athletes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    // Only MAIN_ADMIN and FEDERATION_ADMIN can create athletes
    const roleCheck = requireRole(user, [
      UserRole.MAIN_ADMIN,
      UserRole.FEDERATION_ADMIN,
    ]);
    if (roleCheck) return roleCheck;

    const data = await request.json();

    // Set federation ID based on role
    let federationId = data.federationId;
    if (user?.role === UserRole.FEDERATION_ADMIN) {
      federationId = user.federationId;
    }

    const db = await getDb();

    if (!db) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI." },
        { status: 503 },
      );
    }

    const athletesCollection = db.collection("athletes");

    const athleteData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      nationality: data.nationality,
      state: data.state,
      photo: data.photo || null,
      bio: data.bio || null,
      sports: data.sports || [],
      federationId,
      coachId: data.coachId || null,
      achievements: data.achievements || [],
      personalBests: data.personalBests || {},
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await athletesCollection.insertOne(athleteData);

    return NextResponse.json(
      {
        athlete: {
          _id: result.insertedId,
          ...athleteData,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create athlete error:", error);
    return NextResponse.json(
      { error: "Failed to create athlete" },
      { status: 500 },
    );
  }
}
