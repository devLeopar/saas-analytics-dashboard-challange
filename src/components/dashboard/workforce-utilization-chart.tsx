'use client'

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workforce Utilization</CardTitle>
        <CardDescription>
          A pie chart showing the workforce utilization per section.
        </CardDescription>
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
      </CardContent>
    </Card>
  )
}

export default WorkforceUtilizationChart
