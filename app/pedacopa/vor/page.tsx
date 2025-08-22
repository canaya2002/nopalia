'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Jugador {
  id: string
  nombre: string
  genero: 'hombre' | 'mujer'
  preferencias: 'hombre' | 'mujer' | 'ambos'
}

const niveles = [
  {
    id: 1,
    titulo: "Precopeo",
    subtitulo: "Empecemos suave",
    intensidad: "Suave",
    colorPrimario: "from-red-400 to-pink-500",
    colorSecundario: "from-red-500 to-pink-600",
    icono: "home",
    ambiente: "Ambiente relajado, luces suaves, todos están listos para romper el hielo con risas y confesiones ligeras.",
    minijuegos: [
      "Verdad o Reto: Preguntas ligeras",
      "Charadas de fiesta: Si fallas, toma un sorbo",
      "Adivina quién: Responde o bebe",
      "Preguntas de calentamiento: ¿Cuál es tu peor cita?",
      "Retos divertidos: Imita a alguien del grupo"
    ],
    estado: "Risas iniciales, todos se están conociendo, el ambiente es ligero y divertido.",
    duracion: "30-45 min",
    participantes: "2-12",
    dificultad: 1,
    descripcion: "Perfecto para empezar la noche con retos y preguntas suaves que rompen el hielo y preparan a todos para la diversión.",
    isPremium: false
  },
  {
    id: 2,
    titulo: "Fiesta",
    subtitulo: "¡Sube el volumen!",
    intensidad: "Moderado",
    colorPrimario: "from-pink-400 to-rose-500",
    colorSecundario: "from-pink-500 to-rose-600",
    icono: "music",
    ambiente: "Música animada, luces bajas, el grupo ya está entrando en confianza y la energía sube.",
    minijuegos: [
      "Verdad o Reto: Nivel intermedio",
      "Beso o trago: Decide rápido",
      "Yo Nunca Nunca: Confiesa o bebe",
      "Reto de baile: Muestra tus pasos",
      "Preguntas picantes: ¿Qué harías en una isla desierta?"
    ],
    estado: "El ambiente se calienta, las risas se mezclan con coqueteos y todos están más sueltos.",
    duracion: "45-60 min",
    participantes: "3-12",
    dificultad: 2,
    descripcion: "La fiesta está en su punto. Retos y preguntas más atrevidas que llevan la diversión al siguiente nivel.",
    isPremium: true
  },
  {
    id: 3,
    titulo: "Calentémonos",
    subtitulo: "¡Que arda la noche!",
    intensidad: "Intenso",
    colorPrimario: "from-rose-400 to-red-600",
    colorSecundario: "from-rose-500 to-red-700",
    icono: "fire",
    ambiente: "Luces LED, música a todo volumen, todos están en confianza y listos para retos más subidos de tono.",
    minijuegos: [
      "Verdad o Reto: Nivel avanzado",
      "Ruleta del beso: Beso o reto extremo",
      "Confesiones calientes: Secretos jugosos",
      "Reto físico: Acércate a alguien",
      "Yo Nunca Nunca: Edición picante"
    ],
    estado: "Coqueteos abiertos, risas fuertes, la noche está en su punto más alto.",
    duracion: "60-90 min",
    participantes: "4-12",
    dificultad: 3,
    descripcion: "El nivel donde todo se descontrola. Retos y preguntas picantes que garantizan una noche inolvidable.",
    isPremium: true
  }
]

export default function NivelesVerdadORetoPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [expandedCard, setExpandedCard] = useState<boolean>(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    const jugadoresGuardados = localStorage.getItem('verdad_reto_jugadores')
    if (jugadoresGuardados) {
      try {
        setJugadores(JSON.parse(jugadoresGuardados))
      } catch (error) {
        console.error('Error cargando jugadores:', error)
        router.push('/verdad-o-reto/jugadores')
      }
    } else {
      router.push('/verdad-o-reto/jugadores')
    }
    
    return () => clearTimeout(timer)
  }, [router])

  const handleSeleccionarNivel = (nivelId: number) => {
    const nivel = niveles.find(n => n.id === nivelId)
    
    if (nivel?.isPremium) {
      localStorage.setItem('verdad_reto_nivel_deseado', nivelId.toString())
      router.push('/register')
      return
    }
    
    setNivelSeleccionado(nivelId)
  }

  const handleComenzarJuego = () => {
    if (nivelSeleccionado) {
      const nivel = niveles.find(n => n.id === nivelSeleccionado)
      
      if (nivel?.isPremium) {
        localStorage.setItem('verdad_reto_nivel_deseado', nivelSeleccionado.toString())
        router.push('/register')
        return
      }
      
      localStorage.setItem('verdad_reto_nivel_actual', nivelSeleccionado.toString())
      localStorage.setItem('verdad_reto_jugadores_partida', JSON.stringify(jugadores))
      
      router.push(`/verdad-o-reto/nivel${nivelSeleccionado}`)
    }
  }

  const navigateToLevel = (index: number) => {
    if (index < 0 || index >= niveles.length || isTransitioning) return
    
    setIsTransitioning(true)
    setExpandedCard(false)
    
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 400)
  }

  const nextLevel = () => navigateToLevel(currentIndex + 1)
  const prevLevel = () => navigateToLevel(currentIndex - 1)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return
    
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const deltaX = touchStartX.current - touchEndX
    const deltaY = touchStartY.current - touchEndY
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextLevel()
      } else {
        prevLevel()
      }
    }
    
    touchStartX.current = null
    touchStartY.current = null
  }

  const getDifficultyStars = (dificultad: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
          i < dificultad 
            ? 'bg-rose-400 shadow-md shadow-rose-400/50 scale-110' 
            : 'bg-gray-600 scale-90'
        }`}
      />
    ))
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        )
      case 'music':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )
      case 'fire':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        )
    }
  }

  const currentLevel = niveles[currentIndex]
  const isCurrentLevelPremium = currentLevel.isPremium

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-400/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-400/50 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-rose-400/40 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-red-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/15 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-pink-400/15 to-transparent"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>

      {/* Esquinas decorativas */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-red-400/20 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-pink-400/20 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-rose-400/20 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-red-400/20 rounded-br-lg"></div>

      {/* Layout principal */}
      <div className="relative h-full flex flex-col pt-8 sm:pt-12">
        {/* Header */}
        <header className={`flex-shrink-0 pb-4 text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-red-100 via-pink-100 to-rose-100 bg-clip-text text-transparent">
              Elige tu Nivel
            </h1>
          </div>
        </header>

        {/* Contenido principal */}
        <div
          className="flex-1 flex flex-col items-center justify-start px-2 sm:px-4 pt-4 pb-8 overflow-visible"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="max-w-lg mx-auto">
            {/* Tarjeta del nivel */}
            <div
              className={`group relative cursor-pointer transform transition-all duration-600 mb-6 shadow-lg ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
            >
              <div
                className={`absolute -inset-2 bg-gradient-to-r ${currentLevel.colorPrimario} rounded-2xl opacity-20 group-hover:opacity-30 transition-all duration-300 backdrop-blur-md`}
              ></div>

              <div className="relative bg-gray-900/95 backdrop-blur-lg border border-white/30 rounded-xl overflow-hidden group-hover:border-white/50 transition-all duration-300 shadow-xl">
                {/* Indicador Premium/Gratis */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 text-sm font-bold rounded-full z-10 ${
                    isCurrentLevelPremium
                      ? 'bg-gradient-to-r from-red-400 to-pink-500 text-black'
                      : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                  }`}
                >
                  {isCurrentLevelPremium ? 'PREMIUM' : 'GRATIS'}
                </div>

                {/* Header de la tarjeta */}
                <div className={`p-5 sm:p-6 bg-gradient-to-br ${currentLevel.colorPrimario}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 text-white">
                        {getIcon(currentLevel.icono)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-white/20 border border-white/40 rounded-full text-white text-sm font-bold">
                            NIVEL {currentLevel.id}
                          </span>
                          <div className="flex gap-1">{getDifficultyStars(currentLevel.dificultad)}</div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">{currentLevel.titulo}</h2>
                      </div>
                    </div>
                  </div>
                  <p className="text-white font-semibold text-lg sm:text-xl italic">"{currentLevel.subtitulo}"</p>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex justify-center">
                    <div className="bg-white/10 rounded-lg p-4 sm:p-5 border border-white/20 hover:border-white/30 transition-all duration-300 w-full max-w-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h4 className="text-white font-bold text-base">INTENSIDAD</h4>
                      </div>
                      <p className="text-white text-base">{currentLevel.intensidad}</p>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 sm:p-5 border border-white/20">
                    <h4 className="text-white font-bold text-base mb-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      DESCRIPCIÓN
                    </h4>
                    <p className="text-white text-base">{currentLevel.descripcion}</p>
                  </div>

                  {isCurrentLevelPremium && (
                    <div className="bg-rose-900/20 rounded-lg p-4 sm:p-5 border border-rose-400/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                          </svg>
                        </div>
                        <h4 className="text-rose-200 font-bold text-base">NIVEL PREMIUM</h4>
                      </div>
                      <p className="text-rose-100 text-base">
                        Este nivel requiere cuenta premium. Regístrate y suscríbete para desbloquear esta experiencia.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedCard(!expandedCard)}
                    className="w-full flex items-center justify-center gap-2 text-white font-bold text-base py-3 rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    aria-label={expandedCard ? 'Ocultar detalles' : 'Ver detalles'}
                  >
                    <span>{expandedCard ? 'Ocultar detalles' : 'Ver detalles'}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${expandedCard ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`space-y-5 transition-all duration-500 ${
                      expandedCard ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="bg-pink-500/10 rounded-lg p-4 sm:p-5 border border-pink-400/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-rose-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h4 className="text-pink-300 font-bold text-base">AMBIENTE</h4>
                      </div>
                      <p className="text-white text-base">{currentLevel.ambiente}</p>
                    </div>

                    <div className="bg-rose-500/10 rounded-lg p-4 sm:p-5 border border-rose-400/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"/>
                          </svg>
                        </div>
                        <h4 className="text-rose-300 font-bold text-base">MINIJUEGOS ({currentLevel.minijuegos.length})</h4>
                      </div>
                      <div className="space-y-3">
                        {currentLevel.minijuegos.map((juego, index) => (
                          <div key={index} className="flex items-start gap-3 p-2 rounded-md bg-white/5">
                            <div className="w-2.5 h-2.5 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-white text-base">{juego}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-500/10 rounded-lg p-4 sm:p-5 border border-red-400/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <h4 className="text-red-300 font-bold text-base">ESTADO DEL JUGADOR</h4>
                      </div>
                      <p className="text-white text-base">{currentLevel.estado}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeleccionarNivel(currentLevel.id)}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 ${
                      nivelSeleccionado === currentLevel.id
                        ? 'bg-gradient-to-r from-red-400 to-pink-500 text-black'
                        : isCurrentLevelPremium
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-black hover:from-red-400 hover:to-rose-400'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400'
                    }`}
                    aria-label={nivelSeleccionado === currentLevel.id ? 'Nivel seleccionado' : isCurrentLevelPremium ? 'Desbloquear nivel premium' : 'Seleccionar nivel gratis'}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {nivelSeleccionado === currentLevel.id ? (
                        <>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          SELECCIONADO
                        </>
                      ) : isCurrentLevelPremium ? (
                        <>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                          </svg>
                          DESBLOQUEAR PREMIUM
                        </>
                      ) : (
                        <>
                          SELECCIONAR NIVEL GRATIS
                          <div>{getIcon(currentLevel.icono)}</div>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {nivelSeleccionado === currentLevel.id && !isCurrentLevelPremium && (
                  <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
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
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 bg-black/40 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-center">
              <button
                onClick={prevLevel}
                disabled={currentIndex === 0 || isTransitioning}
                className={`p-4 rounded-full transition-all duration-300 ${
                  currentIndex === 0 || isTransitioning
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
                }`}
                aria-label="Nivel anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex-1 mx-4">
                {nivelSeleccionado && !isCurrentLevelPremium ? (
                  <button
                    onClick={handleComenzarJuego}
                    className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-bold py-4 rounded-lg hover:scale-105 transition-all duration-300"
                    aria-label="Comenzar juego"
                  >
                    <span className="flex items-center justify-center gap-3">
                      COMENZAR GRATIS
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-600/50 text-gray-400 font-bold py-4 rounded-lg cursor-not-allowed"
                    aria-label={isCurrentLevelPremium ? 'Requiere cuenta premium' : 'Selecciona un nivel'}
                  >
                    {isCurrentLevelPremium ? 'Requiere Premium' : 'Selecciona un nivel'}
                  </button>
                )}
              </div>

              <button
                onClick={nextLevel}
                disabled={currentIndex === niveles.length - 1 || isTransitioning}
                className={`p-4 rounded-full transition-all duration-300 ${
                  currentIndex === niveles.length - 1 || isTransitioning
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
                }`}
                aria-label="Siguiente nivel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

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
          height: 100dvh;
          max-height: 100dvh;
          overflow: hidden;
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
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}