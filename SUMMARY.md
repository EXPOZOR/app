# EXPOZOR project handoff

Last audited: 2026-07-14

## Current status

The public marketing site and the local product simulation are complete enough to keep. The site is still waitlist-only: billing, bank connections, uploads, CSV import, AI categorization, and mobile apps are clearly described as planned rather than live.

The About page intentionally presents the founder as **MOHAMED KARRACH** with no founder photo.

The waitlist code is ready for deployment after the database consent migration is applied and the production email configuration is verified.

## Public surface

- Homepage plus Features, Demo, Pricing, Security, Blog, Changelog, About, Careers, Contact, Download, and six legal pages.
- Three statically generated blog posts and a working blog RSS feed.
- One changelog entry and a working changelog RSS feed.
- Search metadata, canonical URLs, structured data, social images, icons, robots.txt, sitemap.xml, llms.txt, and a web manifest.
- A sample-only expense simulation that runs entirely in the browser and does not save or send financial information.

## Completed in the launch-readiness audit

- Made the public Demo route crawlable and stopped blocking Next.js assets in robots.txt.
- Added all blog posts to the sitemap.
- Added the missing web manifest and corrected icon/logo metadata to reference real assets.
- Added storage for optional product-update consent, including a consent timestamp and an upgrade path for existing waitlist emails.
- Added `002_waitlist_consent.sql` for existing databases and updated the original migration for fresh databases.
- Changed waitlist success copy so it does not promise that an asynchronous confirmation email has already arrived.
- Kept confirmation email language aligned with expense tracking rather than broad money-management claims.
- Restored the demo category selector's visible keyboard focus treatment.
- Confirmed the Demo success panel can be dismissed manually and now disappears automatically after five seconds.
- Added accessible names to the mobile step controls and aligned visible labels with their accessible names.
- Removed `unsafe-eval` from the production Content Security Policy while keeping it available for development.
- Pinned Next.js output tracing to this repository so deployment does not depend on an unrelated lockfile higher on the computer.

## Verification completed

- Biome: 80 files checked, no issues.
- TypeScript: passed with no errors.
- Next.js production build: passed; 33 static pages generated.
- Browser audit: homepage plus 19 secondary public HTML routes checked at desktop and phone sizes.
- Every audited page had one H1, one main region, the expected canonical URL, no missing image alt text, no horizontal page overflow, and no browser errors.
- Mobile navigation: opens as a dialog, locks background scrolling, closes with Escape, and restores focus to the menu button.
- Waitlist: invalid email feedback is announced, marks the field invalid, and returns focus to the field without contacting the database.
- FAQ: filtering and accordion expansion work.
- Demo: sample entry, local category suggestion, confirmation, recent-transaction update, and automatic success-message dismissal all work.
- Discovery endpoints: robots.txt, sitemap.xml, manifest.webmanifest, llms.txt, blog RSS, and changelog RSS return successfully.
- Security headers and social/icon image endpoints return successfully.
- Lighthouse on the local production build: Accessibility 100, SEO 100, Performance 74, Best Practices 81, TBT 70 ms, CLS 0. The performance run was affected by local antivirus proxying, and Best Practices is reduced because localhost is HTTP. The server itself returns gzip-compressed HTML; repeat the audit on the deployed HTTPS domain for authoritative performance and best-practice scores.

## Required before the next deployment

1. Apply `apps/web/src/db/migrations/002_waitlist_consent.sql` to the existing production database before deploying this code.
2. Confirm that the Resend sender domain for `support@expozor.com` is verified and can deliver confirmation messages.
3. Confirm that support, privacy, legal, and security email addresses are live and monitored.
4. After the migration, submit one controlled test signup on the deployed site and verify the database row, consent fields, and confirmation email. Remove the test row afterward.
5. Run Lighthouse against the final HTTPS production URL.

## External decisions still open

- Confirm the public Twitter/X and GitHub destinations or remove those links until the accounts are ready.
- Have the legal pages reviewed before accepting public users or payments.
- Add App Store and Google Play links only when the apps exist.
- Add pricing offers to structured data only after billing and final prices are live.
- Keep all planned-feature wording current as product capabilities launch.

## Demo decision

Keep the public Demo route. It is clearly labeled as a local simulation, uses sample data, avoids persistence and external requests, works on mobile, supports review before confirmation, and has no remaining launch-blocking behavior found in this audit.
