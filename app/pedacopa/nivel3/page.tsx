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

function Nivel3Component() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [retoActual, setRetoActual] = useState(1)
  const [reto, setReto] = useState('')
  const [retosDisponibles, setRetosDisponibles] = useState<number[]>([])
  const [retosUsados, setRetosUsados] = useState<number[]>([])

  const retosNivel3 = [
    "{jugador_turno}, dale un beso en el cuello a {jugador_atraccion} por 10 segundos. Si te detienes antes, toma 2 shots.",
    "{jugador_turno}, haz un lap dance de 2 minutos para {jugador_atraccion}. Si no es lo suficientemente sexy, toma 2 shots.",
    "{jugador_turno}, susúrrale tu fantasía más subida de tono al oído a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, dale un masaje sensual en las piernas a {jugador_atraccion} por 1 minuto. Si no lo haces con intensidad, toma 2 shots.",
    "{jugador_turno}, describe en detalle tu mejor experiencia íntima. Si no das suficientes detalles, toma 2 shots.",
    "{jugador_turno}, confiesa quién de este grupo te atrae para algo más esta noche. Si no confiesas, toma 3 shots.",
    "{jugador_turno}, cuenta tu experiencia sexual más salvaje. Si no sorprendes al grupo, toma 2 shots.",
    "{jugador_turno} y {jugador_atraccion}, dense un beso apasionado de 15 segundos. Si no lo hacen con pasión, ambos toman 1 shot.",
    "{jugador_turno}, quítale una prenda a {jugador_atraccion} usando solo los dientes. Si fallas, toma 2 shots.",
    "{jugador_turno}, dale de beber un shot del ombligo de {jugador_atraccion}. Si derramas, toma 1 shot.",
    "{jugador_turno}, seduce a {jugador_atraccion} como si fuera tu última noche en la tierra. Si no convences, toma 2 shots.",
    "{jugador_turno}, actúa una escena subida de tono con {jugador_atraccion} (solo actuación). Si no es creíble, ambos toman 1 shot.",
    "{jugador_turno}, convence a {jugador_atraccion} de quitarse una prenda usando solo palabras. Si no lo logras, toma 2 shots.",
    "{jugador_turno}, haz un striptease para {jugador_atraccion} hasta quedar en ropa interior. Si no impresionas, toma 2 shots.",
    "Todos: Cada uno debe confesar qué le haría a {jugador_turno} en un encuentro íntimo. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, elige a alguien para tocarlo sensualmente por 30 segundos. Si no lo haces con confianza, toma 1 shot.",
    "Todos: Hagan una ronda de besos rápidos, liderada por {jugador_turno}. Si alguien se niega, toma 1 shot.",
    "{jugador_turno}, cuenta la cosa más atrevida que has hecho en la intimidad. If no sorprendes, toma 2 shots.",
    "{jugador_turno}, haz que {jugador_atraccion} suspire usando solo tus manos. Si no lo logras, toma 1 shot.",
    "{jugador_turno}, elige a tu pareja para 7 minutos en el cielo. Si no eliges a alguien, toma 3 shots.",
    "{jugador_turno}, lame suavemente el lóbulo de la oreja de {jugador_atraccion}. Si no lo haces con cuidado, toma 1 shot.",
    "{jugador_turno} y {jugador_atraccion}, simulen una escena de seducción en una ducha (sin agua). Si no es creíble, ambos toman 1 shot.",
    "{jugador_turno}, describe cómo sería una noche apasionada con {jugador_atraccion}. Si no es detallada, toma 2 shots.",
    "Todos: Digan a la cuenta de 3 qué tan sensual es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, acaricia sensualmente la espalda de {jugador_atraccion} por 30 segundos. Si no lo haces con suavidad, toma 1 shot.",
    "{jugador_turno}, haz un baile subido de tono con {jugador_random} por 1 minuto. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, susurra algo subido de tono a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "{jugador_turno}, quítate una prenda y dásela a {jugador_atraccion}. Si no lo haces, toma 2 shots.",
    "Grupo: Hagan una ronda de cumplidos subidos de tono para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, besa a {jugador_atraccion} en la mejilla lentamente. Si no es sensual, toma 1 shot.",
    "{jugador_turno}, describe tu posición favorita con detalles. Si no convences al grupo, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, simulen una escena de masaje subido de tono. Si no es creíble, ambos toman 1 shot.",
    "Todos: Cada uno dice qué tan atrevido creen que es {jugador_turno} en la intimidad del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, haz un movimiento de baile erótico para {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno}, confiesa una fantasía que involucra a alguien del grupo. Si no confiesas, toma 2 shots.",
    "{jugador_turno}, toca sensualmente el brazo de {jugador_atraccion} por 20 segundos. Si no lo haces con confianza, toma 1 shot.",
    "Grupo: Hagan una cadena de susurros subidos de tono, empezando por {jugador_turno}. Si el mensaje cambia, {jugador_turno} toma 2 shots.",
    "{jugador_turno}, describe cómo sería un encuentro íntimo en un coche con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "{jugador_turno}, haz un guiño subido de tono a cada jugador. Si alguien no te lo devuelve, toma 1 shot por cada uno.",
    "Todos: Digan qué canción usarían para un momento íntimo con {jugador_turno}. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, besa la mano de {jugador_atraccion} de forma sensual. Si no lo haces con estilo, toma 1 shot.",
    "{jugador_turno}, describe un encuentro subido de tono en un hotel con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, hagan una pose sensual juntos. Si no es convincente, ambos toman 1 shot.",
    "Grupo: Hagan una coreografía subida de tono liderada por {jugador_turno}. Si alguien se equivoca, toma 1 shot.",
    "{jugador_turno}, susurra algo pervertido a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras seduciendo a {jugador_atraccion} en un club. Si no impresionas, toma 2 shots.",
    "Todos: Cada uno dice qué tan buen amante creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, acaricia el cabello de {jugador_atraccion} sensualmente. Si no lo haces con suavidad, toma 1 shot.",
    "{jugador_turno}, describe cómo sería una noche loca con {jugador_random}. Si no es atrevida, toma 2 shots.",
    "{jugador_turno}, haz un baile lento y subido de tono con {jugador_atraccion}. Si no están sincronizados, ambos toman 1 shot.",
    "Grupo: Hagan un brindis subido de tono liderado por {jugador_turno}. Si alguien no brinda, toma 1 shot.",
    "{jugador_turno}, confiesa un fetiche secreto. Si no confiesas, toma 2 shots.",
    "{jugador_turno}, besa el hombro de {jugador_atraccion} lentamente. Si no es sensual, toma 1 shot.",
    "Todos: Digan qué tan seductor es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, describe un encuentro íntimo en una playa con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de conquista subido de tono frente a {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, simulen una escena de seducción en un bar. Si no es creíble, ambos toman 1 shot.",
    "Grupo: Hagan una ronda de piropos subidos de tono para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro íntimo en un jacuzzi con {jugador_atraccion}. If no convences, toma 2 shots.",
    "{jugador_turno}, toca sensualmente la mano de {jugador_atraccion} por 20 segundos. Si no lo haces con confianza, toma 1 shot.",
    "Todos: Cada uno dice qué tan apasionado creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, haz un baile subido de tono con {jugador_random} por 1 minuto. Si no está coordinado, ambos toman 1 shot.",
    "{jugador_turno}, susurra algo subido de tono a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "{jugador_turno}, describe cómo sería una noche íntima en un bosque con {jugador_atraccion}. Si no es creativa, toma 2 shots.",
    "Grupo: Hagan una escena subida de tono improvisada con {jugador_turno} como director. Si alguien se sale del personaje, toma 1 shot.",
    "{jugador_turno}, besa la frente de {jugador_atraccion} de forma sensual. Si no lo haces con estilo, toma 1 shot.",
    "Todos: Digan qué tan buen besador creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, describe un encuentro íntimo en un elevador con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de baile subido de tono para {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, simulen una escena de seducción en una discoteca. Si no es creíble, ambos toman 1 shot.",
    "Grupo: Hagan una cadena de caricias sensuales, empezando por {jugador_turno}. Si alguien se detiene, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro íntimo en una azotea con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "{jugador_turno}, susurra algo subido de tono a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "Todos: Cada uno dice qué tan pervertido creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, acaricia sensualmente el cuello de {jugador_atraccion}. Si no lo haces con suavidad, toma 1 shot.",
    "{jugador_turno}, describe un encuentro íntimo en un cine con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "{jugador_turno}, haz un baile subido de tono con {jugador_random} por 30 segundos. Si no están sincronizados, ambos toman 1 shot.",
    "Grupo: Hagan un brindis subido de tono liderado por {jugador_turno}. Si alguien no brinda, toma 1 shot.",
    "{jugador_turno}, confiesa una experiencia íntima que nunca hayas contado. Si no confiesas, toma 2 shots.",
    "{jugador_turno}, besa la muñeca de {jugador_atraccion} sensualmente. Si no lo haces con estilo, toma 1 shot.",
    "Todos: Digan qué tan buen seductor creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, describe un encuentro íntimo en un tren con {jugador_atraccion}. Si no convences, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de conquista subido de tono frente a {jugador_atraccion}. Si no impresionas, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, simulen una escena de seducción en una piscina. Si no es creíble, ambos toman 1 shot.",
    "Grupo: Hagan una ronda de cumplidos subidos de tono para {jugador_turno}. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, describe cómo sería un encuentro íntimo en un club privado con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "{jugador_turno}, toca sensualmente la mejilla de {jugador_atraccion}. Si no lo haces con confianza, toma 1 shot.",
    "Todos: Cada uno dice qué tan apasionado creen que es {jugador_turno} en la intimidad del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, haz un baile subido de tono con {jugador_atraccion} por 1 minuto. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, susurra algo pervertido a {jugador_random}. Si no se sorprende, toma 1 shot.",
    "{jugador_turno}, describe cómo sería una noche íntima en un yate con {jugador_atraccion}. If no convences, toma 2 shots.",
    "Grupo: Hagan una escena subida de tono improvisada con {jugador_turno} como protagonista. Si alguien se sale del personaje, toma 1 shot.",
    "{jugador_turno}, besa sensualmente el dorso de la mano de {jugador_atraccion}. Si no lo haces con estilo, toma 1 shot.",
    "Todos: Digan qué tan buen amante creen que es {jugador_turno} del 1 al 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, describe un encuentro íntimo en una cabaña con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "{jugador_turno}, haz un movimiento de baile subido de tono para {jugador_random}. Si no impresionas, toma 1 shot."
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
    const plantilla = retosNivel3[indiceReto]
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

    // Seleccionar jugador según atracción (MUY IMPORTANTE en nivel 3)
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
      const statsNivel3 = {
        nivel: 3,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel3', JSON.stringify(statsNivel3))
      router.push('/pedacopa/niveles')
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (retoActual > 20) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-2xl mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400/20 via-pink-500/30 to-purple-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-red-900/60 via-pink-900/40 to-purple-900/60 backdrop-blur-xl border border-red-400/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                  Nivel Completado
                </span>
              </h1>
              <p className="text-red-200 text-xl mb-8 leading-relaxed">
                La hora del desmadre fue épica. Shots y decisiones malas cumplidas!
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-400 hover:via-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg"
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-purple-600">
      
      {/* Fondo minimalista */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      </div>

      {/* Gradiente simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-red-900/20"></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header simplificado */}
        <header className={`p-6 md:p-8 bg-black/20 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  La Hora del Desmadre
                </h1>
                <p className="text-red-300 font-medium">Shots y decisiones malas</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-white">
                {retoActual}<span className="text-red-300 text-xl">/20</span>
              </div>
              <p className="text-red-200 text-sm">Retos</p>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-4xl">
            
            {/* Reto actual - diseño limpio */}
            <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-red-400/15 via-pink-500/20 to-purple-400/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-red-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-xl border border-red-400/30 rounded-2xl shadow-2xl">
                  
                  {/* Header simple del reto */}
                  <div className="p-6 border-b border-red-400/20">
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Reto #{retoActual}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Contenido del reto */}
                  <div className="p-6 md:p-8 lg:p-12">
                    <div className="bg-gradient-to-r from-red-600/60 to-pink-600/60 backdrop-blur-sm border border-red-400/30 rounded-xl p-6 md:p-8 lg:p-10">
                      <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-relaxed text-center break-words">
                        {reto}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles simplificados - SOLO 2 BOTONES */}
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
                  className="group bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-400 hover:via-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg order-1 sm:order-2"
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
                      className="h-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(retoActual / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-red-200 text-sm mt-2">
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

export default function Nivel3Page() {
  return (
    <LevelProtection level={3}>
      <Nivel3Component />
    </LevelProtection>
  )
}