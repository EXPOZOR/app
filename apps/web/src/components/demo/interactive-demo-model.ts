import {
  CarFront,
  Clapperboard,
  HeartPulse,
  type LucideIcon,
  ShoppingBag,
  Utensils,
  Zap,
} from "lucide-react";

export type CategoryId =
  | "food"
  | "transport"
  | "shopping"
  | "entertainment"
  | "health"
  | "utilities";

export interface CategoryItem {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  categoryId: CategoryId;
}

export const DEFAULT_CATEGORY: CategoryItem = {
  id: "food",
  label: "Food & Drink",
  icon: Utensils,
};

export const CATEGORIES: readonly CategoryItem[] = [
  DEFAULT_CATEGORY,
  { id: "transport", label: "Transport", icon: CarFront },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "entertainment", label: "Entertainment", icon: Clapperboard },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "utilities", label: "Utilities", icon: Zap },
];

export const SUGGESTIONS = ["Coffee Shop", "Taxi to Airport", "Streaming Service"] as const;
export const INITIAL_BUDGET = 800;
export const INITIAL_SPENT = 420;
export const MAX_EXPENSE = 1_000_000;
export const INITIAL_TRANSACTIONS: readonly Transaction[] = [
  { id: "1", name: "Streaming Service", amount: 9.99, categoryId: "entertainment" },
  { id: "2", name: "Grocery Store", amount: 67.4, categoryId: "food" },
  { id: "3", name: "Gas Station", amount: 54.2, categoryId: "transport" },
];

export function getCategory(categoryId: CategoryId) {
  return CATEGORIES.find((category) => category.id === categoryId) ?? DEFAULT_CATEGORY;
}

function includesAny(value: string, keywords: readonly string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

export function inferCategory(description: string): CategoryId {
  const value = description.toLowerCase();

  if (includesAny(value, ["coffee", "cafe", "restaurant", "grocery", "meal", "food", "bakery"]))
    return "food";
  if (includesAny(value, ["taxi", "ride", "gas", "fuel", "bus", "train", "airport"]))
    return "transport";
  if (includesAny(value, ["streaming", "netflix", "cinema", "movie", "game", "concert"]))
    return "entertainment";
  if (includesAny(value, ["gym", "health", "doctor", "pharma", "medicine"])) return "health";
  if (includesAny(value, ["electric", "water", "internet", "utility", "phone bill"]))
    return "utilities";
  if (includesAny(value, ["shop", "store", "market", "amazon", "retail", "clothing"]))
    return "shopping";
  return DEFAULT_CATEGORY.id;
}
