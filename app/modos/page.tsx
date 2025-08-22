'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ModosPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleModoPedacopa = () => {
    router.push('/pedacopa/jugadores') // Enlace corregido
  }

  const handleModoNopalAI = () => {
    alert('Nopal.AI - ¡Próximamente disponible!')
  }

  const handleModoVerdadReto = () => {
    router.push('/pedacopa/jugador')
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
      
      {/* Fondo mejorado con más elementos sutiles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-orange-400/50 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-lime-400/40 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-emerald-400/20 to-transparent"></div>
      </div>

      {/* Gradientes de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20"></div>

      {/* Contenedor principal con flex */}
      <div className="relative flex flex-col h-full w-full">
        {/* Header ajustado */}
        <header className={`relative pt-8 sm:pt-10 md:pt-12 pb-4 md:pb-6 text-center transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative inline-block mb-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/10 via-white/10 to-emerald-400/10 blur-xl rounded-lg"></div>
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-xl">
                  Elige tu Modo de Juego
                </span>
              </h1>
            </div>
          </div>
        </header>

        {/* Contenedor principal para tarjetas y botón */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-8 overflow-visible">
          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
            
            {/* MODO 1: LA PEDACOPA */}
            <div 
              className={`group relative cursor-pointer transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:scale-100 hover:-translate-y-1 z-10`}
              style={{animationDelay: '0.3s'}}
              onClick={handleModoPedacopa}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/25 to-amber-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 via-orange-500/15 to-amber-400/10 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-yellow-900/30 via-orange-900/25 to-amber-900/30 backdrop-blur-xl border border-yellow-400/30 rounded-xl overflow-hidden group-hover:border-yellow-400/50 transition-all duration-500 shadow-2xl">
                <div className="relative p-5 sm:p-7 border-b border-yellow-400/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-7 h-7 bg-white rounded-lg transform rotate-45 shadow-inner"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/40 rounded-full text-yellow-200 text-xs font-bold">
                            DISPONIBLE
                          </span>
                          <span className="px-2 py-1 bg-green-400/20 border border-green-400/40 rounded-full text-green-200 text-xs font-bold">
                            POPULAR
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black">
                          <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
                            LA PEDACOPA
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="relative text-yellow-300/90 font-semibold text-lg sm:text-xl">
                    Modo fiesta progresivo
                  </p>
                </div>
                
                <div className="p-5 sm:p-7 space-y-6">
                  <div className="bg-gradient-to-r from-black/20 to-orange-900/20 rounded-lg p-4 sm:p-5 border border-orange-400/20">
                    <h4 className="text-orange-200 font-bold mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 bg-orange-400/30 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      </div>
                      ¿Cómo funciona?
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Inspirado en <span className="text-yellow-300 font-bold">"Peda" + "Copa del desmadre"</span>. 
                      Comienza con retos ligeros y escala progresivamente hasta llegar al nivel máximo de diversión. 
                      Cada nivel aumenta la intensidad y la emoción.
                    </p>
                  </div>
                  <button className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 hover:from-yellow-400 hover:via-orange-400 hover:to-amber-400 text-black font-bold py-4 sm:py-5 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 group-hover:scale-[1.02] text-base sm:text-lg">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>COMENZAR</span>
                      <div className="w-5 h-5 bg-black/20 rounded flex items-center justify-center">
                        <span className="text-xs">→</span>
                      </div>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* MODO 2: NOPAL.AI */}
            <div 
              className={`group relative cursor-pointer transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:scale-100 hover:-translate-y-1 opacity-90 hover:opacity-100 z-10`}
              style={{animationDelay: '0.5s'}}
              onClick={handleModoNopalAI}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/15 via-lime-500/20 to-cyan-400/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/8 via-lime-500/12 to-cyan-400/8 rounded-xl blur-md opacity-40 group-hover:opacity-100 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-emerald-900/30 via-lime-900/25 to-cyan-900/30 backdrop-blur-xl border border-emerald-400/30 rounded-xl overflow-hidden group-hover:border-emerald-400/50 transition-all duration-500 shadow-2xl">
                <div className="relative p-5 sm:p-7 border-b border-emerald-400/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-lime-500/5"></div>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-lime-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-7 h-7 grid grid-cols-2 gap-0.5">
                          <div className="bg-white rounded-sm"></div>
                          <div className="bg-white/80 rounded-sm"></div>
                          <div className="bg-white/60 rounded-sm"></div>
                          <div className="bg-white rounded-sm"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-lime-400/20 border border-lime-400/40 rounded-full text-lime-200 text-xs font-bold">
                            PRÓXIMAMENTE
                          </span>
                          <span className="px-2 py-1 bg-cyan-400/20 border border-cyan-400/40 rounded-full text-cyan-200 text-xs font-bold">
                            BETA
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black">
                          <span className="bg-gradient-to-r from-emerald-200 via-lime-200 to-cyan-200 bg-clip-text text-transparent">
                            NOPAL.AI
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="relative text-lime-300/90 font-semibold text-lg sm:text-xl">
                    Inteligencia artificial adaptativa
                  </p>
                </div>
                
                <div className="p-5 sm:p-7 space-y-6">
                  <div className="bg-gradient-to-r from-black/30 to-emerald-900/20 rounded-lg p-4 sm:p-5 border border-emerald-400/20">
                    <h4 className="text-emerald-200 font-bold mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 bg-emerald-400/30 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                      ¿Cómo funciona?
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      <span className="text-lime-300 font-bold">"Nopal" + ".AI"</span> - Una inteligencia artificial que 
                      observa las reacciones de tu grupo y adapta dinámicamente los retos y preguntas. 
                      Nunca tendrás la misma experiencia dos veces. ¿Estas preparado?
                    </p>
                  </div>
                  <button 
                    disabled
                    className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600/40 via-lime-600/40 to-cyan-600/40 text-white/70 font-bold py-4 sm:py-5 px-6 rounded-xl cursor-not-allowed text-base sm:text-lg border border-emerald-400/20"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>PRÓXIMAMENTE</span>
                      <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-xs">⏳</span>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* MODO 3: VERDAD O RETO */}
            <div 
              className={`group relative cursor-pointer transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:scale-100 hover:-translate-y-1 z-10`}
              style={{animationDelay: '0.7s'}}
              onClick={handleModoVerdadReto}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-red-400/20 via-pink-500/25 to-rose-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 via-pink-500/15 to-rose-400/10 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-red-900/30 via-pink-900/25 to-rose-900/30 backdrop-blur-xl border border-red-400/30 rounded-xl overflow-hidden group-hover:border-red-400/50 transition-all duration-500 shadow-2xl">
                <div className="relative p-5 sm:p-7 border-b border-red-400/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-7 h-7 bg-white rounded-full shadow-inner"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-red-400/20 border border-red-400/40 rounded-full text-red-200 text-xs font-bold">
                            DISPONIBLE
                          </span>
                          <span className="px-2 py-1 bg-pink-400/20 border border-pink-400/40 rounded-full text-pink-200 text-xs font-bold">
                            CLÁSICO
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black">
                          <span className="bg-gradient-to-r from-red-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                            VERDAD O RETO
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="relative text-red-300/90 font-semibold text-lg sm:text-xl">
                    El clásico juego para fiesta
                  </p>
                </div>
                
                <div className="p-5 sm:p-7 space-y-6">
                  <div className="bg-gradient-to-r from-black/20 to-red-900/20 rounded-lg p-4 sm:p-5 border border-red-400/20">
                    <h4 className="text-red-200 font-bold mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-400/30 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                      ¿Cómo funciona?
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      El clásico juego de <span className="text-red-300 font-bold">"Verdad o Reto"</span>. 
                      Elige entre responder una pregunta sincera o realizar un reto emocionante. 
                      Perfecto para animar cualquier reunión.
                    </p>
                  </div>
                  <button className="w-full relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-400 hover:via-pink-400 hover:to-rose-400 text-black font-bold py-4 sm:py-5 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 group-hover:scale-[1.02] text-base sm:text-lg">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>COMENZAR</span>
                      <div className="w-5 h-5 bg-black/20 rounded flex items-center justify-center">
                        <span className="text-xs">→</span>
                      </div>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botón volver ajustado */}
          <div className={`mt-8 sm:mt-12 flex justify-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.5s'}}>
            <button 
              onClick={() => router.back()}
              className="group relative bg-black/40 hover:bg-black/60 text-white font-medium py-3 px-6 sm:px-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-lg shadow-xl"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base">
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Volver al inicio</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Efectos ambientales sutiles */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
      
      {/* Efectos de esquinas */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-yellow-400/20 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-emerald-400/20 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-lime-400/20 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-400/20 rounded-br-lg"></div>

      {/* Estilos CSS para prevenir scroll y ajustar el botón */}
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: fixed;
          overscroll-behavior: none;
          touch-action: none;
          -webkit-overflow-scrolling: none;
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
          overflow: hidden;
        }
        
        @supports (height: 100dvh) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
        }
        
        .h-full {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          touch-action: none;
        }
        
        .flex-1 {
          flex: 1 1 auto;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 0;
          padding-top: 1rem;
        }
        
        .mt-8 {
          margin-top: 2rem;
        }
        
        .sm\:mt-12 {
          margin-top: 3rem;
        }
        
        * {
          box-sizing: border-box;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: none;
          touch-action: none;
        }
        
        @media (max-width: 640px) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
          
          .flex-1 {
            min-height: 0;
            overflow: visible;
          }
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