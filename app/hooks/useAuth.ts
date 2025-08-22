import { useAuth as useAuthContext } from '@/app/contexts/AuthContext'
import { useState } from 'react'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export function useAuth() {
  const context = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (data.success) {
        context.login(data.token, data.user)
        return { success: true, user: data.user }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMessage = 'Error de conexión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (data.success) {
        context.login(data.token, data.user)
        return { success: true, user: data.user }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMessage = 'Error de conexión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await context.logout()
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    ...context,
    login,
    register,
    logout,
    isLoading,
    error,
    clearError,
  }
}