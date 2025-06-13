import { create } from 'zustand'

type AuthStore = {
  isAuth: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  login: () => set({ isAuth: true }),
  logout: () => {
    document.cookie =
      'mock_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    set({ isAuth: false })
  },
}))
