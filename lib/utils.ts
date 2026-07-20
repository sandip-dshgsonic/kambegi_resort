import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "…";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export const ROOM_TYPE_LABELS: Record<string, string> = {
  villa: "Villa",
  suite: "Suite",
  cottage: "Cottage",
  tent: "Tent",
  glamping: "Glamping",
};

export const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  confirmed: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  cancelled: "text-red-500 bg-red-500/10 border-red-500/20",
  completed: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "no-show": "text-gray-500 bg-gray-500/10 border-gray-500/20",
  new: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  read: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  replied: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  archived: "text-gray-500 bg-gray-500/10 border-gray-500/20",
};
