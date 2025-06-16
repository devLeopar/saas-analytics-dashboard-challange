import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TimeframeOption =
  | 'Last 24 hours'
  | 'Last 7 days'
  | 'Last 30 days'
  | 'All time'

interface DashboardStore {
  timeframe: TimeframeOption
  setTimeframe: (timeframe: TimeframeOption) => void
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      timeframe: 'Last 30 days',
      setTimeframe: (timeframe: TimeframeOption) => set({ timeframe }),
    }),
    {
      name: 'dashboard-store',
      // Only store the timeframe in localStorage
      partialize: (state) => ({ timeframe: state.timeframe }),
    },
  ),
)
