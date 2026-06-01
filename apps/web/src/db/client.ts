import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  const databaseUrl = process.env["DATABASE_URL"];
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

// Singleton pattern — re-use across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof createDb> | undefined;
}

export const db = global._db ?? createDb();

if (process.env["NODE_ENV"] !== "production") {
  global._db = db;
}
