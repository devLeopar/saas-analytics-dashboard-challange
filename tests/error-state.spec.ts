import { test, expect } from '@playwright/test'

test.describe('Error State Handling', () => {
  test.beforeEach(async ({ page }) => {
    // Set the authentication cookie before each test to access the dashboard
    await page.context().addCookies([
      {
        name: 'mock_auth_token',
        value: 'dummy-token-for-e2e-testing',
        url: 'http://localhost:3000',
      },
    ])
  })

  // No beforeEach needed if we are just testing the UI response to a failed network request
  // The login state is not required to test this specific scenario if the API fails globally.

  test('should display an error message when the data fetch fails', async ({
    page,
  }) => {
    // Intercept the API call and force it to fail for this test
    await page.route('**/api/analytics', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      })
    })

    // Go to the page
    await page.goto('/')

    // Assert that the error message is visible
    await expect(page.getByText('Error loading data.')).toBeVisible({
      timeout: 10000,
    })
  })
})
