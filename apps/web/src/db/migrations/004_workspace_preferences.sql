-- 004_workspace_preferences.sql
-- Adds the small set of preferences used by the premium workspace dashboard.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD';

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS monthly_budget NUMERIC(12, 2);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'users_monthly_budget_positive'
  ) THEN
    ALTER TABLE users
      ADD CONSTRAINT users_monthly_budget_positive
      CHECK (monthly_budget IS NULL OR monthly_budget > 0);
  END IF;
END
$$;
