'use client'

import React, { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { AnalyticsData } from '@/hooks/useAnalyticsData'
import FeedbackControls from './feedback-controls'
import { formatChartDate, formatTooltipDate } from '@/lib/date-utils'
import { useDashboardStore } from '@/store/dashboard'

interface ActiveUsersChartProps {
  data: AnalyticsData['activeUsers']
}

// Custom tooltip component for the chart
const CustomTooltip = React.memo(
  ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background rounded-md border p-2 shadow-sm">
          <p className="text-muted-foreground text-xs">
            {formatTooltipDate(label)}
          </p>
          <p className="font-medium">
            {payload[0].value} <span className="text-xs">active users</span>
          </p>
        </div>
      )
    }

    return null
  },
)

CustomTooltip.displayName = 'CustomTooltip'

const ActiveUsersChart = ({ data }: ActiveUsersChartProps) => {
  const { timeframe } = useDashboardStore()

  // Memoize the chart configuration to prevent unnecessary re-renders
  const chartConfig = useMemo(() => {
    return {
      gradient: (
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      ),
      xAxisConfig: {
        dataKey: 'timeBucket',
        tickFormatter: (value: string) => formatChartDate(value, timeframe),
        tick: { fontSize: 12 },
        minTickGap: 30,
      },
      yAxisConfig: {
        width: 30,
      },
      areaConfig: {
        type: 'monotone' as const,
        dataKey: 'value',
        stroke: '#8884d8',
        fillOpacity: 1,
        fill: 'url(#colorUv)',
        name: 'Active Users',
      },
    }
  }, [timeframe])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>
            A chart showing the number of active users over time.
          </CardDescription>
        </div>
        <FeedbackControls />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>{chartConfig.gradient}</defs>
            <XAxis
              dataKey={chartConfig.xAxisConfig.dataKey}
              tickFormatter={chartConfig.xAxisConfig.tickFormatter}
              tick={chartConfig.xAxisConfig.tick}
              minTickGap={chartConfig.xAxisConfig.minTickGap}
            />
            <YAxis width={chartConfig.yAxisConfig.width} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type={chartConfig.areaConfig.type}
              dataKey={chartConfig.areaConfig.dataKey}
              stroke={chartConfig.areaConfig.stroke}
              fillOpacity={chartConfig.areaConfig.fillOpacity}
              fill={chartConfig.areaConfig.fill}
              name={chartConfig.areaConfig.name}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default React.memo(ActiveUsersChart)
