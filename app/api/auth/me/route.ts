import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  try {
    const { user, response: authResponse } = await verifyAuth(request);

    if (authResponse) {
      return authResponse;
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // Return 401 if auth fails (no token, invalid token, etc)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
