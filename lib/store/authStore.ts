import { create } from 'zustand'
import { getMe, logoutUser } from '@/lib/api/clientApi'
import { User } from '@/types/user'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: async () => {
    await logoutUser() 
    set({ user: null, isAuthenticated: false })
  },

  loadUser: async () => {
    try {
      const user = await getMe()
      set({ user, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },
}))
