import { test, expect } from '@playwright/test'

test.describe('Main User Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set the authentication cookie before each test
    await page.context().addCookies([
      {
        name: 'mock_auth_token',
        value: 'dummy-token-for-e2e-testing',
        url: 'http://localhost:3000',
      },
    ])
  })

  test('should allow a user to navigate and interact with the dashboard', async ({
    page,
  }) => {
    await page.goto('/')

    // Verify initial data is visible
    const dataTable = page.locator(
      '[role="figure"][aria-label="Data Table"] table',
    )
    await expect(dataTable).toBeVisible({ timeout: 10000 })

    // Filter by date
    await page.getByRole('combobox').click()
    await page.getByRole('option', { name: 'Last 7 days' }).click()
    await expect(page.getByRole('combobox')).toContainText('Last 7 days')

    // Change theme
    await page.getByRole('button', { name: 'Toggle theme' }).click()
    await page.getByRole('menuitem', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveClass('dark')

    // Toggle sidebar
    const sidebar = page.getByRole('complementary')
    await expect(sidebar).toHaveCSS('width', '280px')
    await page.getByRole('button', { name: 'Collapse sidebar' }).click()
    await expect(sidebar).toHaveCSS('width', '80px')

    // Submit feedback and check for toast notification
    const feedbackButton = page
      .locator('[role="figure"][aria-label="Data Table"]')
      .locator('button[aria-label="Send positive feedback"]')

    await feedbackButton.click()
    await expect(page.getByText('Positive feedback received.')).toBeVisible()
  })
})
