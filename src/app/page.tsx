'use client'

import { useMemo } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { Loader2 } from 'lucide-react'
import ActiveUsersChart from '@/components/dashboard/active-users-chart'
import WaitingDurationChart from '@/components/dashboard/waiting-duration-chart'
import WorkforceUtilizationChart from '@/components/dashboard/workforce-utilization-chart'

export default function Home() {
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          {data && <ActiveUsersChart data={data.activeUsers} />}
        </div>
        {data && <WaitingDurationChart data={waitingDurationData} />}
        {data && <WorkforceUtilizationChart data={workforceUtilizationData} />}
      </div>
    </DashboardLayout>
  )
}
