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

function Nivel5Component() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [retoActual, setRetoActual] = useState(1)
  const [reto, setReto] = useState('')
  const [retosDisponibles, setRetosDisponibles] = useState<number[]>([])
  const [retosUsados, setRetosUsados] = useState<number[]>([])

  const retosNivel5 = [
    "Jugador {jugador_turno} debe dar sexo oral a jugador {jugador_atraccion} durante 3 minutos.",
    "Jugador {jugador_turno} debe lamer el cuerpo completo de jugador {jugador_atraccion} lentamente por 2 minutos.",
    "Jugador {jugador_turno} debe sentarse desnudo en el regazo de jugador {jugador_atraccion} y moverse sensualmente durante 4 minutos.",
    "Jugador {jugador_turno} debe masturbar a jugador {jugador_atraccion} hasta que esté muy excitado, pero sin permitirle terminar.",
    "Jugador {jugador_turno} y jugador {jugador_atraccion} deben besarse apasionadamente con lengua por 3 minutos sin separarse.",
    "Jugador {jugador_turno} debe usar la boca en los pezones de jugador {jugador_atraccion} durante 2 minutos.",
    "Jugador {jugador_turno} debe tocar las partes íntimas de jugador {jugador_atraccion} mientras lo besa por 3 minutos.",
    "Jugador {jugador_turno} debe ponerse de rodillas frente a jugador {jugador_atraccion} y provocarlo con la boca por 2 minutos.",
    "Jugador {jugador_turno} y jugador {jugador_atraccion} deben desnudarse completamente y abrazarse cuerpo a cuerpo por 3 minutos.",
    "Jugador {jugador_turno} debe montar a jugador {jugador_atraccion} (sin penetración) y moverse como si estuvieran teniendo sexo por 4 minutos.",
    "Jugador {jugador_turno} debe masturbarse frente a todos por 2 minutos.",
    "Jugador {jugador_turno} y jugador {jugador_atraccion} deben hacer un 69 durante 3 minutos.",
    "Jugador {jugador_turno} debe dejar que jugador {jugador_atraccion} lo acaricie íntimamente mientras se besan por 2 minutos.",
    "Jugador {jugador_turno} debe chupar los dedos de jugador {jugador_atraccion} como si fueran algo más, durante 2 minutos.",
    "Jugador {jugador_turno} debe dar sexo oral a jugador {jugador_atraccion} hasta que esté al borde del orgasmo.",
    "Jugador {jugador_turno} y jugador {jugador_atraccion} deben probar diferentes posiciones sexuales (sin penetración) durante 3 minutos.",
    "Jugador {jugador_turno} debe masturbar a jugador {jugador_atraccion} frente al resto durante 3 minutos.",
    "Jugador {jugador_turno} debe permitir que jugador {jugador_atraccion} lo bese y lo acaricie bajo la ropa por 2 minutos.",
    "Jugador {jugador_turno} debe lamer lentamente entre las piernas de jugador {jugador_atraccion} durante 2 minutos.",
    "Jugador {jugador_turno} y jugador {jugador_atraccion} deben intentar excitarse mutuamente sin tocarse directamente por 3 minutos.",
    "{jugador_turno}, haz un striptease hasta quedar en ropa interior para {jugador_atraccion}. Si no lo haces con pasión, toma 3 shots.",
    "{jugador_turno}, susurra tu fantasía más atrevida al oído de {jugador_atraccion}. Si no se sonroja, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa apasionadamente a {jugador_atraccion} por 30 segundos o quítate toda la ropa superior. Si no eliges, toma 3 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del cuello de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu fantasía más subida de tono con {jugador_atraccion}) o reto (baila en ropa interior por 2 minutos). Si no eliges, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje sensual en la espalda de {jugador_atraccion} por 2 minutos. Si no es intenso, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_atraccion}, duelo de striptease; el primero en detenerse toma 3 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, revela con quién del grupo has tenido un sueño subido de tono. Si no confiesas, toma 3 shots.",
    "{jugador_turno}, acaricia sensualmente el brazo de {jugador_atraccion} por 30 segundos. Si te detienes, toma 2 shots.",
    "{jugador_turno}, describe una noche candente en una suite de lujo con {jugador_atraccion}. Si no es atrevida, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu clavícula. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 1 minuto de caricias sensuales con {jugador_atraccion} o quítate toda la ropa inferior. Si no eliges, toma 3 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu experiencia más atrevida) o reto (toca sensualmente a {jugador_atraccion} por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa lentamente el hombro de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un fetiche secreto que tengas. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los muslos de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "STRIP CHALLENGE: {jugador_turno}, haz un lap dance subido de tono para {jugador_atraccion} por 2 minutos. Si no impresionas, toma 2 shots.",
    "Todos: Califiquen a la cuenta de 3 qué tan seductor es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, actúa una escena de seducción en un jacuzzi con {jugador_atraccion} (con ropa). Si no convence, ambos toman 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del abdomen de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona atrevida o haz un striptease para el grupo. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro subido de tono en una playa con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo tendrías una aventura esta noche. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_atraccion}, den masajes mutuos subidos de tono por 2 minutos. Si no lo hacen, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe tu noche más loca) o reto (baila en ropa interior por 2 minutos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, lame lentamente el lóbulo de la oreja de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu muslo. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 30 segundos de besos apasionados con {jugador_random} o quítate toda la ropa superior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro candente en un club con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "Todos: Digan qué tan apasionado creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, besa sensualmente la muñeca de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un sueño subido de tono que hayas tenido. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en el cuello de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu fetiche más subido de tono) o reto (toca sensualmente a {jugador_atraccion} por 30 segundos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, haz un baile erótico con {jugador_atraccion} por 1 minuto. Si no están sincronizados, ambos toman 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del pecho de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 1 minuto de caricias sensuales con {jugador_atraccion} o quítate toda la ropa inferior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro subido de tono en un elevador con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "Todos: Digan qué tan buen besador creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, acaricia sensualmente la espalda de {jugador_atraccion} por 30 segundos. Si te detienes, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo has fantaseado algo atrevido. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los pies de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe un encuentro subido de tono con {jugador_random}) o reto (baila en ropa interior por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa sensualmente el abdomen de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_random} beba un shot de tu cuello. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona subida de tono o haz un lap dance para el grupo. Si no eliges, toma 3 shots.",
    "STRIP CHALLENGE: {jugador_turno} y {jugador_random}, duelo de baile erótico; el perdedor quita 3 prendas o toma 3 shots.",
    "{jugador_turno}, susurra algo extremadamente subido de tono a {jugador_atraccion}. Si no se sonroja, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa tu mayor fantasía con {jugador_atraccion}. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los hombros de {jugador_random}. Si no es sensual, toma 2 shots.",
    "{jugador_turno}, describe un encuentro candente en un cine con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "Todos: Digan qué tan buen amante creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, lame lentamente la clavícula de {jugador_atraccion}. Si no lo haces con sensualidad, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del muslo de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 30 segundos de besos apasionados con {jugador_atraccion} o quítate toda la ropa superior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, actúa una escena de seducción en una discoteca con {jugador_atraccion} (con ropa). Si no convence, ambos toman 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un fetiche secreto que nunca hayas contado. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_atraccion}, den masajes mutuos en zonas atrevidas por 2 minutos. Si no lo hacen, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu experiencia más subida de tono) o reto (toca sensualmente a {jugador_random} por 30 segundos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa sensualmente la mano de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu abdomen. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 1 minuto de caricias sensuales con {jugador_random} o quítate toda la ropa inferior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro subido de tono en un yate con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "Todos: Digan qué tan atrevido creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, acaricia sensualmente el cabello de {jugador_atraccion} por 30 segundos. Si te detienes, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo has tenido una fantasía atrevida. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en el cuello de {jugador_random}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe un encuentro candente con {jugador_atraccion}) o reto (baila en ropa interior por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, besa sensualmente la espalda de {jugador_atraccion}. Si no lo haces con estilo, toma HM2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del hombro de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona subida de tono o haz un lap dance para el grupo. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro candente en un hotel con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "Todos: Digan qué tan apasionado creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, lame lentamente el cuello de {jugador_atraccion}. Si no lo haces con sensualidad, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un sueño subido de tono con {jugador_atraccion}. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los muslos de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu noche más salvaje) o reto (toca sensualmente a {jugador_atraccion} por 1 minuto). Si no eliges, toma 3 shots.",
    "{jugador_turno}, actúa una escena de seducción en un bar con {jugador_atraccion} (con ropa). Si no convence, ambos toman 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_random} beba un shot de tu muslo. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 30 segundos de besos apasionados con {jugador_atraccion} o quítate toda la ropa superior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro subido de tono en un bosque con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "Todos: Digan qué tan buen seductor creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, besa sensualmente el dorso de la mano de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa con quién del grupo tendrías una noche loca. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno}, da un masaje subido de tono en los pies de {jugador_atraccion}. Si no es sensual, toma 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (confiesa tu experiencia más subida de tono) o reto (baila en ropa interior por 2 minutos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, acaricia sensualmente el rostro de {jugador_atraccion} por 30 segundos. Si te detienes, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, bebe un shot del pecho de {jugador_atraccion}. Si derramas, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: 1 minuto de caricias sensuales con {jugador_atraccion} o quítate toda la ropa inferior. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro candente en un tren con {jugador_atraccion}. Si no es atrevido, toma 2 shots.",
    "Todos: Digan qué tan buen amante creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    "{jugador_turno}, besa sensualmente la clavícula de {jugador_atraccion}. Si no lo haces con estilo, toma 2 shots.",
    "CONFESIONES PROHIBIDAS: {jugador_turno}, confiesa un fetiche secreto que tengas. Si no confiesas, toma 3 shots.",
    "MASSAGE ROULETTE: {jugador_turno} y {jugador_random}, den masajes mutuos subidos de tono por 2 minutos. Si no lo hacen, ambos toman 2 shots.",
    "TRUTH OR DARE EXTREMO: {jugador_turno}, verdad (describe un encuentro subido de tono con {jugador_atraccion}) o reto (toca sensualmente a {jugador_random} por 30 segundos). Si no eliges, toma 3 shots.",
    "{jugador_turno}, lame lentamente el hombro de {jugador_atraccion}. Si no lo haces con sensualidad, toma 2 shots.",
    "CHUPITO CHALLENGE: {jugador_turno}, deja que {jugador_atraccion} beba un shot de tu abdomen. Si no lo permites, toma 2 shots.",
    "JENGA ERÓTICA: {jugador_turno}, elige: besa a {jugador_atraccion} en una zona atrevida o haz un striptease para el grupo. Si no eliges, toma 3 shots.",
    "{jugador_turno}, describe un encuentro candente en una azotea con {jugador_atraccion}. Si no es creativo, toma 2 shots.",
    "Todos: Digan qué tan apasionado creen que es {jugador_turno} de 1 a 10. {jugador_turno} toma 1 shot por cada voto menor a 8.",
    
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
    const plantilla = retosNivel5[indiceReto]
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
      const statsNivel5 = {
        nivel: 5,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel5', JSON.stringify(statsNivel5))
      router.push('/pedacopa/niveles')
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (retoActual > 20) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-2xl mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400/20 via-gray-500/30 to-red-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80 backdrop-blur-xl border border-red-400/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-red-200 to-gray-200 bg-clip-text text-transparent">
                  Mictlán Completado
                </span>
              </h1>
              <p className="text-red-200 text-xl mb-8 leading-relaxed">
                Lo que pasó aquí... se queda aquí para siempre. Fue épico.
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="bg-gradient-to-r from-red-500 via-gray-600 to-red-500 hover:from-red-400 hover:via-gray-500 hover:to-red-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg"
              >
                Escapar del Mictlán
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      
      {/* Fondo minimalista */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      </div>

      {/* Gradiente simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-gray-900/20"></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header simplificado */}
        <header className={`p-6 md:p-8 bg-black/40 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-red-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  El Mictlán del Crudo
                </h1>
                <p className="text-red-300 font-medium">Lo que pasa en Nopal, se queda en Nopal</p>
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
                <div className="absolute -inset-3 bg-gradient-to-r from-red-400/15 via-gray-500/20 to-red-400/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-900/60 backdrop-blur-xl border border-red-400/30 rounded-2xl shadow-2xl">
                  
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
                    <div className="bg-gradient-to-r from-gray-800/60 to-red-800/60 backdrop-blur-sm border border-red-400/30 rounded-xl p-6 md:p-8 lg:p-10">
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
                  className="group bg-gradient-to-r from-red-500 via-gray-600 to-red-500 hover:from-red-400 hover:via-gray-500 hover:to-red-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg order-1 sm:order-2"
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
                      className="h-full bg-gradient-to-r from-red-400 via-gray-500 to-red-400 rounded-full transition-all duration-1000"
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

export default function Nivel5Page() {
  return (
    <LevelProtection level={5}>
      <Nivel5Component />
    </LevelProtection>
  )
}