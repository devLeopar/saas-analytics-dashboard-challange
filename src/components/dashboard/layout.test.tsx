import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DashboardLayout } from './layout'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock focus-trap-react
vi.mock('focus-trap-react', () => ({
  FocusTrap: ({
    children,
    active,
  }: {
    children: React.ReactNode
    active: boolean
  }) => (
    <div data-testid="focus-trap" data-active={active}>
      {children}
    </div>
  ),
}))

describe('DashboardLayout', () => {
  it('should toggle the desktop sidebar when the menu button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>,
    )

    // Find the button by its accessible name (aria-label)
    const toggleButton = screen.getByRole('button', {
      name: /collapse sidebar/i,
    })

    // Initial state: sidebar is open (not collapsed)
    expect(
      screen.getByRole('button', { name: /collapse sidebar/i }),
    ).toBeInTheDocument()

    // Click to collapse the sidebar
    await user.click(toggleButton)

    // Assert that the button's label has changed, indicating the sidebar is collapsed
    expect(
      await screen.findByRole('button', { name: /expand sidebar/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /collapse sidebar/i }),
    ).not.toBeInTheDocument()

    // Click again to expand the sidebar
    const expandButton = screen.getByRole('button', { name: /expand sidebar/i })
    await user.click(expandButton)

    // Assert that the button's label has changed back
    expect(
      await screen.findByRole('button', { name: /collapse sidebar/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /expand sidebar/i }),
    ).not.toBeInTheDocument()
  })

  it('should open and close the mobile sidebar', async () => {
    const user = userEvent.setup()
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>,
    )

    // Find mobile menu button
    const mobileMenuButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    })
    await user.click(mobileMenuButton)

    // Assert mobile sidebar is open (dialog role is present)
    const mobileSidebar = await screen.findByRole('dialog', {
      name: /mobile navigation/i,
    })
    expect(mobileSidebar).toBeInTheDocument()
    expect(screen.getByTestId('focus-trap')).toHaveAttribute(
      'data-active',
      'true',
    )

    // Find and click the close button within the mobile sidebar
    const closeButton = screen.getByRole('button', {
      name: /close navigation menu/i,
    })
    await user.click(closeButton)

    // Assert mobile sidebar is closed
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /mobile navigation/i }),
      ).not.toBeInTheDocument()
    })
    expect(screen.getByTestId('focus-trap')).toHaveAttribute(
      'data-active',
      'false',
    )
  })
})
