'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LevelProtection from '../../components/LevelProtection'

interface Jugador {
  id: string
  nombre: string
  genero: 'hombre' | 'mujer'
  preferencias: 'hombre' | 'mujer' | 'ambos'
  participaciones: number
}

function Nivel2Component() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [retoActual, setRetoActual] = useState(1)
  const [reto, setReto] = useState('')
  const [retosDisponibles, setRetosDisponibles] = useState<number[]>([])
  const [retosUsados, setRetosUsados] = useState<number[]>([])

const retosNivel2 = [
    "{jugador_turno}, dale un masaje de hombros a {jugador_atraccion} por 1 minuto. Si no lo haces con entusiasmo, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, bailen pegaditos una canción completa. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, abraza a {jugador_atraccion} por 30 segundos sin soltarlo. Si te separas antes, toma 2 shots.",
    "{jugador_turno}, dale de comer algo en la boca a {jugador_atraccion}. Si derramas algo, toma 1 shot.",
    "{jugador_turno}, dile a {jugador_atraccion} por qué sería una buena pareja para ti. Si no convences al grupo, toma 2 shots.",
    "{jugador_turno}, seduce a {jugador_atraccion} usando solo tu mirada por 1 minuto. Si {jugador_atraccion} parpadea primero, toma 1 shot.",
    "{jugador_turno}, susúrrale algo sexy al oído a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, haz que {jugador_atraccion} se sonroje solo con palabras. Si no lo logras, toma 2 shots.",
    "{jugador_turno}, confiesa tu fantasía romántica más loca con {jugador_atraccion}. Si no es lo suficientemente atrevida, toma 2 shots.",
    "{jugador_turno}, describe tu beso perfecto con lujo de detalles. Si el grupo no lo aprueba, toma 1 shot.",
    "{jugador_turno}, cuenta tu experiencia más romántica hasta ahora. Si no cuentas nada, toma 2 shots.",
    "{jugador_turno}, actúa una escena de telenovela romántica con {jugador_atraccion}. Si no es dramática, ambos toman 1 shot.",
    "{jugador_turno}, haz un baile sensual para {jugador_atraccion} por 2 minutos. Si no impresionas, toma 2 shots.",
    "{jugador_turno}, imita cómo conquistarías a {jugador_atraccion} en un bar. Si no convences, toma 1 shot.",
    "Todos: Cada uno debe decir qué es lo más sexy de {jugador_turno}. Si alguien repite una respuesta, {jugador_turno} toma 1 shot por repetición.",
    "{jugador_turno}, elige a alguien para un baile pegadito. Si no lo haces con estilo, toma 1 shot.",
    "{jugador_turno}, cuenta qué es lo más atrevido que has hecho por conquistar a alguien. Si no sorprendes al grupo, toma 2 shots.",
    "Todos: Hagan una coreografía sexy dirigida por {jugador_turno}. Si no está coordinada, todos toman 1 shot.",
    "{jugador_turno}, actúa como si estuvieras conquistando en una cita. If no haces reír al grupo, toma 2 shots.",
    "{jugador_turno}, da un cumplido subido de tono a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, haz un guiño seductor a cada jugador. Si alguien no te devuelve el guiño, toma 1 shot por cada uno.",
    "{jugador_turno} y {jugador_atraccion}, intercambien una prenda de ropa por el resto del juego. Si no lo hacen, ambos toman 1 shot.",
    "{jugador_turno}, describe cómo sería una noche romántica con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "Todos: Digan a la cuenta de 3 qué tan atractivo es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, haz un movimiento de baile sexy inspirado en una película. Si no lo reconocen, toma 1 shot.",
    "{jugador_turno}, susurra un secreto atrevido a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "{jugador_turno}, imita un acento seductor por 30 segundos. Si nadie lo reconoce, toma 1 shot.",
    "{jugador_turno} y {jugador_atraccion}, hagan un duelo de miradas sensuales. El que parpadea primero toma 1 shot.",
    "Grupo: Hagan una ronda de cumplidos subidos de tono para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, cuenta cómo sería tu cita soñada con {jugador_atraccion}. Si no es creativa, toma 2 shots.",
    "{jugador_turno}, haz un brindis seductor dedicado a {jugador_atraccion}. Si no aplauden, toma 1 shot.",
    "{jugador_turno}, imita una escena romántica de película con {jugador_random}. Si no es convincente, ambos toman 1 shot.",
    "Todos: Cada uno describe un gesto sexy de {jugador_turno}. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, baila lentamente con {jugador_atraccion} por 1 minuto. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, describe qué te atrae físicamente de {jugador_atraccion}. Si no es específico, toma 1 shot.",
    "{jugador_turno}, canta una canción romántica mirando a {jugador_atraccion}. Si te equivocas, toma 1 shot.",
    "Grupo: Hagan una fila y pasen un mensaje subido de tono susurrando. Si el mensaje cambia, {jugador_turno} toma 2 shots.",
    "{jugador_turno}, actúa como si estuvieras en un reality de citas. Si no convences, toma 2 shots.",
    "{jugador_turno}, dile a {jugador_random} algo que te parezca sexy de su personalidad. Si no lo sorprendes, toma 1 shot.",
    "Todos: Digan qué canción dedicarían a {jugador_turno} para una noche romántica. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, haz un cumplido creativo a cada jugador. Si alguien no sonríe, toma 1 shot por cada uno.",
    "{jugador_turno}, describe cómo sería un encuentro romántico en la playa con {jugador_atraccion}. Si no es romántico, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, hagan una pose romántica para una foto imaginaria. Si no es convincente, ambos toman 1 shot.",
    "{jugador_turno}, confiesa un crush que hayas tenido en el pasado. Si no cuentas nada, toma 2 shots.",
    "Todos: Hagan un brindis subido de tono liderado por {jugador_turno}. Si alguien no brinda, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras coqueteando en un antro con {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno}, describe el outfit ideal para {jugador_atraccion} en una cita. Si no le gusta, toma 1 shot.",
    "Grupo: Cada uno dice qué tan buen besador creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, haz un baile improvisado con {jugador_random} al ritmo de una canción sexy. Si no está coordinado, ambos toman 1 shot.",
    "{jugador_turno}, susurra un cumplido subido de tono a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un viaje romántico con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "Todos: Hagan una coreografía romántica liderada por {jugador_turno}. Si alguien se equivoca, toma 1 shot.",
    "{jugador_turno}, imita cómo le pedirías una cita a {jugador_atraccion}. Si no es creativo, toma 1 shot.",
    "{jugador_turno}, canta un verso de una balada romántica a {jugador_atraccion}. Si te ríes, toma 1 shot.",
    "Grupo: Hagan una ronda de piropos para {jugador_turno}. Si alguien se traba, toma 1 shot.",
    "{jugador_turno}, describe un momento sexy que hayas vivido. Si no cuentas nada, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de baile subido de tono para {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, actúen una escena de conquista en un parque. Si no es romántica, ambos toman 1 shot.",
    "Todos: Digan qué tan seductor es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, describe cómo sería una cita perfecta en un bar con {jugador_atraccion}. Si no es creativa, toma 2 shots.",
    "{jugador_turno}, haz un cumplido atrevido a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "Grupo: Hagan un juego de mímica romántica liderado por {jugador_turno}. Si alguien no adivina, toma 1 shot.",
    "{jugador_turno}, canta una canción de amor con voz seductora. Si te ríes, toma 1 shot.",
    "{jugador_turno}, describe qué harías para impresionar a {jugador_atraccion} en una cita. Si no convences, toma 2 shots.",
    "Todos: Cada uno dice qué tan romántico creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, haz un baile lento con {jugador_atraccion} por 30 segundos. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, susurra algo romántico a {jugador_random}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras declarando tu amor a {jugador_atraccion}. Si no es convincente, toma 2 shots.",
    "Grupo: Hagan una ronda de cumplidos románticos para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un fin de semana romántico con {jugador_atraccion}. If no convences, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de conquista clásico frente a {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "Todos: Digan qué tan buen bailarín romántico es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, canta un verso de una canción sexy mirando a {jugador_atraccion}. Si te equivocas, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro romántico en un cine con {jugador_atraccion}. Si no es romántico, toma 2 shots.",
    "Grupo: Hagan una escena romántica improvisada con {jugador_turno} como director. Si alguien se sale del personaje, toma 1 shot.",
    "{jugador_turno}, haz un cumplido subido de tono a cada jugador. Si alguien no sonríe, toma 1 shot por cada uno.",
    "{jugador_turno}, actúa como si estuvieras coqueteando por mensaje con {jugador_atraccion}. Si no convences, toma 1 shot.",
    "Todos: Cada uno dice qué tan buen conquistador creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, describe un momento romántico ideal con {jugador_random}. Si no es creativo, toma 2 shots.",
    "{jugador_turno}, haz un baile sexy improvisado con {jugador_random}. Si no está coordinado, ambos toman 1 shot.",
    "{jugador_turno}, susurra un piropo atrevido a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "Grupo: Hagan un brindis romántico liderado por {jugador_turno}. Si alguien no brinda, toma 1 shot.",
    "{jugador_turno}, describe cómo sería una cita en un restaurante con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno}, haz una pose seductora para {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "Todos: Digan qué tan buen seductor es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, canta una canción romántica dedicándola a {jugador_atraccion}. Si te ríes, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro romántico bajo las estrellas con {jugador_atraccion}. Si no es romántico, toma 2 shots.",
    "Grupo: Hagan una coreografía romántica liderada por {jugador_turno}. Si alguien se equivoca, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras pidiendo matrimonio a {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno}, haz un cumplido romántico a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "Todos: Cada uno dice qué tan buen amante creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7.",
    "{jugador_turno}, describe cómo sería una cita romántica en un parque con {jugador_atraccion}. Si no es creativa, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de baile subido de tono con {jugador_random}. Si no impresionas, ambos toman 1 shot.",
    "{jugador_turno}, susurra algo sexy a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "Grupo: Hagan una ronda de piropos subidos de tono para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro romántico en un viaje con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno}, actúa como si estuvieras coqueteando en una playa con {jugador_atraccion}. Si no es convincente, toma 1 shot.",
    "Todos: Digan qué tan buen romántico es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 7."
  ];

  useEffect(() => {
    setIsLoaded(true)
    const jugadoresGuardados = localStorage.getItem('nopal_jugadores')
    if (jugadoresGuardados) {
      const jugadoresData = JSON.parse(jugadoresGuardados)
      const jugadoresConStats = jugadoresData.map((j: any) => ({
        ...j,
        participaciones: 0
      }))
      setJugadores(jugadoresConStats)
      
      // Inicializar array de retos disponibles (índices aleatorios)
      const indices = Array.from({ length: 19 }, (_, i) => i) // 0-18 (19 retos)
      const indicesAleatorios = indices.sort(() => Math.random() - 0.5)
      setRetosDisponibles(indicesAleatorios)
    } else {
      router.push('/pedacopa/jugadores')
    }
  }, [router])

  // Generar reto cuando hay jugadores y retos disponibles
  useEffect(() => {
    if (jugadores.length > 0 && retosDisponibles.length > 0 && retoActual <= 20) {
      generarReto()
    }
  }, [jugadores, retosDisponibles, retoActual])

  const generarReto = () => {
    if (retosDisponibles.length === 0) return
    
    // Tomar el primer reto disponible (ya están mezclados)
    const indiceReto = retosDisponibles[0]
    const plantilla = retosNivel2[indiceReto]
    let retoFinal = plantilla

    // Seleccionar jugador de turno (el que menos ha participado)
    const jugadorTurno = jugadores.reduce((prev, current) => 
      prev.participaciones <= current.participaciones ? prev : current
    )

    retoFinal = retoFinal.replace(/\{jugador_turno\}/g, jugadorTurno.nombre)

    // Seleccionar jugador random (diferente al de turno)
    const otrosJugadores = jugadores.filter(j => j.id !== jugadorTurno.id)
    if (otrosJugadores.length > 0) {
      const jugadorRandom = otrosJugadores[Math.floor(Math.random() * otrosJugadores.length)]
      retoFinal = retoFinal.replace(/\{jugador_random\}/g, jugadorRandom.nombre)
    }

    // Seleccionar jugador según atracción
    const jugadorAtraccion = obtenerJugadorAtraccion(jugadorTurno)
    if (jugadorAtraccion) {
      retoFinal = retoFinal.replace(/\{jugador_atraccion\}/g, jugadorAtraccion.nombre)
    }

    setReto(retoFinal)
  }

  const obtenerJugadorAtraccion = (jugador: Jugador): Jugador | null => {
    const candidatos = jugadores.filter(j => {
      if (j.id === jugador.id) return false
      
      if (jugador.preferencias === 'ambos') {
        return true
      } else if (jugador.preferencias === 'hombre') {
        return j.genero === 'hombre'
      } else if (jugador.preferencias === 'mujer') {
        return j.genero === 'mujer'
      }
      
      return false
    })

    return candidatos.length > 0 ? candidatos[Math.floor(Math.random() * candidatos.length)] : null
  }

  const siguienteReto = () => {
    // Incrementar participaciones del jugador actual antes de avanzar
    const jugadorTurno = jugadores.reduce((prev, current) => 
      prev.participaciones <= current.participaciones ? prev : current
    )
    
    setJugadores(prev => prev.map(j => 
      j.id === jugadorTurno.id 
        ? { ...j, participaciones: j.participaciones + 1 }
        : j
    ))

    // Mover el reto usado a retosUsados y quitarlo de disponibles
    if (retosDisponibles.length > 0) {
      const retoUsado = retosDisponibles[0]
      setRetosUsados(prev => [...prev, retoUsado])
      setRetosDisponibles(prev => prev.slice(1))
    }

    if (retoActual >= 20) {
      const statsNivel2 = {
        nivel: 2,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel2', JSON.stringify(statsNivel2))
      router.push('/pedacopa/niveles')
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (retoActual > 20) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-2xl mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-orange-500/30 to-red-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-yellow-900/60 via-orange-900/40 to-red-900/60 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Nivel Completado
                </span>
              </h1>
              <p className="text-orange-200 text-xl mb-8 leading-relaxed">
                El precopeo ha sido épico. Ya sonó la cumbia!
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg"
              >
                Continuar al Siguiente Nivel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600">
      
      {/* Fondo minimalista */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      </div>

      {/* Gradiente simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-yellow-900/20"></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header simplificado */}
        <header className={`p-6 md:p-8 bg-black/20 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  Precopeo
                </h1>
                <p className="text-yellow-300 font-medium">Ya sonó la cumbia</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-white">
                {retoActual}<span className="text-yellow-300 text-xl">/20</span>
              </div>
              <p className="text-yellow-200 text-sm">Retos</p>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-4xl">
            
            {/* Reto actual - diseño limpio */}
            <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400/15 via-orange-500/20 to-red-400/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-red-900/40 backdrop-blur-xl border border-orange-400/30 rounded-2xl shadow-2xl">
                  
                  {/* Header simple del reto */}
                  <div className="p-6 border-b border-orange-400/20">
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Reto #{retoActual}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Contenido del reto */}
                  <div className="p-6 md:p-8 lg:p-12">
                    <div className="bg-gradient-to-r from-orange-600/60 to-red-600/60 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6 md:p-8 lg:p-10">
                      <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-relaxed text-center break-words">
                        {reto}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles simplificados */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                
                {/* Botón salir */}
                <button 
                  onClick={() => router.push('/pedacopa/niveles')}
                  className="group bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm order-2 sm:order-1"
                >
                  <span className="flex items-center gap-2">
                    <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span>Salir</span>
                  </span>
                </button>

                {/* Botón completar */}
                <button 
                  onClick={siguienteReto}
                  className="group bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg order-1 sm:order-2"
                >
                  <span className="flex items-center gap-2">
                    <span>{retoActual >= 20 ? 'Finalizar Nivel' : 'Completado'}</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {retoActual >= 20 ? '🏆' : '✓'}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Barra de progreso simple */}
            <div className={`mt-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.9s'}}>
              <div className="text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-full h-2 bg-black/20 rounded-full border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(retoActual / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-orange-200 text-sm mt-2">
                    Progreso: {Math.round((retoActual / 20) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Nivel2Page() {
  return (
    <LevelProtection level={2}>
      <Nivel2Component />
    </LevelProtection>
  )
}