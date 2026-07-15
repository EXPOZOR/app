import { ClipboardList, Map as MapIcon, MonitorPlay } from "lucide-react";

const TRUST_ITEMS = [
  { icon: MonitorPlay, label: "Local demo available" },
  { icon: ClipboardList, label: "Manual entry comes first" },
  { icon: MapIcon, label: "Upload, CSV, and AI on the roadmap" },
] as const;

/**
 * The single compact product-status summary on the homepage.
 */
export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-strip-heading"
      className="compact-band-py border-y border-border"
    >
      <div className="container-site flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
        <h2
          id="trust-strip-heading"
          className="type-eyebrow m-0 whitespace-nowrap text-center text-text-tertiary"
        >
          Current status
        </h2>

        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-3 p-0">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium tracking-tight text-text-secondary"
              >
                <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
