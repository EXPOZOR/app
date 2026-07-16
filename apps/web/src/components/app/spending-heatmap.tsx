import type { TrendPoint } from "@/lib/dashboard";
import { formatMoney } from "@/lib/format";

export function SpendingHeatmap({
  points,
  monthLabel,
  currency,
}: { points: TrendPoint[]; monthLabel: string; currency: string }) {
  const first = points[0]?.key ? new Date(`${points[0].key}T00:00:00Z`).getUTCDay() : 0;
  const max = Math.max(...points.map((point) => point.value), 1);
  const cells: Array<{ key: string; point: TrendPoint | null }> = [
    ...Array.from({ length: first }, (_, index) => ({
      key: `empty-leading-${index}`,
      point: null,
    })),
    ...points.map((point) => ({ key: point.key, point })),
  ];
  let trailing = 0;
  while (cells.length % 7 !== 0) {
    cells.push({ key: `empty-trailing-${trailing}`, point: null });
    trailing += 1;
  }
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div
        className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2"
        role="img"
        aria-label={`${monthLabel} daily spending heatmap`}
      >
        {dayLabels.map((label) => (
          <span
            key={label}
            className="pb-1 text-center text-[10px] font-semibold text-text-tertiary"
          >
            {label.slice(0, 1)}
          </span>
        ))}
        {cells.map(({ key, point }) => {
          if (!point)
            return <span key={key} className="aspect-square rounded-md" aria-hidden="true" />;
          const intensity = point.value ? Math.max(0.22, point.value / max) : 0;
          return (
            <span
              key={point.key}
              className="group relative aspect-square rounded-md border border-transparent transition-transform hover:scale-110 hover:border-border-accent"
              style={{
                background: point.value
                  ? `color-mix(in oklch, var(--brand-mint) ${Math.round(intensity * 100)}%, var(--bg-muted))`
                  : "var(--bg-muted)",
              }}
              title={`${point.key}: ${formatMoney(point.value, currency)}`}
              aria-label={`${point.key}: ${formatMoney(point.value, currency)}`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-text-tertiary">
        <span>Less</span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
            <span
              key={intensity}
              className="size-3 rounded-sm"
              style={{
                background: intensity
                  ? `color-mix(in oklch, var(--brand-mint) ${Math.round(intensity * 100)}%, var(--bg-muted))`
                  : "var(--bg-muted)",
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
