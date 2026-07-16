import {
  boolean,
  date,
  decimal,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

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

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password_hash: text("password_hash").notNull(),
  currency: text("currency").default("USD").notNull(),
  monthly_budget: decimal("monthly_budget", { precision: 12, scale: 2 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auth_sessions = pgTable(
  "auth_sessions",
  {
    token_hash: text("token_hash").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("auth_sessions_user_idx").on(table.user_id)],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    color: text("color").notNull().default("mint"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("categories_user_name_unique").on(table.user_id, table.name),
    index("categories_user_idx").on(table.user_id),
  ],
);

export const expenses = pgTable(
  "expenses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category_id: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    merchant: text("merchant").notNull(),
    description: text("description"),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    expense_date: date("expense_date", { mode: "string" }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("expenses_user_date_idx").on(table.user_id, table.expense_date),
    index("expenses_user_category_idx").on(table.user_id, table.category_id),
  ],
);

export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
