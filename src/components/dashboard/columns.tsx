'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

// This type is based on the structure of the data from the useAnalyticsData hook
export type LocationData = {
  locationName: string
  metrics: {
    waitTimeSeconds: number
    workForceUtilization: {
      total: number
      persons: unknown[]
    }
  }
}

export const columns: ColumnDef<LocationData>[] = [
  {
    accessorKey: 'locationName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('locationName')}</div>,
  },
  {
    accessorKey: 'metrics.waitTimeSeconds',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Avg. Wait Time (sec)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const waitTime: number = row.original.metrics.waitTimeSeconds
      return <div className="text-center">{waitTime.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'metrics.workForceUtilization.persons.length',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Active Staff
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const activeStaff: number =
        row.original.metrics.workForceUtilization.persons.length
      return <div className="text-center">{activeStaff}</div>
    },
  },
  {
    accessorKey: 'metrics.workForceUtilization.total',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Served
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const totalServed = row.original.metrics.workForceUtilization.total
      return <div className="text-center">{totalServed}</div>
    },
  },
]
