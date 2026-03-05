import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { UserRole } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      role = UserRole.USER,
    } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const db = await getDb();

    if (!db) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI." },
        { status: 503 },
      );
    }

    const usersCollection = db.collection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name,
      role: role === UserRole.MAIN_ADMIN ? UserRole.USER : role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await usersCollection.findOne({ _id: result.insertedId });
    const token = generateToken({
      _id: result.insertedId.toString(),
      email,
      name,
      role,
    });

    const response = NextResponse.json(
      {
        user: {
          id: result.insertedId,
          email,
          name,
          role,
        },
      },
      { status: 201 },
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
