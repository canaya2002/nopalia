'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  priceId: string
  features: string[]
  popular?: boolean
  trialDays?: number
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Premium Mensual',
    description: 'Acceso completo por un mes',
    price: 99, // $99 MXN
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'price_monthly',
    trialDays: 7,
    features: [
      'Acceso a todos los niveles (2-5)',
      'Minijuegos exclusivos premium',
      'Sin límite de jugadores',
      'Experiencias personalizadas',
      'Soporte prioritario',
      '7 días de prueba gratis'
    ]
  },
  {
    id: 'yearly',
    name: 'Premium Anual',
    description: 'Mejor valor - 2 meses gratis',
    price: 999, // $999 MXN (equivale a ~$83/mes)
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'price_yearly',
    popular: true,
    trialDays: 14,
    features: [
      'Acceso a todos los niveles (2-5)',
      'Minijuegos exclusivos premium',
      'Sin límite de jugadores',
      'Experiencias personalizadas',
      'Soporte prioritario',
      '14 días de prueba gratis',
      '2 meses gratis (ahorra 16%)',
      'Acceso anticipado a nuevas funciones'
    ]
  }
]

export default function PricingPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    // Verificar si hay token guardado
    const savedToken = localStorage.getItem('nopal_token')
    if (savedToken) {
      setToken(savedToken)
      verifyToken(savedToken)
    } else {
      // Si no hay token, redirigir a registro
      router.push('/register')
    }
  }, [router])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        // Token inválido, redirigir a login
        localStorage.removeItem('nopal_token')
        router.push('/login')
      }
    } catch (error) {
      console.error('Error verificando token:', error)
      router.push('/login')
    }
  }

  const handleSelectPlan = async (plan: Plan) => {
    if (!token || !user) {
      router.push('/login')
      return
    }

    setSelectedPlan(plan.id)
    setIsLoading(true)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          priceId: plan.priceId
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url
      } else {
        alert(data.error || 'Error al crear la sesión de pago')
        setSelectedPlan(null)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión. Intenta de nuevo.')
      setSelectedPlan(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    // Verificar si hay un nivel deseado guardado
    const nivelDeseado = localStorage.getItem('nopal_nivel_deseado')
    if (nivelDeseado) {
      router.push('/pedacopa/niveles')
    } else {
      router.back()
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 flex items-center justify-center">
        <div className="text-white text-xl font-bold">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-orange-400/50 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-lime-400/40 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>

      <div className="relative flex flex-col h-full w-full">
        {/* Header */}
        <header className={`pt-8 sm:pt-12 pb-6 text-center transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/10 via-white/10 to-emerald-400/10 blur-xl rounded-lg"></div>
              <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
                <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-xl">
                  Desbloquea NOPAL Premium
                </span>
              </h1>
            </div>
            <p className="text-emerald-200/90 text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Accede a todos los niveles y disfruta la experiencia completa de fiesta
            </p>
            
            {/* Usuario actual */}
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-white font-medium">¡Hola, {user.name}!</span>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            
            {/* Planes */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative group transform transition-all duration-700 hover:scale-[1.02] ${
                    plan.popular ? 'lg:scale-105' : ''
                  }`}
                  style={{animationDelay: `${0.5 + index * 0.2}s`}}
                >
                  {/* Badge popular */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                        MÁS POPULAR
                      </div>
                    </div>
                  )}

                  {/* Efectos de resplandor */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${
                    plan.popular 
                      ? 'from-yellow-400/20 via-orange-500/25 to-amber-400/20' 
                      : 'from-emerald-400/15 via-lime-500/20 to-green-400/15'
                  } rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  <div className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border ${
                    plan.popular ? 'border-yellow-400/50' : 'border-white/30'
                  } rounded-xl overflow-hidden group-hover:border-white/50 transition-all duration-500 shadow-2xl`}>
                    
                    {/* Header del plan */}
                    <div className={`relative p-6 sm:p-8 border-b border-white/20 bg-gradient-to-br ${
                      plan.popular 
                        ? 'from-yellow-500/20 to-orange-500/20' 
                        : 'from-emerald-500/20 to-lime-500/20'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      <div className="relative">
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-300 font-medium mb-4">
                          {plan.description}
                        </p>
                        
                        {/* Precio */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-4xl sm:text-5xl font-black text-white">
                            ${plan.price}
                          </span>
                          <span className="text-gray-400 font-medium">
                            MXN/{plan.id === 'yearly' ? 'año' : 'mes'}
                          </span>
                        </div>

                        {/* Ahorro para plan anual */}
                        {plan.id === 'yearly' && (
                          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1 mb-4">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span className="text-green-300 text-sm font-bold">Ahorra $200</span>
                          </div>
                        )}

                        {/* Trial */}
                        {plan.trialDays && (
                          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                              <span className="text-blue-300 font-bold text-sm">
                                {plan.trialDays} días gratis
                              </span>
                            </div>
                            <p className="text-blue-200/80 text-xs mt-1">
                              Cancela antes del {plan.trialDays === 7 ? '7º' : '14º'} día sin costo
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="space-y-3">
                        {plan.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                              plan.popular ? 'bg-yellow-400' : 'bg-emerald-400'
                            }`}>
                              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </div>
                            <span className="text-gray-200 text-sm leading-relaxed font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Botón */}
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        disabled={isLoading && selectedPlan !== plan.id}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                          plan.popular
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black'
                            : 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white'
                        } ${
                          isLoading && selectedPlan === plan.id 
                            ? 'opacity-75 cursor-not-allowed' 
                            : 'hover:scale-105 shadow-xl'
                        }`}
                      >
                        <span className="relative flex items-center justify-center gap-3">
                          {isLoading && selectedPlan === plan.id ? (
                            <>
                              <div className={`w-5 h-5 border-2 ${
                                plan.popular ? 'border-black/30 border-t-black' : 'border-white/30 border-t-white'
                              } rounded-full animate-spin`}></div>
                              <span>Procesando...</span>
                            </>
                          ) : (
                            <>
                              <span>Comenzar {plan.trialDays} días gratis</span>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </>
                          )}
                        </span>
                      </button>

                      {/* Nota de trial */}
                      <p className="text-center text-gray-400 text-xs leading-relaxed">
                        Inicia tu prueba gratuita ahora. Se te cobrará ${plan.price} MXN después de {plan.trialDays} días.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Información adicional */}
            <div className={`mt-12 text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.8s'}}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
                <h4 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z"/>
                  </svg>
                  <span>Garantía de satisfacción</span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Disfruta de tu periodo de prueba sin riesgo. Si no estás completamente satisfecho, 
                  cancela antes de que termine y no se te cobrará nada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 bg-black/20 backdrop-blur-sm border-t border-white/10 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '1s'}}>
          <div className="max-w-5xl mx-auto text-center">
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="group relative bg-black/40 hover:bg-black/60 text-white font-medium py-3 px-6 sm:px-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-lg shadow-xl"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base">
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Volver a niveles</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
      
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: fixed;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        
        .fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100vh;
          max-height: 100vh;
          background-attachment: fixed;
        }
        
        @supports (height: 100dvh) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
        }
        
        * {
          box-sizing: border-box;
          overscroll-behavior: contain;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}