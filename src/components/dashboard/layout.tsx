'use client'

import Link from 'next/link'
import { CircleUser, Home, Menu, Package2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { FocusTrap } from 'focus-trap-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'
import { TimeframeSelector } from './timeframe-selector'
import { ThemeToggle } from '@/components/theme-toggle'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout } = useAuthStore()
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="relative min-h-screen w-full">
      <FocusTrap
        active={isMobileSidebarOpen}
        focusTrapOptions={{
          initialFocus: false,
          escapeDeactivates: true,
          onDeactivate: () => {
            setIsMobileSidebarOpen(false)
            mobileMenuButtonRef.current?.focus()
          },
        }}
      >
        <div
          className={cn(
            'fixed inset-0 z-40 md:hidden',
            !isMobileSidebarOpen && 'pointer-events-none',
          )}
          aria-hidden={!isMobileSidebarOpen}
        >
          <div
            className={cn(
              'absolute inset-0 bg-black/80 transition-opacity',
              isMobileSidebarOpen ? 'opacity-100' : 'opacity-0',
            )}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside
            className={cn(
              'bg-background absolute top-0 left-0 z-40 flex h-full w-[280px] flex-col border-r transition-transform duration-300 ease-in-out',
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-14 items-center justify-between border-b px-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <Package2 className="h-6 w-6" aria-hidden="true" />
                <span>SaaS Inc</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav
                className="grid items-start px-2 text-sm font-medium"
                aria-label="Main Navigation"
              >
                <Link
                  href="/"
                  className="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Home className="h-4 w-4" aria-hidden="true" />
                  <span>Dashboard</span>
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </FocusTrap>

      <aside
        className={cn(
          'bg-background fixed z-40 hidden h-full border-r transition-all duration-300 ease-in-out md:block',
          isSidebarCollapsed ? 'w-[80px]' : 'w-[280px]',
        )}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={cn(
              'flex h-14 items-center border-b',
              isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
            )}
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
              onClick={(e) => e.preventDefault()}
              aria-disabled="true"
              tabIndex={-1}
            >
              <Package2 className="h-6 w-6" aria-hidden="true" />
              <span
                className={cn(
                  'whitespace-nowrap transition-all duration-300 ease-in-out',
                  isSidebarCollapsed
                    ? 'w-0 overflow-hidden opacity-0'
                    : 'w-auto opacity-100',
                )}
              >
                SaaS Inc
              </span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto flex h-8 w-8"
              onClick={toggleSidebar}
              aria-label={
                isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              }
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav
              className="grid items-start px-2 text-sm font-medium"
              role="navigation"
              aria-label="Main Navigation"
            >
              <Link
                href="/"
                className="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span
                  className={cn(
                    'whitespace-nowrap transition-all duration-300 ease-in-out',
                    isSidebarCollapsed
                      ? 'w-0 overflow-hidden opacity-0'
                      : 'w-auto opacity-100',
                  )}
                >
                  Dashboard
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </aside>
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out md:pl-[280px]',
          isSidebarCollapsed ? 'md:pl-[80px]' : 'md:pl-[280px]',
        )}
      >
        <header
          className="bg-background flex h-14 items-center gap-4 border-b px-4"
          role="banner"
        >
          <Button
            ref={mobileMenuButtonRef}
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="w-full flex-1">
            {/* Can add a search form here if needed */}
          </div>
          <TimeframeSelector />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-label="Toggle user menu"
              >
                <CircleUser className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main
          className="flex flex-1 flex-col gap-4 p-4"
          role="main"
          tabIndex={-1}
          id="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
