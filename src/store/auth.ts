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
    localStorage.removeItem('mock_auth_token')
    set({ isAuth: false })
  },
}))
