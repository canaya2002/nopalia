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
    icono: "🏠",
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
    icono: "🎵",
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
    icono: "🔥",
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
    icono: "🌶️",
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
    icono: "💀",
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
        className={`w-3 h-3 rounded-full transition-all duration-500 ${
          i < dificultad 
            ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-110' 
            : 'bg-gray-600 scale-90'
        }`}
        style={{ animationDelay: `${i * 100}ms` }}
      />
    ))
  }

  const currentLevel = niveles[currentIndex]

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
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
              <div className={`absolute -inset-2 bg-gradient-to-r ${currentLevel.colorPrimario} opacity-20 rounded-2xl blur-lg group-hover:opacity-100 transition-all duration-500`}></div>
              <div className={`absolute -inset-1 bg-gradient-to-r ${currentLevel.colorPrimario} opacity-10 rounded-xl blur-md group-hover:opacity-100 transition-all duration-300`}></div>
              
              <div className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-white/30 rounded-xl overflow-hidden group-hover:border-white/50 transition-all duration-500 shadow-2xl`}>
                
                {/* Header de la tarjeta con gradiente del nivel */}
                <div className={`relative p-5 sm:p-7 border-b border-white/20 bg-gradient-to-br ${currentLevel.colorPrimario}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-2xl">
                        {currentLevel.icono}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-white/20 border border-white/40 rounded-full text-white text-xs font-bold">
                            NIVEL {currentLevel.id}
                          </span>
                          <div className="flex gap-1">
                            {getDifficultyStars(currentLevel.dificultad)}
                          </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">
                          {currentLevel.titulo}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="relative text-white/90 font-semibold text-lg sm:text-xl italic">
                    "{currentLevel.subtitulo}"
                  </p>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-5 sm:p-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-yellow-400/80 rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                        </div>
                        <h4 className="text-white font-bold text-sm">Intensidad</h4>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {currentLevel.intensidad}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-400/80 rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                        </div>
                        <h4 className="text-white font-bold text-sm">Duración</h4>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {currentLevel.duracion}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-black/20 to-black/10 rounded-lg p-4 sm:p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/80 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      Descripción
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {currentLevel.descripcion}
                    </p>
                  </div>

                  {/* Botón expandir/contraer */}
                  <button
                    onClick={() => setExpandedCard(!expandedCard)}
                    className="w-full flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium py-2 transition-all duration-300 hover:bg-white/10 rounded-lg"
                  >
                    <span>{expandedCard ? 'Ver menos' : 'Ver detalles'}</span>
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
                    <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-400/80 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-blue-400 font-bold">Ambiente</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{currentLevel.ambiente}</p>
                    </div>

                    {/* Minijuegos */}
                    <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-green-400/80 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-400 rounded-lg animate-pulse"></div>
                        </div>
                        <h4 className="text-green-400 font-bold">Minijuegos ({currentLevel.minijuegos.length})</h4>
                      </div>
                      <div className="space-y-2">
                        {currentLevel.minijuegos.map((juego, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: `${index * 0.2}s`}}></div>
                            <span className="text-gray-300 text-sm leading-relaxed">{juego}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-orange-400/80 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-orange-400 font-bold">Estado del Jugador</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{currentLevel.estado}</p>
                    </div>
                  </div>

                  {/* Botón de selección */}
                  <button
                    onClick={() => handleSeleccionarNivel(currentLevel.id)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                      nivelSeleccionado === currentLevel.id
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {nivelSeleccionado === currentLevel.id ? (
                        <>
                          <span>✓</span>
                          <span>SELECCIONADO</span>
                        </>
                      ) : (
                        <>
                          <span>Seleccionar Nivel</span>
                          <span className="text-xl">{currentLevel.icono}</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Indicador de selección */}
                {nivelSeleccionado === currentLevel.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-black text-sm font-bold">✓</span>
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
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentIndex === 0 || isTransitioning
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30'
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
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <span>COMENZAR</span>
                      <span>🚀</span>
                    </span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-600/40 text-gray-400 font-bold py-3 px-8 rounded-xl cursor-not-allowed"
                  >
                    Selecciona un Nivel
                  </button>
                )}
              </div>

              <button
                onClick={nextLevel}
                disabled={currentIndex === niveles.length - 1 || isTransitioning}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentIndex === niveles.length - 1 || isTransitioning
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Advertencia */}
            <div className="bg-red-900/40 border border-red-400/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/50 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 animate-pulse">
                  !
                </div>
                <p className="text-red-200 text-sm">
                  <strong>+18 años.</strong> Bebe responsablemente y respeta límites.
                </p>
              </div>
            </div>
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