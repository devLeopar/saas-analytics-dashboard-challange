'use client'

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

interface WaitingDurationChartProps {
  data: {
    location: string
    averageWaitTime: number
  }[]
}

const WaitingDurationChart = ({ data }: WaitingDurationChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Wait Time by Location</CardTitle>
        <CardDescription>
          A bar chart showing the average waiting time in seconds per location.
        </CardDescription>
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
            <Tooltip />
            <Bar
              dataKey="averageWaitTime"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default WaitingDurationChart
