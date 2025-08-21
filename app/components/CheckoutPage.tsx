'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface CheckoutPageProps {
  onClose: () => void
}

export default function CheckoutPage({ onClose }: CheckoutPageProps) {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async () => {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      // Crear sesión de checkout en Stripe
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('nopal_token')}`
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url
      } else {
        setError(data.error || 'Error al crear sesión de pago')
      }
    } catch (error) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl mx-4">
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-orange-500/30 to-red-400/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">
              Desbloquea Todos los Niveles
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Información del plan */}
          <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-400/50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">NOPAL Premium</h3>
              <div className="text-4xl font-black text-yellow-400 mb-2">$29 MXN</div>
              <p className="text-white/80">Pago único - Acceso de por vida</p>
            </div>
          </div>

          {/* Características incluidas */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xl font-bold text-white mb-4">¿Qué incluye?</h4>
            
            {[
              { 
                title: 'Nivel 2: Precopeo', 
                desc: 'Ya sonó la cumbia - Retos moderados y divertidos',
                color: 'from-yellow-400 to-orange-500'
              },
              { 
                title: 'Nivel 3: La Hora del Desmadre', 
                desc: 'Shots y decisiones malas - Diversión intensa',
                color: 'from-red-400 to-pink-600'
              },
              { 
                title: 'Nivel 4: El After Salvaje', 
                desc: '¿Quién trajo al ex? - Para los más atrevidos',
                color: 'from-purple-500 to-red-600'
              },
              { 
                title: 'Nivel 5: El Mictlán del Crudo', 
                desc: 'Lo que pasa en Nopal, se queda en Nopal',
                color: 'from-gray-600 to-black'
              }
            ].map((nivel, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 rounded-lg p-4 border border-white/20">
                <div className={`w-12 h-12 bg-gradient-to-r ${nivel.color} rounded-lg flex items-center justify-center text-white font-bold shadow-lg`}>
                  {index + 2}
                </div>
                <div>
                  <h5 className="text-white font-bold">{nivel.title}</h5>
                  <p className="text-white/70 text-sm">{nivel.desc}</p>
                </div>
                <div className="ml-auto">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Beneficios adicionales */}
          <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/20">
            <h5 className="text-white font-bold mb-3">Beneficios adicionales:</h5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                '🎮 Más de 80 retos únicos',
                '🔄 Retos aleatorios',
                '🎵 Minijuegos exclusivos',
                '🏆 Sistema de progreso',
                '👥 Hasta 12 jugadores',
                '🌟 Actualizaciones gratis'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-6">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Botones */}
          <div className="space-y-4">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 disabled:from-gray-500 disabled:to-gray-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-lg shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black animate-spin rounded-full"></div>
                  <span>Procesando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>🚀 Desbloquear Todos los Niveles</span>
                </div>
              )}
            </button>

            {/* Información de seguridad */}
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs">🔒</span>
              </div>
              <span>Pago seguro procesado por Stripe</span>
            </div>
          </div>

          {/* Garantía */}
          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="text-white/60 text-sm">
              💝 Garantía de satisfacción - Si no te diviertes, te devolvemos tu dinero
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}