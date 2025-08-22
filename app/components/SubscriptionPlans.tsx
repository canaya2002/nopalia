'use client'

import { useSubscription } from '@/hooks/useSubscription'
import { useAuth } from '@/app/contexts/AuthContext'

const plans = [
  {
    id: 'monthly',
    name: 'Plan Mensual',
    price: 9.99,
    interval: 'mes',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'price_monthly',
    features: [
      'Acceso completo a todos los niveles',
      'Retos ilimitados',
      'Minijuegos exclusivos',
      'Soporte 24/7'
    ]
  },
  {
    id: 'yearly',
    name: 'Plan Anual',
    price: 99.99,
    interval: 'año',
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'price_yearly',
    features: [
      'Acceso completo a todos los niveles',
      'Retos ilimitados',
      'Minijuegos exclusivos',
      'Soporte 24/7',
      '2 meses gratis',
      'Contenido premium exclusivo'
    ],
    recommended: true
  }
]

export default function SubscriptionPlans() {
  const { createCheckoutSession, createBillingPortalSession, isLoading, error } = useSubscription()
  const { user, hasActiveSubscription } = useAuth()

  const handleSubscribe = async (priceId: string) => {
    await createCheckoutSession(priceId)
  }

  const handleManageBilling = async () => {
    await createBillingPortalSession()
  }

  if (hasActiveSubscription) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-4">
            Suscripción Activa
          </div>
          <h3 className="text-xl font-semibold mb-2">¡Tienes acceso premium!</h3>
          <p className="text-gray-600 mb-6">
            Disfruta de todos los niveles y características premium.
          </p>
          <button
            onClick={handleManageBilling}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Cargando...' : 'Gestionar Suscripción'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Elige tu Plan
        </h2>
        <p className="text-lg text-gray-600">
          Desbloquea todo el potencial de Nopal con nuestros planes premium
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-md p-6 relative ${
              plan.recommended ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recomendado
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-gray-900">
                ${plan.price}
                <span className="text-lg font-normal text-gray-600">/{plan.interval}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.priceId)}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                plan.recommended
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Procesando...' : 'Suscribirse'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}