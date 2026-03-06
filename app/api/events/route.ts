import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware";
import { UserRole } from "@/lib/types";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ events: [] }, { status: 200 });
    }

    const url = new URL(request.url);
    const sportId = url.searchParams.get("sportId");

    const eventsCollection = db.collection("sportEvents");
    const query = sportId ? { sportId: new ObjectId(sportId) } : {};
    const events = await eventsCollection.find(query).toArray();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sport events:", error);
    return NextResponse.json(
      { error: "Failed to fetch sport events" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    // Only MAIN_ADMIN can create sport events
    if (user?.role !== UserRole.MAIN_ADMIN) {
      return NextResponse.json(
        { error: "Only admin can create sport events" },
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

    // Validate required fields
    if (!data.name || !data.sportId) {
      return NextResponse.json(
        { error: "Name and sportId are required" },
        { status: 400 },
      );
    }

    // Get sport details
    const sportsCollection = db.collection("sports");
    const sport = await sportsCollection.findOne({
      _id: new ObjectId(data.sportId),
    });
    if (!sport) {
      return NextResponse.json({ error: "Sport not found" }, { status: 404 });
    }

    const eventsCollection = db.collection("sportEvents");
    const eventData = {
      name: data.name,
      sportId: new ObjectId(data.sportId),
      sportName: sport.name,
      description: data.description || null,
      eventType: data.eventType || "Other",
      rules: data.rules || null,
      standardDistance: data.standardDistance || null,
      minParticipants: data.minParticipants || null,
      maxParticipants: data.maxParticipants || null,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await eventsCollection.insertOne(eventData);

    return NextResponse.json(
      {
        message: "Sport event created successfully",
        eventId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating sport event:", error);
    return NextResponse.json(
      { error: "Failed to create sport event" },
      { status: 500 },
    );
  }
}
