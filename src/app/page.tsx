'use client'

import { useMemo } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { Loader2 } from 'lucide-react'
import ActiveUsersChart from '@/components/dashboard/active-users-chart'
import WaitingDurationChart from '@/components/dashboard/waiting-duration-chart'
import WorkforceUtilizationChart from '@/components/dashboard/workforce-utilization-chart'
import { useDashboardStore } from '@/store/dashboard'
import { columns } from '@/components/dashboard/columns'
import { DataTable } from '@/components/dashboard/data-table'

export default function Home() {
  const { timeframe } = useDashboardStore()
  const { data, isLoading, isError } = useAnalyticsData()

  const waitingDurationData = useMemo(() => {
    return (
      data?.sectionData.map((section) => ({
        location: section.locationName,
        averageWaitTime: section.metrics.waitTimeSeconds,
      })) ?? []
    )
  }, [data])

  const workforceUtilizationData = useMemo(() => {
    return (
      data?.sectionData.map((section) => ({
        name: section.locationName,
        value: section.metrics.workForceUtilization.persons.length,
      })) ?? []
    )
  }, [data])

  const filteredActiveUsers = useMemo(() => {
    if (!data || !data.activeUsers || data.activeUsers.length === 0) return []

    // To handle mock data in the future, we treat the latest data point as "now".
    const latestDate = new Date(
      Math.max(
        ...data.activeUsers.map((d) => new Date(d.timeBucket).getTime()),
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

    return data.activeUsers.filter((d) => {
      const date = new Date(d.timeBucket)
      return date >= startDate
    })
  }, [data, timeframe])

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
          {data && <ActiveUsersChart data={filteredActiveUsers} />}
        </div>
        {data && <WaitingDurationChart data={waitingDurationData} />}
        {data && <WorkforceUtilizationChart data={workforceUtilizationData} />}
      </div>
      <div className="mt-8">
        {data && data.sectionData && (
          <DataTable columns={columns} data={data.sectionData} />
        )}
      </div>
    </DashboardLayout>
  )
}
