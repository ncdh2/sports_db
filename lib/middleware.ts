import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";
import { UserRole, SessionUser } from "./types";

export async function verifyAuth(
  request: NextRequest,
): Promise<{ user: SessionUser | null; response: NextResponse | null }> {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = verifyToken(token);
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export function checkRole(
  user: SessionUser | null,
  allowedRoles: UserRole[],
): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

export function requireRole(
  user: SessionUser | null,
  requiredRole: UserRole[],
): NextResponse | null {
  if (!checkRole(user, requiredRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
