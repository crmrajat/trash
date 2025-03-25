import { format, parseISO } from "date-fns"

// Format a date consistently across server and client
export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? parseISO(date) : date

  // Use explicit format strings instead of tokens like "PPP" that might vary by locale
  return format(dateObj, "yyyy-MM-dd")
}

// Format a date for display (with consistent locale)
export function formatDisplayDate(date: string | Date | undefined | null): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? parseISO(date) : date

  // Use explicit format strings that won't change based on locale
  return format(dateObj, "MMM dd, yyyy")
}

