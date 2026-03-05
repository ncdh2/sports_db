import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connectionError: Error | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, isDemo: false };
  }

  if (connectionError) {
    return {
      client: null,
      db: null,
      isDemo: true,
      error: connectionError.message,
    };
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const error = new Error("MONGODB_URI not configured");
    connectionError = error;
    return { client: null, db: null, isDemo: true, error: error.message };
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("sports_ng");

    cachedClient = client;
    cachedDb = db;

    return { client, db, isDemo: false };
  } catch (error) {
    const err =
      error instanceof Error ? error : new Error("Unknown connection error");
    connectionError = err;
    return { client: null, db: null, isDemo: true, error: err.message };
  }
}

export async function getDb() {
  const { db } = await connectToDatabase();
  return db;
}

export function isInDemoMode(): boolean {
  return !process.env.MONGODB_URI;
}
