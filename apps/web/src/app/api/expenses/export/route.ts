import { getCurrentUser } from "@/lib/auth";
import { getExpensesForExport } from "@/lib/dashboard";

export const runtime = "nodejs";

function escapeCsv(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const rows = await getExpensesForExport(user.id);
  const lines = [
    ["Date", "Merchant", "Description", "Category", "Amount"].join(","),
    ...rows.map((row) =>
      [row.date, row.merchant, row.description, row.category, row.amount].map(escapeCsv).join(","),
    ),
  ];

  return new Response(`\uFEFF${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="expozor-expenses-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
