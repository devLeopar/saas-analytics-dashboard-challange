'use client'

import { useEffect, useMemo, useRef, lazy, Suspense } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { TimeSeriesDataPoint, SectionData } from '@/hooks/useAnalyticsData'
import { columns } from '@/components/dashboard/columns'
import { DataTable } from '@/components/dashboard/data-table'
import { DashboardLayout } from '@/components/dashboard/layout'
import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { useDashboardStore } from '@/store/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartSkeleton } from '@/components/dashboard/chart-skeleton'

// Dynamically import chart components to reduce initial bundle size
const ActiveUsersChart = lazy(
  () => import('@/components/dashboard/active-users-chart'),
)
const WaitingDurationChart = lazy(
  () => import('@/components/dashboard/waiting-duration-chart'),
)
const WorkforceUtilizationChart = lazy(
  () => import('@/components/dashboard/workforce-utilization-chart'),
)
const FeedbackControls = lazy(
  () => import('@/components/dashboard/feedback-controls'),
)

export default function Home() {
  const { timeframe } = useDashboardStore()
  const { data, isLoading, isError } = useAnalyticsData()
  const isInitialRender = useRef(true)
  const toastShownRef = useRef(false)

  // useRef to prevent toast on initial render, but show on subsequent data refetches
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (data && !toastShownRef.current) {
      toast('Dashboard data has been updated.')
      // Set a timeout to reset the toast flag after 5 seconds
      // This prevents multiple toasts when data updates frequently
      toastShownRef.current = true
      setTimeout(() => {
        toastShownRef.current = false
      }, 5000)
    }
  }, [data])

  // Memoize data transformations to prevent unnecessary recalculations
  const waitingDurationData = useMemo(() => {
    if (!data?.sectionData) return []

    return data.sectionData.map((section: SectionData) => ({
      location: section.locationName,
      averageWaitTime: section.metrics.waitTimeSeconds,
    }))
  }, [data?.sectionData])

  const workforceUtilizationData = useMemo(() => {
    if (!data?.sectionData) return []

    return data.sectionData.map((section: SectionData) => ({
      name: section.locationName,
      value: section.metrics.workForceUtilization.persons.length,
    }))
  }, [data?.sectionData])

  const filteredActiveUsers = useMemo(() => {
    if (!data?.activeUsers || data.activeUsers.length === 0) return []

    // To handle mock data in the future, we treat the latest data point as "now".
    const latestDate = new Date(
      Math.max(
        ...data.activeUsers.map((d: TimeSeriesDataPoint) =>
          new Date(d.timeBucket).getTime(),
        ),
      ),
    )

    let startDate: Date

    switch (timeframe) {
      case 'Last 24 hours':
        startDate = new Date(latestDate)
        startDate.setHours(startDate.getHours() - 24)
        break
      case 'Last 7 days':
        startDate = new Date(latestDate)
        startDate.setDate(startDate.getDate() - 6) // Include the latest day in the 7-day period
        break
      case 'Last 30 days':
        startDate = new Date(latestDate)
        startDate.setDate(startDate.getDate() - 29) // Include the latest day in the 30-day period
        break
      default: // 'All time'
        return data.activeUsers
    }

    // Set start date to the beginning of the day for an inclusive filter
    startDate.setHours(0, 0, 0, 0)

    return data.activeUsers.filter((d: TimeSeriesDataPoint) => {
      const date = new Date(d.timeBucket)
      return date >= startDate
    })
  }, [data?.activeUsers, timeframe])

  // Memoize the table data to prevent unnecessary re-renders
  const tableData = useMemo(() => data?.sectionData || [], [data?.sectionData])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error loading data.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          {data && (
            <Suspense fallback={<ChartSkeleton />}>
              <ActiveUsersChart data={filteredActiveUsers} />
            </Suspense>
          )}
        </div>
        {data && (
          <Suspense fallback={<ChartSkeleton />}>
            <WaitingDurationChart data={waitingDurationData} />
          </Suspense>
        )}
        {data && (
          <Suspense fallback={<ChartSkeleton />}>
            <WorkforceUtilizationChart data={workforceUtilizationData} />
          </Suspense>
        )}
      </div>
      <div className="mt-8">
        {data && tableData.length > 0 && (
          <Card
            role="figure"
            aria-label="Data Table"
            aria-describedby="data-table-caption"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Data Table</CardTitle>
              <Suspense
                fallback={
                  <div className="bg-muted h-8 w-20 animate-pulse rounded-md" />
                }
              >
                <FeedbackControls />
              </Suspense>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={tableData}
                captionId="data-table-caption"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
