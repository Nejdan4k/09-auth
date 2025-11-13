'use client'

import React, { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { getSession } from '@/lib/api/clientApi'

interface AuthProviderProps {
  children: ReactNode
  requireAuth?: boolean
}

export default function AuthProvider({ children, requireAuth = false }: AuthProviderProps) {
  const router = useRouter()
  const { setUser } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getSession()
        setUser(user)
      } catch {
        setUser(null)
        if (requireAuth) router.push('/sign-in')
      }
    }
    checkAuth()
  }, [requireAuth, router, setUser])

  return <>{children}</>
}
