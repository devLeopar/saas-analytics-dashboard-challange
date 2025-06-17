# SaaS Analytics Dashboard

A modern, responsive, and feature-rich analytics dashboard built with Next.js and the latest web technologies. This project serves as a demonstration of building a complex, production-quality front-end application.

## Overview

This project is a comprehensive SaaS analytics dashboard designed to showcase modern front-end development practices. It features a secure authentication flow, a responsive layout, interactive and filterable data visualizations, a detailed data table, and a themeable UI with light and dark modes. The application is built with a focus on code quality, performance, and accessibility, and it includes a full suite of unit, integration, and end-to-end tests.

## Key Features

- **Authentication**: Mock cookie-based authentication with protected routes.
- **Responsive Dashboard**: A fully responsive layout with a collapsible sidebar for all screen sizes.
- **Interactive Charts**: Data visualizations built with Recharts, including area, bar, and pie charts.
- **Data Filtering**: Client-side filtering of data by a selectable timeframe (e.g., Last 24 hours, 7 days, 30 days).
- **Data Table**: A sortable and paginated data table built with TanStack Table.
- **Dark Mode**: A beautiful, themeable UI with light/dark mode support, respecting user's system preference.
- **User Notifications**: Toast notifications for user feedback and application events using Sonner.
- **Performance Optimized**: Built with performance in mind, using techniques like code-splitting, lazy loading, and memoization.
- **Accessibility (a11y)**: Enhanced for accessibility with semantic HTML, ARIA attributes, and focus management.
- **Comprehensive Testing**: Includes unit & integration tests with Vitest and end-to-end tests with Playwright.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Charting**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Data Table**: [TanStack Table (React Table)](https://tanstack.com/table/v8)
- **Unit & Integration Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End Testing**: [Playwright](https://playwright.dev/)
- **Linting & Formatting**: ESLint & Prettier

## Getting Started

Follow these instructions to get the project set up and running on your local machine.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/devLeopar/saas-analytics-dashboard-challange.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd saas-analytics-dashboard-challange
    ```
3.  Install the project dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

> **Note:** The application uses a mock authentication system. You can use any email and password to log in.

For example:
Email: test@test.com
Password: 123123

## Project Structure

Here is a brief overview of the key directories in the project:

- `src/app/`: Contains the core application routes, including the main dashboard page (`page.tsx`) and the login page (`login/page.tsx`).
- `src/components/`: Contains all the React components, organized into subdirectories for UI elements (`ui/`) and dashboard-specific components (`dashboard/`).
- `src/hooks/`: Home to custom React hooks, such as `useAnalyticsData.ts` for data fetching.
- `src/store/`: Contains Zustand state management stores (`auth.ts`, `dashboard.ts`).
- `src/lib/`: Includes utility functions, such as `utils.ts` from Shadcn and custom date formatting helpers in `date-utils.ts`.
- `src/api/`: Contains API route handlers.
- `tests/`: Contains the end-to-end tests written with Playwright.
- `*.test.tsx`: Unit and integration tests are co-located with the files they are testing.

## Testing

This project includes a comprehensive suite of tests to ensure code quality and stability.

### Unit & Integration Tests

To run the unit and integration tests with Vitest, use the following command:

```bash
npm test
```

### End-to-End Tests

The E2E tests are written with Playwright and simulate real user flows. To run them, use the following command:

```bash
npm run test:e2e
```

This will start the development server and run the Playwright tests in a headless browser.
