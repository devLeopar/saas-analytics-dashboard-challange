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
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import FeedbackControls from './feedback-controls'

interface WorkforceUtilizationChartProps {
  data: {
    name: string
    value: number
  }[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const WorkforceUtilizationChart = ({
  data,
}: WorkforceUtilizationChartProps) => {
  const tableId = useId()
  const figureLabel = 'Pie chart showing the workforce utilization per section.'

  return (
    <Card role="figure" aria-label={figureLabel} aria-describedby={tableId}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Workforce Utilization</CardTitle>
          <CardDescription>
            A pie chart showing the workforce utilization per section.
          </CardDescription>
        </div>
        <FeedbackControls />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="sr-only">
          <table id={tableId}>
            <caption>Workforce Utilization Data</caption>
            <thead>
              <tr>
                <th>Section</th>
                <th>Staff Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.name}>
                  <td>{entry.name}</td>
                  <td>{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(WorkforceUtilizationChart)
