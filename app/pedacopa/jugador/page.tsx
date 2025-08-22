'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Jugador {
  id: string
  nombre: string
  genero: 'hombre' | 'mujer'
  preferencias: 'hombre' | 'mujer' | 'ambos'
}

export default function JugadoresVerdadORetoPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoGenero, setNuevoGenero] = useState<'hombre' | 'mujer'>('hombre')
  const [nuevasPreferencias, setNuevasPreferencias] = useState<'hombre' | 'mujer' | 'ambos'>('ambos')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const jugadoresGuardados = localStorage.getItem('verdad_reto_jugadores')
    if (jugadoresGuardados) {
      try {
        setJugadores(JSON.parse(jugadoresGuardados))
      } catch (error) {
        console.error('Error cargando jugadores:', error)
      }
    }
  }, [])

  const agregarJugador = () => {
    const nombre = nuevoNombre.trim()
    if (nombre && jugadores.length < 12 && !isSubmitting) {
      setIsSubmitting(true)
      
      const nuevoJugador: Jugador = {
        id: Date.now().toString(),
        nombre: nombre,
        genero: nuevoGenero,
        preferencias: nuevasPreferencias
      }
      
      const nuevosJugadores = [...jugadores, nuevoJugador]
      setJugadores(nuevosJugadores)
      
      localStorage.setItem('verdad_reto_jugadores', JSON.stringify(nuevosJugadores))
      
      setNuevoNombre('')
      setNuevoGenero('hombre')
      setNuevasPreferencias('ambos')
      
      setTimeout(() => setIsSubmitting(false), 300)
    }
  }

  const eliminarJugador = (id: string) => {
    const nuevosJugadores = jugadores.filter(j => j.id !== id)
    setJugadores(nuevosJugadores)
    localStorage.setItem('verdad_reto_jugadores', JSON.stringify(nuevosJugadores))
  }

  const continuar = () => {
    if (jugadores.length >= 2) {
      localStorage.setItem('verdad_reto_jugadores', JSON.stringify(jugadores))
      router.push('/pedacopa/vor') // Ruta ajustada para Verdad o Reto
    }
  }

  const limpiarTodo = () => {
    setJugadores([])
    localStorage.removeItem('verdad_reto_jugadores')
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
      {/* Fondo original */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-400/8 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-400/50 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-rose-400/40 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-red-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/15 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-pink-400/15 to-transparent"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>

      <div className="relative flex flex-col h-full w-full">
        <header className={`relative pt-12 sm:pt-16 md:pt-20 pb-8 text-center transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400/10 via-pink-500/10 to-rose-400/10 blur-xl rounded-lg"></div>
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-100 via-pink-100 to-rose-100 bg-clip-text text-transparent drop-shadow-xl">
                  Configurar Jugadores
                </span>
              </h1>
            </div>
            <p className="text-red-200/90 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Agrega de 2 a 12 jugadores para comenzar la diversión
            </p>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-8 overflow-visible">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Panel de agregar jugador */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-400/20 via-pink-500/25 to-rose-400/20 rounded-2xl blur-lg opacity-50 hover:opacity-75 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 via-pink-500/15 to-rose-400/10 rounded-xl blur-md opacity-50 hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-900/30 via-pink-900/25 to-rose-900/30 backdrop-blur-xl border border-red-400/30 rounded-xl shadow-2xl">
                  <div className="relative p-6 border-b border-red-400/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black mb-1">
                          <span className="bg-gradient-to-r from-red-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                            Nuevo Jugador
                          </span>
                        </h2>
                        <p className="text-red-300/80 font-medium">
                          {jugadores.length}/12 jugadores agregados
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6 pb-6">
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-sm">
                        Nombre del jugador
                      </label>
                      <input
                        type="text"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        placeholder="Escribe el nombre aquí..."
                        className="w-full p-4 rounded-lg bg-white/15 text-white placeholder-gray-300 border border-white/25 focus:border-pink-400 focus:outline-none text-base font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        onKeyPress={(e) => e.key === 'Enter' && agregarJugador()}
                        maxLength={25}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-white font-semibold text-sm text-center">
                          Género
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setNuevoGenero('hombre')}
                            disabled={isSubmitting}
                            className={`p-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm ${
                              nuevoGenero === 'hombre' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400' 
                                : 'bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20'
                            }`}
                          >
                            Hombre
                          </button>
                          <button
                            onClick={() => setNuevoGenero('mujer')}
                            disabled={isSubmitting}
                            className={`p-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm ${
                              nuevoGenero === 'mujer' 
                                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 border border-pink-400' 
                                : 'bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20'
                            }`}
                          >
                            Mujer
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-white font-semibold text-sm text-center">
                          Le atraen
                        </label>
                        <div className="relative">
                          <select
                            value={nuevasPreferencias}
                            onChange={(e) => setNuevasPreferencias(e.target.value as any)}
                            disabled={isSubmitting}
                            className="w-full p-3 rounded-lg bg-white/15 text-white border border-white/25 focus:border-pink-400 outline-none appearance-none cursor-pointer hover:bg-white/20 transition-all duration-300 text-sm"
                          >
                            <option value="ambos" className="bg-gray-800">Ambos</option>
                            <option value="hombre" className="bg-gray-800">Hombres</option>
                            <option value="mujer" className="bg-gray-800">Mujeres</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={agregarJugador}
                      disabled={!nuevoNombre.trim() || jugadores.length >= 12 || isSubmitting}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-400 hover:via-pink-400 hover:to-rose-400 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-600 text-black disabled:text-gray-300 font-bold py-4 px-6 rounded-lg text-base transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 shadow-xl disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            <span>Agregando...</span>
                          </>
                        ) : jugadores.length >= 12 ? (
                          <span>Máximo 12 jugadores alcanzado</span>
                        ) : !nuevoNombre.trim() ? (
                          <span>Escribe un nombre primero</span>
                        ) : (
                          <>
                            <span>Agregar Jugador</span>
                            <span className="text-lg">+</span>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.5s'}}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-400/20 via-pink-500/25 to-rose-400/20 rounded-2xl blur-lg opacity-50 hover:opacity-75 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 via-pink-500/15 to-rose-400/10 rounded-xl blur-md opacity-50 hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-900/30 via-pink-900/25 to-rose-900/30 backdrop-blur-xl border border-red-400/30 rounded-xl shadow-2xl h-full">
                  <div className="relative p-6 border-b border-red-400/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                          <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black mb-1">
                            <span className="bg-gradient-to-r from-red-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                              Lista de Jugadores
                            </span>
                          </h2>
                          <p className="text-red-300/80 font-medium">
                            {jugadores.length === 0 ? 'Sin jugadores aún' : 
                             jugadores.length === 1 ? '1 jugador agregado' : 
                             `${jugadores.length} jugadores agregados`}
                          </p>
                        </div>
                      </div>
                      {jugadores.length > 0 && (
                        <button
                          onClick={limpiarTodo}
                          className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-400/30 hover:border-red-400/60 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                        >
                          Limpiar Todo
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-6 pb-6">
                    {jugadores.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-8 h-8 border-2 border-red-400/40 border-dashed rounded-full"></div>
                        </div>
                        <p className="text-gray-400 text-lg font-medium mb-2">
                          Sin jugadores aún
                        </p>
                        <p className="text-gray-500 text-sm">
                          Agrega el primer jugador para comenzar
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                        {jugadores.map((jugador, index) => (
                          <div key={jugador.id} className="group transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 backdrop-blur-sm p-4 rounded-lg border border-white/15 hover:border-pink-400/40 transition-all duration-300 shadow-lg">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-white font-bold text-base truncate">{jugador.nombre}</p>
                                  <div className="flex items-center gap-3 text-xs mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      jugador.genero === 'hombre' 
                                        ? 'bg-blue-500/20 text-blue-200' 
                                        : 'bg-pink-500/20 text-pink-200'
                                    }`}>
                                      {jugador.genero === 'hombre' ? 'Hombre' : 'Mujer'}
                                    </span>
                                    <span className="px-2 py-1 bg-rose-500/20 text-rose-200 rounded-full text-xs font-medium">
                                      Le atraen: {
                                        jugador.preferencias === 'ambos' ? 'Ambos' :
                                        jugador.preferencias === 'hombre' ? 'Hombres' : 'Mujeres'
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => eliminarJugador(jugador.id)}
                                className="w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-full font-bold transition-all duration-300 hover:scale-110 shadow-lg flex-shrink-0 ml-3 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Volver al inicio */}
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

        <div className={`p-6 border-t border-white/10 bg-black/20 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.8s'}}>
          <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
            <div className="text-center">
              {jugadores.length < 2 && (
                <p className="text-rose-300 font-semibold mb-3 animate-pulse text-sm">
                  {jugadores.length === 0 ? 'Agrega al menos 2 jugadores' : 'Agrega 1 jugador más'}
                </p>
              )}
              {jugadores.length >= 2 && (
                <p className="text-red-300 font-semibold mb-3 text-sm">
                  ¡Listo para continuar!
                </p>
              )}
              <button
                onClick={continuar}
                disabled={jugadores.length < 2}
                className="group relative bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-400 hover:via-pink-400 hover:to-rose-400 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-xl disabled:cursor-not-allowed text-base"
              >
                <span className="flex items-center gap-3">
                  <span>Continuar al Juego</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent"></div>
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-red-400/20 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-pink-400/20 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-rose-400/20 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-red-400/20 rounded-br-lg"></div>

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
        
        .p-6 {
          padding: 1.5rem;
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 16px));
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(244, 114, 182, 0.5); /* Color pink-500 para el scrollbar */
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 114, 182, 0.7);
        }
      `}</style>
    </div>
  )
}