import { format, isToday, isYesterday, parseISO } from 'date-fns'

/**
 * Formats a date string based on the current timeframe selection
 * @param dateString ISO date string to format
 * @param timeframe Current timeframe selection
 * @returns Formatted date string
 */
export function formatChartDate(
  dateString: string,
  timeframe?: string,
): string {
  const date = parseISO(dateString)

  // For "Last 24 hours" timeframe, show time in 12-hour format
  if (timeframe === 'Last 24 hours') {
    if (isToday(date)) {
      return format(date, 'h:mm a') // e.g. "3:30 PM"
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'h:mm a')}` // e.g. "Yesterday, 3:30 PM"
    }
    return format(date, 'MMM d, h:mm a') // e.g. "Jan 4, 3:30 PM"
  }

  // For "Last 7 days" timeframe, show day of week and date
  if (timeframe === 'Last 7 days') {
    return format(date, 'EEE, MMM d') // e.g. "Mon, Jan 4"
  }

  // For "Last 30 days" or "All time", show month and day
  if (timeframe === 'Last 30 days') {
    return format(date, 'MMM d') // e.g. "Jan 4"
  }

  // Default format for "All time" or any other timeframe
  return format(date, 'MMM d, yyyy') // e.g. "Jan 4, 2025"
}

/**
 * Formats a date for tooltip display with more detailed information
 * @param dateString ISO date string to format
 * @returns Formatted date string for tooltip
 */
export function formatTooltipDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'PPp') // e.g. "Jan 4, 2025, 3:30 PM"
}
