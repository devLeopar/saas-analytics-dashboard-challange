import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('mock_auth_token')?.value
  const { pathname } = request.nextUrl

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not authenticated and tries to access any page other than login, redirect to login
  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
