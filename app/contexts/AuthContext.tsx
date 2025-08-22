'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  hasActiveSub: boolean
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  subscriptionStatus: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
  subscriptionPlanId: string | null
  subscriptionCurrentPeriodEnd: number | null
  trialEndsAt: number | null
  createdAt: string
  updatedAt: string
  hasActiveSubscription?: boolean
  isInTrial?: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isAuthenticated: boolean
  hasActiveSubscription: boolean
  isInTrial: boolean
  canAccessPremiumFeatures: boolean
  verifySession: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('auth_token')
      
      if (storedToken) {
        const isValid = await verifyStoredToken(storedToken)
        if (!isValid) {
          clearAuth()
        }
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Error inicializando autenticación:', error)
      clearAuth()
    }
  }

  const verifyStoredToken = async (tokenToVerify: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToVerify}`
        },
        body: JSON.stringify({ token: tokenToVerify })
      })

      const data = await response.json()

      if (data.success && data.isValid) {
        setToken(tokenToVerify)
        setUser(data.user)
        setLoading(false)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error verificando token:', error)
      return false
    }
  }

  const verifySession = async (): Promise<boolean> => {
    if (!token) return false
    return await verifyStoredToken(token)
  }

  const login = (newToken: string, newUser: User) => {
    try {
      localStorage.setItem('auth_token', newToken)
      setToken(newToken)
      setUser(newUser)
    } catch (error) {
      console.error('Error guardando datos de autenticación:', error)
    }
  }

  const logout = async () => {
    try {
      // Invalidar sesión en el servidor
      if (token) {
        await fetch('/api/auth/verify', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Error durante logout en servidor:', error)
    } finally {
      clearAuth()
    }
  }

  const clearAuth = () => {
    try {
      localStorage.removeItem('auth_token')
      setToken(null)
      setUser(null)
      setLoading(false)
    } catch (error) {
      console.error('Error limpiando autenticación:', error)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
    }
  }

  // Estados computados
  const isAuthenticated = Boolean(token && user)
  const hasActiveSubscription = user?.hasActiveSubscription || false
  const isInTrial = user?.isInTrial || false
  const canAccessPremiumFeatures = hasActiveSubscription || isInTrial

  const contextValue: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated,
    hasActiveSubscription,
    isInTrial,
    canAccessPremiumFeatures,
    verifySession
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}