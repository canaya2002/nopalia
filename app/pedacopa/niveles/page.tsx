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
    titulo: "Casa Tranquila",
    subtitulo: "¿Quién trae las chelas?",
    intensidad: "Suave",
    colorPrimario: "from-green-400 to-emerald-600",
    colorSecundario: "from-green-500 to-emerald-700",
    icono: "home",
    ambiente: "Sala normal, música suave, luces prendidas. El ambiente es relajado y todos están conociendo las reglas.",
    minijuegos: [
      "Verdadero o Falso: Pierdes, bebes un trago",
      "Memorama borracho: Cartas que se mueven si tomas",
      "Charadas mexicanas: Si fallas, shotcito",
      "Preguntas básicas: ¿Cuál es tu comida favorita?",
      "Retos suaves: Canta una canción"
    ],
    estado: "Apenas empieza la peda, leve risa, todo sano y divertido.",
    duracion: "30-45 min",
    participantes: "2-12",
    dificultad: 1,
    descripcion: "El nivel perfecto para empezar la fiesta. Retos suaves, risas garantizadas y un ambiente relajado donde todos se sienten cómodos."
  },
  {
    id: 2,
    titulo: "Precopeo",
    subtitulo: "Ya sonó la cumbia",
    intensidad: "Moderado",
    colorPrimario: "from-yellow-400 to-orange-500",
    colorSecundario: "from-yellow-500 to-orange-600",
    icono: "music",
    ambiente: "Luces bajitas, alguien ya sacó bocinas. La música empieza a subir y el ambiente se calienta.",
    minijuegos: [
      "La botella: Beso en la mejilla o shot",
      "Stop con castigo: Si pierdes, reto o fondo",
      "El vaso loco: Pasar un vaso con la boca",
      "Verdad o reto: Nivel intermedio",
      "Baile en pareja: Sígueme el ritmo"
    ],
    estado: "Ya se ríen más fuerte, hay roce, el calor sube y empieza el coqueteo.",
    duracion: "45-60 min",
    participantes: "3-12",
    dificultad: 2,
    descripcion: "La temperatura sube y los retos se vuelven más interesantes. El precopeo perfecto antes del verdadero desmadre."
  },
  {
    id: 3,
    titulo: "La Hora del Desmadre",
    subtitulo: "Shots y decisiones malas",
    intensidad: "Intenso",
    colorPrimario: "from-red-400 to-pink-600",
    colorSecundario: "from-red-500 to-pink-700",
    icono: "fire",
    ambiente: "Música alta, luces LED, gente bailando. El ambiente está caliente y todos están en confianza.",
    minijuegos: [
      "Yo Nunca Nunca: Si bebes 3 veces, haces un reto",
      "Ruleta Picante: Beso, fondo, confiesa, baila sexy",
      "Desafío Nopal: Minijuego random de baile",
      "Strip poker light: Prendas por puntos",
      "Confesiones íntimas: Di tu secreto más raro"
    ],
    estado: "Todos entrados, empieza el coqueteo descarado y las risas fuertes.",
    duracion: "60-90 min",
    participantes: "4-12",
    dificultad: 3,
    descripcion: "Aquí es donde la fiesta realmente despega. Retos más atrevidos, confesiones picantes y mucha diversión descontrolada."
  },
  {
    id: 4,
    titulo: "El After Salvaje",
    subtitulo: "¿Quién trajo al ex?",
    intensidad: "Extremo",
    colorPrimario: "from-purple-500 to-red-600",
    colorSecundario: "from-purple-600 to-red-700",
    icono: "zap",
    ambiente: "Cuarto oscuro con neón, ropa en el sillón, nadie sabe la hora. El ambiente está al máximo.",
    minijuegos: [
      "Verdad extrema o reto fuerte",
      "Jenga erótica: Cada pieza tiene besos y bailes",
      "Chupito Challenge: Beber de cuerpo ajeno",
      "Strip challenge: Batalla de baile",
      "Confesiones prohibidas: Lo que nunca has dicho"
    ],
    estado: "Calor, ligues fuertes, ya nadie quiere irse. Todo está permitido.",
    duracion: "90+ min",
    participantes: "4-8",
    dificultad: 4,
    descripcion: "El nivel más salvaje. Solo para los más atrevidos que buscan una experiencia sin límites y completamente desenfrenada."
  },
  {
    id: 5,
    titulo: "El Mictlán del Crudo",
    subtitulo: "Lo que pasa en Nopal, se queda en Nopal",
    intensidad: "Legendario",
    colorPrimario: "from-gray-600 to-black",
    colorSecundario: "from-gray-700 to-gray-900",
    icono: "skull",
    ambiente: "Desorden total, luces prendidas, alguien en el suelo. El caos más divertido de la noche.",
    minijuegos: [
      "El Recuerdo Maldito: Adivina lo que hiciste anoche",
      "Reto Castigo: Si no recuerdas, castigo eterno",
      "El Strip-Final Boss: Batalla épica de dignidad",
      "Confesión final: El secreto más oscuro",
      "La prueba definitiva: ¿Sobreviviste?"
    ],
    estado: "Todo fue increíble o una vergüenza total. Pero definitivamente repetirías.",
    duracion: "2+ horas",
    participantes: "2-6",
    dificultad: 5,
    descripcion: "El nivel legendario donde se forjan las leyendas. Solo para sobrevivientes de fiestas épicas que buscan la experiencia definitiva."
  }
]

export default function NivelesPage() {
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
    const jugadoresGuardados = localStorage.getItem('nopal_jugadores')
    if (jugadoresGuardados) {
      try {
        setJugadores(JSON.parse(jugadoresGuardados))
      } catch (error) {
        console.error('Error cargando jugadores:', error)
        router.push('/pedacopa/jugadores')
      }
    } else {
      router.push('/pedacopa/jugadores')
    }
    return () => clearTimeout(timer)
  }, [router])

  const handleSeleccionarNivel = (nivelId: number) => {
    setNivelSeleccionado(nivelId)
  }

  const handleComenzarJuego = () => {
    if (nivelSeleccionado) {
      localStorage.setItem('nopal_nivel_actual', nivelSeleccionado.toString())
      router.push(`/pedacopa/nivel${nivelSeleccionado}`)
    }
  }

  const navigateToLevel = (index: number) => {
    if (index < 0 || index >= niveles.length || isTransitioning) return
    
    setIsTransitioning(true)
    setExpandedCard(false)
    
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
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
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          i < dificultad 
            ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-110' 
            : 'bg-gray-600 scale-90'
        }`}
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        )
      case 'music':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )
      case 'fire':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
          </svg>
        )
      case 'zap':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        )
      case 'skull':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.41 3.11 7.24.39.37.39.97 0 1.34C4.73 20.96 4.37 21 4 21h16c-.37 0-.73-.04-1.11-.42-.39-.37-.39-.97 0-1.34C20.8 17.41 22 14.85 22 12c0-5.52-4.48-10-10-10zM8.5 9c.83 0 1.5.67 1.5 1.5S9.33 12 8.5 12 7 11.33 7 10.5 7.67 9 8.5 9zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5S14.67 9 15.5 9zm-3.5 6c-1.33 0-2.42.84-2.83 2h5.66c-.41-1.16-1.5-2-2.83-2z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        )
    }
  }

  const currentLevel = niveles[currentIndex]

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20"></div>

      {/* Layout principal con scroll habilitado */}
      <div className="relative h-full flex flex-col">
        
        {/* Header fijo */}
        <header className={`flex-shrink-0 pt-8 sm:pt-12 pb-6 text-center transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/10 via-white/10 to-emerald-400/10 blur-xl rounded-lg"></div>
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-black">
                <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-xl">
                  Elige tu Nivel
                </span>
              </h1>
            </div>
          </div>
        </header>

        {/* Contenido principal con scroll */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4"
             onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}>
          <div className="max-w-lg mx-auto">
            {/* Tarjeta principal del nivel actual */}
            <div className={`group relative cursor-pointer transform transition-all duration-700 mb-6 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} ${
              isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
            }`}>
              
              {/* Efectos de resplandor */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${currentLevel.colorPrimario} opacity-20 rounded-2xl blur-lg group-hover:opacity-40 transition-all duration-500`}></div>
              <div className={`absolute -inset-1 bg-gradient-to-r ${currentLevel.colorPrimario} opacity-10 rounded-xl blur-md group-hover:opacity-30 transition-all duration-300`}></div>
              
              <div className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-white/30 rounded-xl overflow-hidden group-hover:border-white/50 transition-all duration-500 shadow-2xl`}>
                
                {/* Header de la tarjeta con gradiente del nivel */}
                <div className={`relative p-5 sm:p-7 border-b border-white/20 bg-gradient-to-br ${currentLevel.colorPrimario}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-white">
                        {getIcon(currentLevel.icono)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-3 py-1 bg-white/20 border border-white/40 rounded-full text-white text-xs font-bold tracking-wide">
                            NIVEL {currentLevel.id}
                          </span>
                          <div className="flex gap-1">
                            {getDifficultyStars(currentLevel.dificultad)}
                          </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                          {currentLevel.titulo}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="relative text-white/90 font-semibold text-lg sm:text-xl italic leading-relaxed">
                    "{currentLevel.subtitulo}"
                  </p>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-5 sm:p-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h4 className="text-white font-bold text-sm tracking-wide">INTENSIDAD</h4>
                      </div>
                      <p className="text-gray-300 text-sm font-medium">
                        {currentLevel.intensidad}
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                          </svg>
                        </div>
                        <h4 className="text-white font-bold text-sm tracking-wide">DURACIÓN</h4>
                      </div>
                      <p className="text-gray-300 text-sm font-medium">
                        {currentLevel.duracion}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-black/30 to-black/10 rounded-xl p-5 border border-white/20 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="tracking-wide">DESCRIPCIÓN</span>
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed font-medium">
                      {currentLevel.descripcion}
                    </p>
                  </div>

                  {/* Botón expandir/contraer */}
                  <button
                    onClick={() => setExpandedCard(!expandedCard)}
                    className="w-full flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium py-3 transition-all duration-300 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/30"
                  >
                    <span className="tracking-wide">{expandedCard ? 'Ocultar detalles' : 'Ver detalles'}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${expandedCard ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Contenido expandido */}
                  <div className={`space-y-4 transition-all duration-500 ${
                    expandedCard ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    
                    {/* Ambiente */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h4 className="text-blue-300 font-bold tracking-wide">AMBIENTE</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed font-medium">{currentLevel.ambiente}</p>
                    </div>

                    {/* Minijuegos */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"/>
                          </svg>
                        </div>
                        <h4 className="text-green-300 font-bold tracking-wide">MINIJUEGOS ({currentLevel.minijuegos.length})</h4>
                      </div>
                      <div className="space-y-3">
                        {currentLevel.minijuegos.map((juego, index) => (
                          <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                            <span className="text-gray-300 text-sm leading-relaxed font-medium">{juego}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <h4 className="text-orange-300 font-bold tracking-wide">ESTADO DEL JUGADOR</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed font-medium">{currentLevel.estado}</p>
                    </div>
                  </div>

                  {/* Botón de selección */}
                  <button
                    onClick={() => handleSeleccionarNivel(currentLevel.id)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden shadow-lg ${
                      nivelSeleccionado === currentLevel.id
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-yellow-400/50 scale-105'
                        : 'bg-gradient-to-r from-white/10 to-white/5 text-white hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-3">
                      {nivelSeleccionado === currentLevel.id ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          <span className="tracking-wide">SELECCIONADO</span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">SELECCIONAR NIVEL</span>
                          <div className="text-white">
                            {getIcon(currentLevel.icono)}
                          </div>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Indicador de selección */}
                {nivelSeleccionado === currentLevel.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo en la parte inferior */}
        <div className="flex-shrink-0 p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-lg mx-auto">
            {/* Navegación de flechas */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevLevel}
                disabled={currentIndex === 0 || isTransitioning}
                className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                  currentIndex === 0 || isTransitioning
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-center">
                {nivelSeleccionado ? (
                  <button
                    onClick={handleComenzarJuego}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <span className="flex items-center gap-2 tracking-wide">
                      <span>COMENZAR</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-600/40 text-gray-400 font-bold py-3 px-8 rounded-xl cursor-not-allowed tracking-wide"
                  >
                    Selecciona un Nivel
                  </button>
                )}
              </div>

              <button
                onClick={nextLevel}
                disabled={currentIndex === niveles.length - 1 || isTransitioning}
                className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                  currentIndex === niveles.length - 1 || isTransitioning
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Advertencia */}
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-yellow-400/20 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-emerald-400/20 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-lime-400/20 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-400/20 rounded-br-lg"></div>

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