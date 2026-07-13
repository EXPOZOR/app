import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Version",
  description: "EXPOZOR build information.",
  robots: { index: false, follow: false },
};

const sha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev";
const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE ?? null;
const version = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.1";
const env = process.env.NODE_ENV ?? "development";

const GITHUB_REPO = "https://github.com/EXPOZOR/app";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function VersionPage() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.EXPOZOR_VERSION_PAGE_ENABLED !== "true"
  ) {
    notFound();
  }

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Version", value: `v${version}` },
    {
      label: "Commit",
      value:
        sha === "dev" ? (
          <span className="font-mono text-text-muted">dev</span>
        ) : (
          <a
            href={`${GITHUB_REPO}/commit/${sha}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-accent hover:underline"
          >
            {sha}
          </a>
        ),
    },
    {
      label: "Build date",
      value: (
        <time dateTime={buildDate ?? undefined} className="tabular-nums">
          {formatDate(buildDate)} UTC
        </time>
      ),
    },
    {
      label: "Environment",
      value: (
        <span className={env === "production" ? "text-emerald-400" : "text-amber-400"}>{env}</span>
      ),
    },
    {
      label: "Repository",
      value: (
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline break-all"
        >
          {GITHUB_REPO}
        </a>
      ),
    },
  ];

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        {/* Logo / wordmark */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center font-black text-lg text-black select-none">
            E
          </div>
          <span className="font-bold text-text-primary tracking-tight text-lg">EXPOZOR</span>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-border bg-bg-surface overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-bg-elev-1">
            <h1 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
              Build info
            </h1>
          </div>

          <dl className="divide-y divide-border">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4 px-5 py-3.5">
                <dt className="text-sm text-text-muted shrink-0 w-28">{label}</dt>
                <dd className="text-sm text-text-primary text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-4 text-center text-xs text-text-tertiary">
          This page is not indexed by search engines.
        </p>
      </div>
    </main>
  );
}
