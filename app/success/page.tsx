'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Limpiar el nivel deseado ya que ahora tiene acceso premium
    localStorage.removeItem('nopal_nivel_deseado')
    
    // Redirigir automáticamente después de 5 segundos
    const timer = setTimeout(() => {
      router.push('/pedacopa/niveles')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const handleContinue = () => {
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
        
        {/* Icono de éxito */}
        <div className={`transform transition-all duration-1500 ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div className="absolute -inset-4 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Contenido */}
        <div className={`max-w-2xl transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.3s'}}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-xl">
              ¡Suscripción Activada!
            </span>
          </h1>
          
          <p className="text-emerald-200/90 text-lg sm:text-xl font-medium mb-8 leading-relaxed">
            Tu cuenta premium ha sido activada exitosamente. Ahora tienes acceso completo a todos los niveles de NOPAL.
          </p>

          {/* Beneficios desbloqueados */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-yellow-300 font-bold text-lg mb-4">Desbloqueaste:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                'Niveles 2-5 disponibles',
                'Minijuegos exclusivos',
                'Experiencias personalizadas',
                'Soporte prioritario'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Continuar a Niveles Premium
            </button>
            
            <p className="text-gray-400 text-sm">
              Serás redirigido automáticamente en 5 segundos...
            </p>
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