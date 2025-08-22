'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTryAgain = () => {
    router.push('/pricing')
  }

  const handleBackToLevels = () => {
    router.push('/pedacopa/niveles')
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>

      <div className="relative flex flex-col h-full w-full items-center justify-center text-center px-4">
        
        {/* Icono de cancelación */}
        <div className={`transform transition-all duration-1500 ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <div className="absolute -inset-4 bg-gray-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Contenido */}
        <div className={`max-w-2xl transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.3s'}}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent drop-shadow-xl">
              Pago Cancelado
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg sm:text-xl font-medium mb-8 leading-relaxed">
            No se ha procesado ningún pago. Puedes intentar de nuevo cuando estés listo o seguir disfrutando del nivel gratuito.
          </p>

          {/* Recordatorio del nivel gratuito */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-emerald-300 font-bold text-lg mb-3">Recuerda:</h3>
            <p className="text-gray-200 leading-relaxed">
              Siempre puedes disfrutar del <span className="text-emerald-400 font-bold">Nivel 1 "Casa Tranquila"</span> completamente gratis. 
              Los niveles premium estarán disponibles cuando decidas suscribirte.
            </p>
          </div>

          {/* Botones */}
          <div className="space-y-4">
            <button
              onClick={handleTryAgain}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Intentar de Nuevo
            </button>
            
            <button
              onClick={handleBackToLevels}
              className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Volver a Niveles
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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