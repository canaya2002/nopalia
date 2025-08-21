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

function Nivel4Component() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [retoActual, setRetoActual] = useState(1)
  const [reto, setReto] = useState('')
  const [retosDisponibles, setRetosDisponibles] = useState<number[]>([])
  const [retosUsados, setRetosUsados] = useState<number[]>([])

  const retosNivel4 = [
    "{jugador_turno}, haz un striptease completo hasta quedar en ropa interior para {jugador_atraccion}. Si no lo haces con confianza, toma 3 shots.",
    "{jugador_turno}, quítate una prenda cada vez que {jugador_atraccion} te diga algo sexy. Si te niegas, toma 2 shots por prenda.",
    "{jugador_turno}, elige: quítate 2 prendas o haz todo lo que {jugador_atraccion} te pida por 5 minutos. Si no eliges, toma 3 shots.",
    "{jugador_turno}, intercambia toda tu ropa superior con {jugador_atraccion}. Si no lo haces, ambos toman 2 shots.",
    "{jugador_turno}, bebe un shot del pecho/abdomen de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "{jugador_turno}, {jugador_atraccion} debe verter alcohol en tu cuerpo y lamerlo todo. Si no lo hace completo, ambos toman 2 shots.",
    "{jugador_turno}, haz body shots con {jugador_atraccion} - 3 rondas seguidas. Si no completas las 3, toma 1 shot por cada ronda fallida.",
    "{jugador_turno}, bebe tequila del ombligo de {jugador_atraccion} sin usar las manos. Si usas las manos, toma 2 shots.",
    "{jugador_turno}, describe en detalle qué le harías a {jugador_atraccion} si estuvieran solos ahora. Si no es lo suficientemente subido de tono, toma 2 shots.",
    "{jugador_turno}, confiesa tu kink más extremo y demuéstralo con {jugador_atraccion}. Si no lo demuestras, toma 3 shots.",
    "{jugador_turno}, cuenta tu experiencia sexual más salvaje y actúala con {jugador_atraccion} (solo actuación). Si no es convincente, ambos toman 2 shots.",
    "{jugador_turno}, confiesa cuál es tu parte favorita del cuerpo de {jugador_atraccion} y bésala suavemente. Si no lo haces, toma 2 shots.",
    "{jugador_turno}, dale un masaje erótico completo a {jugador_atraccion} por 5 minutos. Si no es sensual, toma 2 shots.",
    "{jugador_turno} y {jugador_atraccion}, simulen hacer el amor por 2 minutos (con ropa). Si no es creíble, ambos toman 2 shots.",
    "{jugador_turno}, haz que {jugador_atraccion} gima de placer usando solo tus manos. Si no lo logras, toma 2 shots.",
    "{jugador_turno}, seduce a {jugador_atraccion} hasta que te suplique por más. Si no lo consigues, toma 3 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige - beso francés de 30 segundos con {jugador_atraccion} o quítate toda la ropa superior. Si no eliges, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, haz un lap dance desnudo/a hasta la cintura para {jugador_atraccion}. Si no impresionas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno} y {jugador_atraccion}, 7 minutos en el cielo AHORA (busquen un cuarto). Si no van, ambos toman 3 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot de la parte del cuerpo de {jugador_atraccion} que él/ella elija. Si te niegas, toma 3 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un duelo de striptease con {jugador_atraccion}. El que se detenga primero toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa tu fantasía más secreta con alguien del grupo. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono a {jugador_random} por 3 minutos. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, elige verdad (confiesa tu encuentro más subido de tono) o reto (baila desnudo/a por 1 minuto). Si no eliges, toma 3 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} vierta un shot en tu cuerpo y lo beba. Si no lo permites, toma 2 shots.",
    "{jugador_turno}, besa apasionadamente a {jugador_atraccion} por 20 segundos. Si no es apasionado, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, quítate una prenda por cada cumplido subido de tono que {jugador_atraccion} te haga. Si te niegas, toma 1 shot por cumplido.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_random}, hagan un duelo de baile erótico; el perdedor se quita 2 prendas. Si hay empate, ambos toman 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa la cosa más atrevida que has hecho en la intimidad. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje en los pies de {jugador_atraccion} con un toque sensual. Si no lo haces bien, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe tu noche ideal con {jugador_atraccion}) o reto (baila en ropa interior). Si no eliges, toma 3 shots.",
    "{jugador_turno}, lame lentamente el cuello de {jugador_atraccion}. Si no lo haces con sensualidad, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del hombro de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona que él/ella elija o quítate una prenda. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un striptease lento para el grupo. Por cada prenda que no te quites, toma 1 shot.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo has fantaseado. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_atraccion}, den masajes mutuos por 2 minutos. Si no lo hacen con intensidad, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu fetiche más extremo) o reto (toca sensualmente a {jugador_atraccion} por 30 segundos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, susurra algo extremadamente subido de tono a {jugador_atraccion}. Si no se sonroja, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del muslo de {jugador_atraccion}. Si no lo haces, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, haz un baile erótico con {jugador_random} por 1 minuto. Si no está sincronizado, ambos toman 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, quítate una prenda por cada piropo subido de tono que el grupo te dé. Si te niegas, toma 1 shot por piropo.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa una experiencia íntima que nunca hayas contado. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje en la espalda de {jugador_atraccion} con un toque erótico. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe un encuentro subido de tono con {jugador_random}) o reto (baila en ropa interior por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa sensualmente el abdomen de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_random} beba un shot de tu clavícula. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 30 segundos de besos apasionados con {jugador_atraccion} o quítate 2 prendas. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_atraccion}, hagan un duelo de striptease; el primero en detenerse toma 3 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa tu mayor fantasía con {jugador_atraccion}. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los hombros de {jugador_random}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu encuentro más salvaje) o reto (toca sensualmente a {jugador_atraccion} por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, lame el lóbulo de la oreja de {jugador_atraccion} lentamente. Si no lo haces con sensualidad, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del cuello de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona subida de tono o quítate toda la ropa superior. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un striptease hasta quedar en ropa interior frente al grupo. Por cada prenda que no te quites, toma 1 shot.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo tendrías un encuentro esta noche. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_atraccion}, den masajes mutuos en zonas subidas de tono por 2 minutos. Si no lo hacen, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe tu fantasía más extrema con {jugador_atraccion}) o reto (baila desnudo/a hasta la cintura). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa apasionadamente a {jugador_atraccion} por 30 segundos. Si no es apasionado, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu pecho/abdomen. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, haz un lap dance subido de tono para {jugador_random} por 2 minutos. Si no impresionas, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_random}, hagan un duelo de baile erótico; el perdedor se quita 3 prendas. Si hay empate, ambos toman 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un fetiche secreto que tengas. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje erótico en los muslos de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa un encuentro subido de tono con alguien del grupo) o reto (toca sensualmente a {jugador_random} por 30 segundos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, susurra algo extremadamente subido de tono a {jugador_random}. Si no se sonroja, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot de la parte del cuerpo de {jugador_random} que él/ella elija. Si te niegas, toma 3 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 1 minuto de besos apasionados con {jugador_atraccion} o quítate toda la ropa inferior. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un striptease completo frente al grupo. Por cada prenda que no te quites, toma 1 shot.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa tu fantasía más subida de tono con alguien del grupo. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en el cuello de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe tu noche más loca) o reto (baila en ropa interior por 2 minutos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa sensualmente la espalda de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_random} beba un shot de tu muslo. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona subida de tono o haz un lap dance para el grupo. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_atraccion}, hagan un duelo de striptease; el primero en detenerse toma 3 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo has tenido un sueño subido de tono. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_random}, den masajes mutuos en zonas subidas de tono por 2 minutos. Si no lo hacen, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu experiencia más extrema) o reto (toca sensualmente a {jugador_atraccion} por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, lame lentamente el hombro de {jugador_atraccion}. Si no lo haces con sensualidad, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del abdomen de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 30 segundos de besos apasionados con {jugador_random} o quítate toda la ropa superior. Si no eliges, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un striptease hasta quedar en ropa interior frente a {jugador_atraccion}. Por cada prenda que no te quites, toma 1 shot.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa tu mayor fantasía subida de tono. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje erótico en la espalda de {jugador_random}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe un encuentro subido de tono con {jugador_atraccion}) o reto (baila desnudo/a hasta la cintura). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa apasionadamente a {jugador_random} por 20 segundos. Si no es apasionado, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu cuello. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, haz un lap dance subido de tono para {jugador_atraccion} por 2 minutos. Si no impresionas, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_random}, hagan un duelo de baile erótico; el perdedor se quita 3 prendas. Si hay empate, ambos toman 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo tendrías una noche salvaje. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los muslos de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu fetiche más subido de tono) o reto (toca sensualmente a {jugador_random} por 1 minuto). Si no eliges, toma 3 shots.",
    "AFTER SALVAJE COMPLETADO: {jugador_turno}, elige a tu pareja para la noche y dense un beso de despedida épico. Si no eliges, toma 3 shots."
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
    const plantilla = retosNivel4[indiceReto]
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

    // Seleccionar jugador según atracción (MUY IMPORTANTE en nivel 4)
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
      const statsNivel4 = {
        nivel: 4,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel4', JSON.stringify(statsNivel4))
      router.push('/pedacopa/niveles')
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (retoActual > 20) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-2xl mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-violet-500/30 to-fuchsia-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-purple-900/60 via-violet-900/40 to-fuchsia-900/60 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                  Nivel Completado
                </span>
              </h1>
              <p className="text-purple-200 text-xl mb-8 leading-relaxed">
                El after salvaje fue épico. ¡Calor, ligues fuertes, nadie quiere irse!
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 hover:from-purple-400 hover:via-violet-400 hover:to-fuchsia-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg"
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600">
      
      {/* Fondo minimalista */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      </div>

      {/* Gradiente simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-purple-900/20"></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header simplificado */}
        <header className={`p-6 md:p-8 bg-black/20 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  El After Salvaje
                </h1>
                <p className="text-purple-300 font-medium">¿Quién trajo al ex?</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-white">
                {retoActual}<span className="text-purple-300 text-xl">/20</span>
              </div>
              <p className="text-purple-200 text-sm">Retos</p>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-4xl">
            
            {/* Reto actual - diseño limpio */}
            <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/15 via-violet-500/20 to-fuchsia-400/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-purple-900/40 via-violet-900/30 to-fuchsia-900/40 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl">
                  
                  {/* Header simple del reto */}
                  <div className="p-6 border-b border-purple-400/20">
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Reto #{retoActual}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Contenido del reto */}
                  <div className="p-6 md:p-8 lg:p-12">
                    <div className="bg-gradient-to-r from-purple-600/60 to-violet-600/60 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 lg:p-10">
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
                  className="group bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 hover:from-purple-400 hover:via-violet-400 hover:to-fuchsia-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg order-1 sm:order-2"
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
                      className="h-full bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(retoActual / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-purple-200 text-sm mt-2">
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

export default function Nivel4Page() {
  return (
    <LevelProtection level={4}>
      <Nivel4Component />
    </LevelProtection>
  )
}