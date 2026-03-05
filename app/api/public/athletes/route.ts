/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const athletesCollection = db?.collection("athletes");

    const { searchParams } = new URL(request.url);
    const query: any = { status: "Active" };

    const search = searchParams.get("search");
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    const sport = searchParams.get("sport");
    if (sport) {
      query.sports = { $in: [sport] };
    }

    const state = searchParams.get("state");
    if (state) {
      query.state = state;
    }

    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const skip = parseInt(searchParams.get("skip") || "0");

    const athletes = await athletesCollection
      ?.find(query)
      .limit(limit)
      .skip(skip)
      .toArray();

    const total = (await athletesCollection?.countDocuments(query)) ?? 0;

    return NextResponse.json(
      {
        athletes,
        pagination: { total, limit, skip, pages: Math.ceil(total / limit) },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get public athletes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch athletes" },
      { status: 500 },
    );
  }
}
