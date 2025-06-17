import { AuthHydration } from '@/components/auth-hydration'
import QueryProvider from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SaaS Analytics Dashboard',
  description: 'SaaS Analytics Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider>
          <QueryProvider>
            <AuthHydration />
            {children}
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
