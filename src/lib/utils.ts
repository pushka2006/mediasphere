import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  if (currency === "INR") {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString("en-IN");
}

export function formatDate(date: Date | string, format = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (format === "short") {
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  if (format === "long") {
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  if (format === "time") {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (format === "datetime") {
    return `${formatDate(d, "short")} ${formatDate(d, "time")}`;
  }
  if (format === "relative") {
    return getRelativeTime(d);
  }
  return d.toLocaleDateString("en-IN");
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    ACTIVE: "badge-active",
    active: "badge-active",
    COMPLETED: "badge-completed",
    completed: "badge-completed",
    PENDING: "badge-pending",
    pending: "badge-pending",
    PENDING_APPROVAL: "badge-pending",
    DRAFT: "badge-draft",
    draft: "badge-draft",
    CANCELLED: "badge-cancelled",
    cancelled: "badge-cancelled",
    ON_HOLD: "badge-pending",
    on_hold: "badge-pending",
    APPROVED: "badge-active",
    CONFIRMED: "badge-active",
    OVERDUE: "badge-cancelled",
    SENT: "badge-brand",
    PAID: "badge-active",
  };
  return statusColors[status] || "badge-draft";
}

export function getStatusLabel(status: string): string {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getRoiColor(roi: number): string {
  if (roi >= 200) return "#10b981";
  if (roi >= 100) return "#22d3ee";
  if (roi >= 50) return "#f59e0b";
  return "#ef4444";
}

export function getProgressColor(percent: number): string {
  if (percent >= 80) return "#ef4444";
  if (percent >= 60) return "#f59e0b";
  return "#6366f1";
}

export function downloadFile(data: Blob, filename: string): void {
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const COLORS = {
  brand: "#6366f1",
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#06b6d4",
  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#3b82f6",
  slate: "#64748b",
};

export const CHART_COLORS = [
  "#6366f1",
  "#a855f7",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#ef4444",
  "#3b82f6",
];

export const INDIA_CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Chandigarh",
  "Coimbatore",
  "Kochi",
  "Guwahati",
];
