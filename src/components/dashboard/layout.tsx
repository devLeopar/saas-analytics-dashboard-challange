'use client'

import Link from 'next/link'
import { CircleUser, Home, Menu, Package2 } from 'lucide-react'

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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout } = useAuthStore()
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="relative min-h-screen w-full">
      <div
        className={cn(
          'bg-background fixed z-40 h-full border-r transition-all duration-300 ease-in-out md:translate-x-0',
          isSidebarCollapsed ? 'w-[80px]' : 'w-[280px]',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={cn(
              'flex h-14 items-center border-b lg:h-[60px]',
              isSidebarCollapsed ? 'justify-center px-2' : 'px-4 lg:px-6',
            )}
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
              onClick={(e) => e.preventDefault()}
            >
              <Package2 className="h-6 w-6" />
              {!isSidebarCollapsed && <span>SaaS Inc</span>}
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(false)
                } else {
                  toggleSidebar()
                }
              }}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Home className="h-4 w-4" />
                {!isSidebarCollapsed && 'Dashboard'}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out',
          isSidebarCollapsed ? 'md:pl-[80px]' : 'md:pl-[280px]',
        )}
      >
        <header className="bg-background flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="w-full flex-1">
            {/* Can add a search form here if needed */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  )
}
