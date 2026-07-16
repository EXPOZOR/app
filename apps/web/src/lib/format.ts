export function formatMoney(amount: number, currency = "USD", compact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 2,
  }).format(amount);
}

export function formatExpenseDate(value: string, short = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: short ? "short" : "long",
    day: "numeric",
    year: short ? undefined : "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
