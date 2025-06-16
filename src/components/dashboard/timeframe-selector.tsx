'use client'

import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TimeframeOption, useDashboardStore } from '@/store/dashboard'

export const TimeframeSelector = React.memo(() => {
  const { timeframe, setTimeframe } = useDashboardStore()

  const handleValueChange = (value: TimeframeOption) => {
    setTimeframe(value)
  }

  return (
    <Select value={timeframe} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a timeframe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Timeframes</SelectLabel>
          <SelectItem value="Last 24 hours">Last 24 hours</SelectItem>
          <SelectItem value="Last 7 days">Last 7 days</SelectItem>
          <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          <SelectItem value="All time">All time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
})

TimeframeSelector.displayName = 'TimeframeSelector'
