'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import css from './SignInPage.module.css'
import { loginUser } from '@/lib/api/clientApi'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/lib/store/authStore'
import { User } from '@/types/user'

export default function SignInPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (email: string, password: string) => {
    setError('')
    try {
      const userData: User = await loginUser({ email, password })
      setUser(userData)
      router.push('/profile')
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || 'Login failed')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(email, password)
  }

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  )
}
