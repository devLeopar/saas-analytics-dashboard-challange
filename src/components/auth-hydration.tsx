'use client'

import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'

// This is a simplified way to check for a cookie on the client side.
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function AuthHydration() {
  const { login, isAuth } = useAuthStore()

  useEffect(() => {
    // Only run this check if the user is not already marked as authenticated.
    if (!isAuth) {
      const authToken = getCookie('mock_auth_token')
      if (authToken) {
        login()
      }
    }
  }, [isAuth, login])

  return null // This component renders nothing.
}
