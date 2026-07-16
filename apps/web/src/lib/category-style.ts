export const CATEGORY_COLOR_OPTIONS = [
  { value: "mint", label: "Mint" },
  { value: "blue", label: "Blue" },
  { value: "lilac", label: "Lilac" },
  { value: "amber", label: "Amber" },
  { value: "rose", label: "Rose" },
  { value: "cyan", label: "Cyan" },
  { value: "slate", label: "Slate" },
] as const;

const toneClasses: Record<string, string> = {
  mint: "bg-accent-subtle text-accent border-border-accent",
  blue: "bg-info/10 text-info border-info/25",
  lilac: "bg-decorative-subtle text-decorative border-decorative/25",
  amber: "bg-warn/10 text-warn border-warn/25",
  rose: "bg-danger/10 text-danger border-danger/25",
  cyan: "bg-info/10 text-info border-info/25",
  slate: "bg-bg-muted/40 text-text-secondary border-border",
};

const chartColors: Record<string, string> = {
  mint: "var(--brand-mint)",
  blue: "var(--info)",
  lilac: "var(--brand-lilac)",
  amber: "var(--warn)",
  rose: "var(--danger)",
  cyan: "color-mix(in oklch, var(--info) 70%, var(--brand-mint))",
  slate: "var(--text-tertiary)",
};

export function categoryTone(color: string | null) {
  return toneClasses[color ?? "slate"] ?? toneClasses.slate;
}

export function categoryChartColor(color: string | null) {
  return chartColors[color ?? "slate"] ?? chartColors.slate;
}
