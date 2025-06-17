import React, { Suspense } from 'react'
import { render, screen, waitFor, findByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './page'
import { AnalyticsData } from '@/hooks/useAnalyticsData'
import { useDashboardStore } from '@/store/dashboard'

// Mock child components to isolate the page logic
vi.mock('@/components/dashboard/active-users-chart', () => ({
  __esModule: true,
  default: vi.fn(({ data }) => (
    <div
      data-testid="active-users-chart"
      data-props={JSON.stringify(data)}
    ></div>
  )),
}))
vi.mock('@/components/dashboard/waiting-duration-chart', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="waiting-duration-chart"></div>),
}))
vi.mock('@/components/dashboard/workforce-utilization-chart', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="workforce-utilization-chart"></div>),
}))
vi.mock('@/components/dashboard/feedback-controls', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="feedback-controls"></div>),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock fetch
global.fetch = vi.fn()

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // Prevent refetching for tests
      },
    },
  })

const mockData: AnalyticsData = {
  activeUsers: [
    { timeBucket: '2024-07-20T12:00:00Z', value: 10 },
    { timeBucket: '2024-07-15T12:00:00Z', value: 20 },
    { timeBucket: '2024-06-25T12:00:00Z', value: 30 },
  ],
  sectionData: [
    {
      locationName: 'Lobby',
      metrics: {
        waitTimeSeconds: 150,
        workForceUtilization: { total: 5, persons: [] },
      },
    },
  ],
}

describe('Home Page (Dashboard)', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response)
    // Reset Zustand store before each test
    useDashboardStore.setState({ timeframe: 'All time' })
  })

  const renderHomePage = () => {
    return render(
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </Suspense>,
    )
  }

  it('should render the data table with initial data', async () => {
    renderHomePage()

    // Wait for the data to be loaded and table to be rendered
    expect(await screen.findByText('Lobby')).toBeInTheDocument()
    expect(screen.getByText(/150/i)).toBeInTheDocument() // waitTimeSeconds
  })

  it('should filter the active users chart when the timeframe is changed', async () => {
    const user = userEvent.setup()
    renderHomePage()

    // Wait for initial render
    const chart = await screen.findByTestId('active-users-chart')
    const timeSelector = screen.getByRole('combobox')

    // Initial state 'All time' - should have 3 data points
    let chartProps = JSON.parse(chart.getAttribute('data-props') || '[]')
    expect(chartProps.length).toBe(3)

    // Change timeframe to 'Last 7 days' from today (mocked latest date is 2024-07-20)
    await user.click(timeSelector)
    await user.click(await findByText(document.body, 'Last 7 days'))

    // Wait for the component to re-render with the new filter
    await waitFor(() => {
      chartProps = JSON.parse(chart.getAttribute('data-props') || '[]')
      // Only 2 data points should be visible (July 20 and July 15)
      expect(chartProps.length).toBe(2)
      expect(chartProps[0].value).toBe(10)
      expect(chartProps[1].value).toBe(20)
    })

    // Change timeframe to 'Last 24 hours'
    await user.click(timeSelector)
    await user.click(await findByText(document.body, 'Last 24 hours'))

    await waitFor(() => {
      chartProps = JSON.parse(chart.getAttribute('data-props') || '[]')
      // Only 1 data point should be visible (July 20)
      expect(chartProps.length).toBe(1)
      expect(chartProps[0].value).toBe(10)
    })
  })
})
