import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export type TimeSeriesDataPoint = {
  timeBucket: string
  value: number
}

type Person = {
  firstName: string
  lastName: string
}

type WorkForceUtilization = {
  total: number
  persons: Person[]
}

type SectionMetrics = {
  waitTimeSeconds: number
  workForceUtilization: WorkForceUtilization
}

export type SectionData = {
  locationName: string
  metrics: SectionMetrics
}

export type AnalyticsData = {
  activeUsers: TimeSeriesDataPoint[]
  sectionData: SectionData[]
}

const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    const res = await fetch('/api/analytics', {
      // Use cache: 'no-cache' to ensure fresh data when needed
      // The staleTime in useQuery will handle caching on the client side
      cache: 'default',
      next: { revalidate: 300 }, // 5 minutes
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch analytics data: ${res.status}`)
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    throw error
  }
}

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analyticsData'],
    queryFn: fetchAnalyticsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus for better performance
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  })
}
