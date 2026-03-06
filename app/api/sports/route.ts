import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ sports: [] }, { status: 200 });
    }

    const sportsCollection = db.collection("sports");
    const sports = await sportsCollection.find({}).toArray();

    return NextResponse.json({ sports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sports:", error);
    return NextResponse.json(
      { error: "Failed to fetch sports" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    // Only MAIN_ADMIN can create sports
    if (user?.role !== UserRole.MAIN_ADMIN) {
      return NextResponse.json(
        { error: "Only admin can create sports" },
        { status: 403 },
      );
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: "Sport name is required" },
        { status: 400 },
      );
    }

    const sportsCollection = db.collection("sports");

    // Check if sport already exists
    const existing = await sportsCollection.findOne({ name: data.name });
    if (existing) {
      return NextResponse.json(
        { error: "Sport already exists" },
        { status: 409 },
      );
    }

    const sportData = {
      name: data.name,
      description: data.description || null,
      category: data.category || "Other",
      icon: data.icon || null,
      rules: data.rules || null,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await sportsCollection.insertOne(sportData);

    return NextResponse.json(
      { message: "Sport created successfully", id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating sport:", error);
    return NextResponse.json(
      { error: "Failed to create sport" },
      { status: 500 },
    );
  }
}
