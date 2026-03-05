import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SessionUser, UserRole } from "./types";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "30d";

if (!process.env.JWT_SECRET && typeof window === "undefined") {
  console.warn(
    "[v0] JWT_SECRET not configured. Using default insecure key. Set JWT_SECRET in environment variables for production.",
  );
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  federationId?: string;
}): string {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      federationId: user.federationId,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY },
  );
}

export function verifyToken(token: string): SessionUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionUser;
    return decoded;
  } catch (error) {
    return null;
  }
}
