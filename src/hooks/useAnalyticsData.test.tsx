import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAnalyticsData, AnalyticsData } from './useAnalyticsData'
import React from 'react'

// Mock fetch
global.fetch = vi.fn()

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Prevent retries for tests
      },
    },
  })

const mockData: AnalyticsData = {
  activeUsers: [{ timeBucket: new Date().toISOString(), value: 100 }],
  sectionData: [
    {
      locationName: 'Test Location',
      metrics: {
        waitTimeSeconds: 120,
        workForceUtilization: {
          total: 10,
          persons: [{ firstName: 'John', lastName: 'Doe' }],
        },
      },
    },
  ],
}

describe('useAnalyticsData', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.mocked(global.fetch).mockClear()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should return loading state initially and then data on successful fetch', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response)

    const { result } = renderHook(() => useAnalyticsData(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isFetching).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isFetching).toBe(false)
    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it('isLoading state should be true during fetch and false after', async () => {
    let resolveFetch: (value: Response) => void
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve
    })

    vi.mocked(global.fetch).mockReturnValue(fetchPromise)

    const { result } = renderHook(() => useAnalyticsData(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    // Initial state
    expect(result.current.isLoading).toBe(true)

    // Resolve the fetch and wait for state update
    resolveFetch!({
      ok: true,
      json: async () => mockData,
    } as Response)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isSuccess).toBe(true)
  })
})
