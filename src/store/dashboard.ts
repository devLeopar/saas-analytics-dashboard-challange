import { create } from 'zustand'

type DashboardStore = {
  timeframe: string
  setTimeframe: (timeframe: string) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  timeframe: 'Last 24 hours',
  setTimeframe: (timeframe: string) => set({ timeframe }),
}))
