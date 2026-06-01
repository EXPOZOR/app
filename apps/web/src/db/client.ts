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

type Db = ReturnType<typeof createDb>;

// Lazy singleton — does NOT throw at module import time.
// Only throws when actually accessed (i.e. when a server action runs).
let _instance: Db | undefined;

export function getDb(): Db {
  if (!_instance) {
    _instance = createDb();
  }
  return _instance;
}

// Keep backward-compat default export for any other consumers,
// but as a Proxy so it's lazy and won't crash at import time.
export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    return typeof value === "function" ? value.bind(realDb) : value;
  },
});
