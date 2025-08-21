'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { usePremiumAccess } from '../hooks/usePremiumAccess'
import AuthModal from './AuthModal'
import CheckoutPage from './CheckoutPage'

interface LevelProtectionProps {
  level: number
  children: React.ReactNode
}

export default function LevelProtection({ level, children }: LevelProtectionProps) {
  const router = useRouter()
  const { loading } = useAuth()
  const { canAccessLevel, isAuthenticated, hasAccess } = usePremiumAccess()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [showCheckout, setShowCheckout] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (loading) return

    // Verificar acceso al nivel
    if (canAccessLevel(level)) {
      setIsChecking(false)
      return
    }

    // Si es nivel premium pero no está autenticado
    if (level >= 2 && !isAuthenticated) {
      setShowAuthModal(true)
      setIsChecking(false)
      return
    }

    // Si está autenticado pero no tiene acceso premium
    if (level >= 2 && isAuthenticated && !hasAccess) {
      setShowCheckout(true)
      setIsChecking(false)
      return
    }

    // Si no puede acceder por cualquier otra razón
    if (!canAccessLevel(level)) {
      router.push('/pedacopa/niveles')
      return
    }

    setIsChecking(false)
  }, [level, loading, canAccessLevel, isAuthenticated, hasAccess, router])

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // Verificar nuevamente el acceso después del login
    if (!canAccessLevel(level)) {
      setShowCheckout(true)
    }
  }

  const handleCheckoutSuccess = () => {
    setShowCheckout(false)
    // El nivel debería ser accesible ahora
  }

  const handleGoBack = () => {
    router.push('/pedacopa/niveles')
  }

  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!canAccessLevel(level)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-orange-900 flex items-center justify-center">
        <div className="max-w-md mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400/20 via-orange-500/30 to-red-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-red-900/60 via-orange-900/40 to-red-900/60 backdrop-blur-xl border border-red-400/30 rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-500/30 border-2 border-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h1>
              <p className="text-red-200 mb-6">
                Este nivel requiere acceso premium. Regresa a la selección de niveles para desbloquear.
              </p>
              <button
                onClick={handleGoBack}
                className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:from-red-400 hover:via-orange-400 hover:to-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Volver a Niveles
              </button>
            </div>
          </div>
        </div>

        {/* Modales */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />

        {showCheckout && (
          <CheckoutPage
            onClose={() => setShowCheckout(false)}
          />
        )}
      </div>
    )
  }

  // Si tiene acceso, renderizar el contenido del nivel
  return <>{children}</>
}