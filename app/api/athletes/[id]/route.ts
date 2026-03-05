import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { verifyAuth, requireRole } from "@/lib/middleware";
import { UserRole } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const athletesCollection = db?.collection("athletes");

    const athlete = await athletesCollection?.findOne({
      _id: new ObjectId(id),
    });
    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    return NextResponse.json({ athlete }, { status: 200 });
  } catch (error) {
    console.error("Get athlete error:", error);
    return NextResponse.json(
      { error: "Failed to fetch athlete" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const roleCheck = requireRole(user, [
      UserRole.MAIN_ADMIN,
      UserRole.FEDERATION_ADMIN,
    ]);
    if (roleCheck) return roleCheck;

    const { id } = await params;
    const data = await request.json();

    const db = await getDb();
    const athletesCollection = db?.collection("athletes");

    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await athletesCollection?.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result?.matchedCount === 0) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    const updatedAthlete = await athletesCollection?.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ athlete: updatedAthlete }, { status: 200 });
  } catch (error) {
    console.error("Update athlete error:", error);
    return NextResponse.json(
      { error: "Failed to update athlete" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);
    if (authResponse) return authResponse;

    const roleCheck = requireRole(user, [UserRole.MAIN_ADMIN]);
    if (roleCheck) return roleCheck;

    const { id } = await params;
    const db = await getDb();
    const athletesCollection = db?.collection("athletes");

    const result = await athletesCollection?.deleteOne({
      _id: new ObjectId(id),
    });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete athlete error:", error);
    return NextResponse.json(
      { error: "Failed to delete athlete" },
      { status: 500 },
    );
  }
}
