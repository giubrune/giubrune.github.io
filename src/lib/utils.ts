import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, style: "long" | "month" = "long") {
  return Intl.DateTimeFormat("en-GB", style === "month"
    ? { month: "long", year: "numeric" }
    : { day: "numeric", month: "long", year: "numeric" }).format(date)
}
