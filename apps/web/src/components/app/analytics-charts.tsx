import { categoryChartColor } from "@/lib/category-style";
import type { CategoryBreakdown, TrendPoint } from "@/lib/dashboard";
import { formatMoney } from "@/lib/format";

export function SpendingTrendChart({
  points,
  currency,
}: {
  points: TrendPoint[];
  currency: string;
}) {
  const width = 720;
  const height = 250;
  const padX = 18;
  const padTop = 20;
  const padBottom = 40;
  const plotHeight = height - padTop - padBottom;
  const max = Math.max(...points.map((point) => point.value), 1);
  const coords = points.map((point, index) => ({
    ...point,
    x: padX + (index / Math.max(points.length - 1, 1)) * (width - padX * 2),
    y: padTop + plotHeight - (point.value / max) * plotHeight,
  }));
  const line = coords
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
  const area = coords.length
    ? `${line} L${coords.at(-1)?.x},${padTop + plotHeight} L${coords[0]?.x},${padTop + plotHeight} Z`
    : "";
  const labelIndexes = new Set([0, 7, 14, 21, Math.max(0, points.length - 1)]);
  const total = points.reduce((sum, point) => sum + point.value, 0);

  return (
    <div>
      <div className="relative mt-5 overflow-hidden rounded-xl">
        {total === 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
            <div className="rounded-xl border border-border bg-bg-elev-1/90 px-5 py-3 text-center shadow-[var(--shadow-sm)] backdrop-blur-md">
              <p className="text-sm font-semibold text-text-primary">Your trend starts here</p>
              <p className="mt-1 text-xs text-text-secondary">
                Add an expense to bring this chart to life.
              </p>
            </div>
          </div>
        )}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[230px] w-full"
          role="img"
          aria-label={`Daily spending trend. Total ${formatMoney(total, currency)}.`}
        >
          <title>Daily spending trend</title>
          <defs>
            <linearGradient id="spending-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-mint)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--brand-mint)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.33, 0.66, 1].map((ratio) => {
            const y = padTop + plotHeight * ratio;
            return (
              <line
                key={ratio}
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeDasharray="4 8"
              />
            );
          })}
          {area && <path d={area} fill="url(#spending-area)" />}
          {line && (
            <path
              d={line}
              fill="none"
              stroke="var(--brand-mint)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={total ? 1 : 0.35}
            />
          )}
          {coords.map((point, _index) =>
            point.value > 0 ? (
              <g key={point.key}>
                <circle cx={point.x} cy={point.y} r="8" fill="var(--bg-elev-1)" />
                <circle cx={point.x} cy={point.y} r="4" fill="var(--brand-mint)" />
              </g>
            ) : null,
          )}
          {coords.map((point, index) =>
            labelIndexes.has(index) ? (
              <text
                key={`${point.key}-label`}
                x={point.x}
                y={height - 10}
                textAnchor={index === 0 ? "start" : index === points.length - 1 ? "end" : "middle"}
                fill="var(--text-tertiary)"
                fontSize="12"
              >
                {point.label}
              </text>
            ) : null,
          )}
        </svg>
      </div>
      <table className="sr-only">
        <caption>Daily spending amounts</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.key}>
              <td>{point.key}</td>
              <td>{formatMoney(point.value, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MonthlyBars({ points, currency }: { points: TrendPoint[]; currency: string }) {
  const max = Math.max(...points.map((point) => point.value), 1);
  return (
    <div>
      <div className="mt-6 grid h-36 grid-cols-6 items-end gap-3" aria-hidden="true">
        {points.map((point, index) => (
          <div key={point.key} className="flex h-full flex-col justify-end gap-2">
            <div className="relative flex flex-1 items-end rounded-lg bg-bg-elev-2/70 p-1">
              <div
                className="w-full rounded-md bg-gradient-to-t from-accent/45 to-accent transition-[height] duration-300"
                style={{ height: `${Math.max(point.value ? 12 : 3, (point.value / max) * 100)}%` }}
              />
            </div>
            <span
              className={`text-center text-[11px] ${index === points.length - 1 ? "font-semibold text-accent" : "text-text-tertiary"}`}
            >
              {point.label}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">
        Six-month spending:{" "}
        {points.map((point) => `${point.label} ${formatMoney(point.value, currency)}`).join(", ")}.
      </p>
    </div>
  );
}

export function CategoryDonut({
  categories,
  total,
  currency,
}: {
  categories: CategoryBreakdown[];
  total: number;
  currency: string;
}) {
  let start = 0;
  const stops = categories.slice(0, 5).map((category) => {
    const end = start + category.percentage;
    const stop = `${categoryChartColor(category.color)} ${start}% ${end}%`;
    start = end;
    return stop;
  });
  if (start < 100) stops.push(`var(--bg-muted) ${start}% 100%`);

  return (
    <div className="mt-6 grid items-center gap-7 sm:grid-cols-[180px_1fr]">
      <div className="relative mx-auto size-44">
        <div
          className="size-full rounded-full p-[14px] shadow-[inset_0_0_0_1px_var(--border)]"
          style={{
            background: categories.length
              ? `conic-gradient(${stops.join(", ")})`
              : "conic-gradient(var(--bg-muted) 0% 100%)",
          }}
          role="img"
          aria-label={
            categories.length
              ? `Category breakdown for ${formatMoney(total, currency)} of spending.`
              : "No category spending data yet."
          }
        >
          <div className="grid size-full place-items-center rounded-full border border-border bg-bg-elev-1 text-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-text-tertiary">Total</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
                {formatMoney(total, currency, true)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {categories.length ? (
          categories.slice(0, 5).map((category) => (
            <div key={category.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span
                className="size-2.5 rounded-full"
                style={{ background: categoryChartColor(category.color) }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{category.name}</p>
                <p className="text-xs text-text-tertiary">
                  {category.count} {category.count === 1 ? "expense" : "expenses"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums text-text-primary">
                  {formatMoney(category.total, currency)}
                </p>
                <p className="text-xs tabular-nums text-text-tertiary">
                  {category.percentage.toFixed(0)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border-strong bg-bg-elev-2/40 p-5">
            <p className="text-sm font-semibold text-text-primary">Nothing to compare yet</p>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Categories will rank themselves as you add expenses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
