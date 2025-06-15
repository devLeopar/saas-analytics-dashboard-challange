import { useQuery } from '@tanstack/react-query'

type TimeSeriesDataPoint = {
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

type SectionData = {
  locationName: string
  metrics: SectionMetrics
}

export type AnalyticsData = {
  activeUsers: TimeSeriesDataPoint[]
  sectionData: SectionData[]
}

const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  const res = await fetch('/api/analytics')
  if (!res.ok) {
    throw new Error('Failed to fetch analytics data')
  }
  return res.json()
}

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analyticsData'],
    queryFn: fetchAnalyticsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
