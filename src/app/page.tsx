'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { useAnalyticsData } from '@/hooks/useAnalyticsData'
import { Loader2 } from 'lucide-react'
import ActiveUsersChart from '@/components/dashboard/active-users-chart'

export default function Home() {
  const { data, isLoading, isError } = useAnalyticsData()

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
      <div className="flex flex-1 flex-col gap-4">
        {data && <ActiveUsersChart data={data.activeUsers} />}
      </div>
    </DashboardLayout>
  )
}
