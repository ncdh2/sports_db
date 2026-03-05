import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const { isDemo } = await connectToDatabase();

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      demoMode: isDemo,
      message: isDemo
        ? "Running in demo mode. Set MONGODB_URI to use real database."
        : "Connected to database",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Health check failed",
      },
      { status: 500 },
    );
  }
}
