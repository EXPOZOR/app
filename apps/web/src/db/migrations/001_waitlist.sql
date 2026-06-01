-- 001_waitlist.sql
-- Run once against your Neon database to create the waitlist table.
-- Usage: psql $DATABASE_URL -f db/migrations/001_waitlist.sql

CREATE TABLE IF NOT EXISTS waitlist (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL UNIQUE,
  source     TEXT        NOT NULL DEFAULT 'landing',
  referrer   TEXT,
  locale     TEXT        NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast duplicate-check queries
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
