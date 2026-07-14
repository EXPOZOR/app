-- 002_waitlist_consent.sql
-- Run once against an existing database created before waitlist consent was stored.

ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS product_updates_consent BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS product_updates_consent_at TIMESTAMPTZ;
