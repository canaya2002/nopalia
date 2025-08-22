import { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
}

export function useSubscription() {
  const { user, token, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCheckoutSession = async (priceId: string) => {
    if (!user || !token) {
      throw new Error('Usuario no autenticado')
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (data.success) {
        // Redireccionar a Stripe Checkout
        window.location.href = data.url
        return { success: true, url: data.url }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMessage = 'Error creando sesión de pago'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const createBillingPortalSession = async () => {
    if (!user || !token) {
      throw new Error('Usuario no autenticado')
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        window.location.href = data.url
        return { success: true, url: data.url }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMessage = 'Error creando portal de facturación'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSubscriptionStatus = async () => {
    if (!user || !token) return

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        updateUser(data.user)
      }
    } catch (error) {
      console.error('Error refrescando estado de suscripción:', error)
    }
  }

  const clearError = () => setError(null)

  return {
    createCheckoutSession,
    createBillingPortalSession,
    refreshSubscriptionStatus,
    isLoading,
    error,
    clearError,
  }
}