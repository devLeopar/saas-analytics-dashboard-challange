'use client'

import React, { useId } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import FeedbackControls from './feedback-controls'

interface WaitingDurationChartProps {
  data: {
    location: string
    averageWaitTime: number
  }[]
}

const WaitingDurationChart = ({ data }: WaitingDurationChartProps) => {
  const tableId = useId()
  const figureLabel =
    'Bar chart showing the average waiting time in seconds per location.'

  return (
    <Card role="figure" aria-label={figureLabel} aria-describedby={tableId}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Average Wait Time by Location</CardTitle>
          <CardDescription>
            A bar chart showing the average waiting time in seconds per
            location.
          </CardDescription>
        </div>
        <FeedbackControls />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="location"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}s`}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="averageWaitTime"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="sr-only">
          <table id={tableId}>
            <caption>Average Wait Time Data</caption>
            <thead>
              <tr>
                <th>Location</th>
                <th>Average Wait Time (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.location}>
                  <td>{entry.location}</td>
                  <td>{entry.averageWaitTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(WaitingDurationChart)
