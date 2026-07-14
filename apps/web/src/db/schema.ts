import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").default("landing").notNull(),
  referrer: text("referrer"),
  locale: text("locale").default("en").notNull(),
  product_updates_consent: boolean("product_updates_consent").default(false).notNull(),
  product_updates_consent_at: timestamp("product_updates_consent_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;
