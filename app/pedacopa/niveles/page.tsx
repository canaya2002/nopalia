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
    
    // Solo actuar si el movimiento horizontal es mayor que el vertical
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 relative overflow-hidden">
      
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos de fondo principales */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-400/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-purple-400/6 rounded-full blur-2xl animate-float-slow"></div>
        
        {/* Partículas flotantes dinámicas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div className={`w-2 h-2 bg-gradient-to-r ${currentLevel.colorPrimario} rounded-full shadow-lg`}></div>
          </div>
        ))}
        
        {/* Líneas de energía */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-slide-fast"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-slide-slow"></div>
      </div>

      {/* Efecto de resplandor del nivel actual */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentLevel.colorPrimario} opacity-5 transition-all duration-1000`}></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header con animación de entrada */}
        <header className={`pt-6 pb-4 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white animate-glow">
            Elige tu Aventura
          </h1>
          <p className="text-emerald-200 text-lg mb-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Desliza o usa las flechas para navegar
          </p>
          
          {/* Info jugadores con animación */}
          <div className="inline-flex items-center gap-3 bg-emerald-900/60 backdrop-blur-lg border border-emerald-400/40 rounded-xl px-4 py-2 animate-scale-in" style={{animationDelay: '0.6s'}}>
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-lime-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
              {jugadores.length}
            </div>
            <span className="text-white font-medium">
              {jugadores.length} {jugadores.length === 1 ? 'Jugador' : 'Jugadores'} Listos
            </span>
          </div>
        </header>

        {/* Indicador de nivel y navegación */}
        <div className="flex justify-center items-center mb-4 gap-4">
          {/* Botón anterior */}
          <button
            onClick={prevLevel}
            disabled={currentIndex === 0 || isTransitioning}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0 || isTransitioning
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110 active:scale-95'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicadores de nivel */}
          <div className="flex gap-2">
            {niveles.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToLevel(index)}
                disabled={isTransitioning}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60 hover:scale-125'
                }`}
              />
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={nextLevel}
            disabled={currentIndex === niveles.length - 1 || isTransitioning}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === niveles.length - 1 || isTransitioning
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110 active:scale-95'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Tarjeta principal del nivel actual */}
        <div 
          className="flex-1 px-4 pb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`relative max-w-md mx-auto h-full transition-all duration-500 ${
            isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
          }`}>
            
            {/* Efecto de resplandor de la tarjeta */}
            {nivelSeleccionado === currentLevel.id && (
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-500/40 to-yellow-400/30 rounded-3xl blur-xl animate-pulse-slow"></div>
            )}
            
            {/* Tarjeta principal */}
            <div className={`relative bg-gray-900/95 backdrop-blur-xl border-2 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 h-full ${
              nivelSeleccionado === currentLevel.id 
                ? 'border-yellow-400 shadow-yellow-400/30 scale-105' 
                : 'border-white/30 hover:border-white/50'
            }`}>
              
              {/* Header de la tarjeta con gradiente del nivel */}
              <div className={`relative p-6 bg-gradient-to-br ${currentLevel.colorPrimario} text-white overflow-hidden`}>
                {/* Partículas en el header */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float-header opacity-30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-bold border border-white/30 animate-bounce-soft">
                        {currentLevel.id}
                      </div>
                      <div className="text-4xl animate-bounce-soft" style={{animationDelay: '0.2s'}}>
                        {currentLevel.icono}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {getDifficultyStars(currentLevel.dificultad)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold animate-slide-in-right">{currentLevel.titulo}</h3>
                    <p className="text-lg italic opacity-90 animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                      "{currentLevel.subtitulo}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm border border-white/30 animate-fade-in ${
                      currentLevel.intensidad === 'Suave' ? 'text-green-100' :
                      currentLevel.intensidad === 'Moderado' ? 'text-yellow-100' :
                      currentLevel.intensidad === 'Intenso' ? 'text-red-100' :
                      currentLevel.intensidad === 'Extremo' ? 'text-purple-100' :
                      'text-gray-100'
                    }`}>
                      {currentLevel.intensidad}
                    </span>
                    <div className="flex gap-2 text-sm">
                      <span className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
                        ⏱️ {currentLevel.duracion}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20 animate-fade-in" style={{animationDelay: '0.3s'}}>
                        👥 {currentLevel.participantes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contenido scrolleable */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1" style={{maxHeight: 'calc(100vh - 400px)'}}>
                
                {/* Descripción principal */}
                <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <p className="text-gray-300 text-base leading-relaxed">{currentLevel.descripcion}</p>
                </div>

                {/* Botón expandir/contraer */}
                <button
                  onClick={() => setExpandedCard(!expandedCard)}
                  className="w-full flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium py-2 transition-all duration-300 hover:bg-emerald-400/10 rounded-lg"
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
                
                {/* Contenido expandido con animación */}
                <div className={`space-y-4 transition-all duration-500 overflow-hidden ${
                  expandedCard ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  
                  {/* Ambiente */}
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 animate-slide-in-up">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-400/40 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <h4 className="text-blue-400 font-bold">🌅 Ambiente</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{currentLevel.ambiente}</p>
                  </div>

                  {/* Minijuegos */}
                  <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 animate-slide-in-up" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-green-400/40 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-lg animate-pulse"></div>
                      </div>
                      <h4 className="text-green-400 font-bold">🎮 Minijuegos ({currentLevel.minijuegos.length})</h4>
                    </div>
                    <div className="space-y-2">
                      {currentLevel.minijuegos.map((juego, index) => (
                        <div key={index} className="flex items-start gap-2 animate-fade-in" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: `${index * 0.2}s`}}></div>
                          <span className="text-gray-300 text-sm leading-relaxed">{juego}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-orange-400/40 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                      </div>
                      <h4 className="text-orange-400 font-bold">😄 Estado del Jugador</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{currentLevel.estado}</p>
                  </div>
                </div>
              </div>

              {/* Botón de selección */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSeleccionarNivel(currentLevel.id)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                    nivelSeleccionado === currentLevel.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/50 animate-pulse-slow'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 hover:scale-105'
                  }`}
                >
                  {nivelSeleccionado === currentLevel.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-shimmer"></div>
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    {nivelSeleccionado === currentLevel.id ? (
                      <>
                        <span className="animate-bounce">✓</span>
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

              {/* Indicador de selección superior */}
              {nivelSeleccionado === currentLevel.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advertencia animada */}
        <div className="px-4 py-3 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="max-w-md mx-auto bg-red-900/40 border border-red-400/40 rounded-xl p-3 backdrop-blur-sm">
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

        {/* Controles de navegación */}
        <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10 animate-fade-in-up" style={{animationDelay: '1s'}}>
          <div className="max-w-md mx-auto flex justify-between items-center gap-4">
            
            <button
              onClick={() => router.back()}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              ← Volver
            </button>

            <div className="text-center">
              {nivelSeleccionado ? (
                <button
                  onClick={handleComenzarJuego}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 animate-pulse-slow"
                >
                  🚀 ¡Comenzar!
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-600/40 text-gray-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed"
                >
                  Selecciona un Nivel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS personalizado para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        
        @keyframes particle {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(20px) rotate(180deg) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-60px) translateX(-10px) rotate(360deg) scale(0.6); opacity: 0.2; }
        }
        
        @keyframes slide-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float-header {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite 2s; }
        .animate-particle { animation: particle 4s ease-in-out infinite; }
        .animate-slide-fast { animation: slide-fast 3s linear infinite; }
        .animate-slide-slow { animation: slide-slow 5s linear infinite 1s; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-float-header { animation: float-header 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}