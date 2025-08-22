'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Jugador {
  id: string
  nombre: string
  genero: 'hombre' | 'mujer'
  preferencias: 'hombre' | 'mujer' | 'ambos'
  participaciones: number
}

export default function Nivel1Page() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [retoActual, setRetoActual] = useState(1)
  const [reto, setReto] = useState('')
  const [retosDisponibles, setRetosDisponibles] = useState<number[]>([])
  const [retosUsados, setRetosUsados] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const retosNivel1 = [
    "{jugador_turno}, cuenta una anécdota divertida de tu infancia. Si no logras hacer reír a todos, toma 2 shots.",
    "{jugador_turno}, imita a {jugador_random} por 30 segundos. Si alguien no adivina a quién imitas, toma 1 shot.",
    "{jugador_turno}, describe tu primera impresión de {jugador_random}. Si {jugador_random} no está de acuerdo, toma 2 shots.",
    "{jugador_turno}, canta 'Las Mañanitas' como mariachi. Si te equivocas en la letra, toma 1 shot.",
    "{jugador_turno}, cuenta tu mayor logro del último año. Si todos no aplauden, toma 2 shots.",
    "{jugador_turno}, dile un piropo creativo a {jugador_atraccion}. Si no se sonroja, toma 1 shot.",
    "Todos: Cada uno diga una cualidad de {jugador_turno}. Si alguien repite una cualidad, {jugador_turno} toma 1 shot por cada repetición.",
    "{jugador_turno} y {jugador_random}, hagan un saludo secreto. Si no lo terminan en 10 segundos, ambos toman 1 shot.",
    "{jugador_turno}, ¿cuál ha sido tu momento más vergonzoso? Si no cuentas nada, toma 2 shots.",
    "Todos: Imiten a {jugador_turno} por 30 segundos. Si {jugador_turno} no se ríe, toma 2 shots.",
    "{jugador_turno}, describe tu cita ideal con {jugador_atraccion}. Si no logras convencer a todos, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, cuenten hasta 20 alternando. Si se equivocan, ambos toman 1 shot.",
    "{jugador_turno}, confiesa algo que nunca le has dicho a {jugador_random}. Si no confiesas, toma 2 shots.",
    "Todos: Hagan una pirámide humana con {jugador_turno} arriba. Si se cae, {jugador_turno} toma 2 shots.",
    "{jugador_turno}, ¿qué es lo que más te gusta de {jugador_atraccion}? Si no das una respuesta clara, toma 1 shot.",
    "Grupo: {jugador_turno} elige a 3 personas para hacer una coreografía. Si no la terminan en 30 segundos, todos toman 1 shot.",
    "{jugador_turno}, imita a un animal y que todos adivinen cuál es. Si nadie adivina, toma 2 shots.",
    "Todos: Den consejos de amor a {jugador_turno}. Si {jugador_turno} no está de acuerdo con alguno, el que lo dio toma 1 shot.",
    "{jugador_turno}, cuenta tu sueño más loco. Si no es lo suficientemente loco para el grupo, toma 2 shots.",
    "{jugador_turno}, haz un baile ridículo por 20 segundos. Si alguien no se ríe, toma 1 shot.",
    "{jugador_turno}, describe cómo sería tu superpoder ideal. Si todos no lo aprueban, toma 2 shots.",
    "Todos: Inventen una historia loca, cada uno agrega una frase. Si alguien no sigue el hilo, toma 1 shot.",
    "{jugador_turno}, canta el coro de tu canción favorita al revés. Si te equivocas, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, hagan un duelo de miradas por 30 segundos. El que parpadea primero toma 1 shot.",
    "{jugador_turno}, cuenta un chiste malo y haz que todos rían. Si nadie ríe, toma 2 shots.",
    "Todos: Digan algo que {jugador_turno} no sabe de ustedes. Si alguien no dice nada, toma 1 shot.",
    "{jugador_turno}, imita a un personaje famoso que todos conozcan. Si nadie adivina, toma 2 shots.",
    "{jugador_turno}, describe a {jugador_random} como si fuera un animal. Si {jugador_random} no está de acuerdo, toma 1 shot.",
    "Grupo: Hagan una fila y pasen un mensaje susurrando al oído. Si el mensaje final es incorrecto, {jugador_turno} toma 2 shots.",
    "{jugador_turno}, convence a {jugador_random} de hacer algo gracioso. Si no lo convences, toma 1 shot.",
    "{jugador_turno}, haz un cumplido exagerado a cada jugador. Si alguien no sonríe, toma 1 shot por cada uno.",
    "Todos: Cada uno imite un emoji que {jugador_turno} elija. Si alguien no lo hace bien, toma 1 shot.",
    "{jugador_turno}, cuenta cómo sería tu día perfecto. Si no convences al grupo, toma 2 shots.",
    "{jugador_turno} y {jugador_atraccion}, intercambien un accesorio por el resto del juego. Si no tienen accesorios, ambos toman 1 shot.",
    "{jugador_turno}, canta una canción infantil con voz de ópera. Si te ríes mientras cantas, toma 1 shot.",
    "Todos: Hagan un círculo y pasen un objeto imaginario con mímica. Si alguien no entiende, toma 1 shot.",
    "{jugador_turno}, describe a {jugador_random} en tres palabras. Si {jugador_random} no está de acuerdo, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras en una película de terror. Si no das miedo, toma 2 shots.",
    "Grupo: {jugador_turno} elige a alguien para un duelo de cumplidos. El que se quede sin ideas primero toma 1 shot.",
    "{jugador_turno}, imita el acento de otro país por 30 segundos. Si nadie lo reconoce, toma 1 shot.",
    "{jugador_turno}, cuenta una mentira obvia y que todos la crean. Si alguien no la cree, toma 1 shot.",
    "Todos: Digan qué superhéroe sería {jugador_turno} a la cuenta de 3. {jugador_turno} toma 1 shot por cada superhéroe repetido.",
    "{jugador_turno}, haz una pose de modelo y que todos la copien. Si alguien no lo hace, toma 1 shot.",
    "{jugador_turno} y {jugador_random}, inventen una palabra y su significado. Si el grupo no la aprueba, ambos toman 1 shot.",
    "{jugador_turno}, describe tu peor cita o salida con amigos. Si no cuentas nada, toma 2 shots.",
    "Todos: Hagan una torre con objetos cercanos en 1 minuto. Si se cae, {jugador_turno} toma 2 shots.",
    "{jugador_turno}, canta algo improvisado sobre {jugador_atraccion}. Si no rima, toma 1 shot.",
    "{jugador_turno}, haz un sonido raro y que todos lo imiten. Si alguien no lo hace bien, toma 1 shot.",
    "Grupo: {jugador_turno} dirige una escena de película improvisada. Si alguien se sale del personaje, toma 1 shot.",
    "{jugador_turno}, confiesa tu guilty pleasure favorito. Si no confiesas, toma 2 shots.",
    "{jugador_turno}, describe a {jugador_random} como si fuera un postre. Si {jugador_random} no está de acuerdo, toma 1 shot.",
    "Todos: Cada uno comparte un apodo que tuvo de pequeño. Si alguien no tiene uno, toma 1 shot.",
    "{jugador_turno}, haz un baile con {jugador_random} por 20 segundos. Si no están sincronizados, ambos toman 1 shot.",
    "{jugador_turno}, cuenta qué harías con un millón de dólares. Si no convences al grupo, toma 2 shots.",
    "Grupo: Hagan un comercial improvisado sobre {jugador_turno}. Si no es creativo, {jugador_turno} toma 1 shot.",
    "{jugador_turno}, imita a un profesor que todos recuerden. Si nadie lo reconoce, toma 2 shots.",
    "{jugador_turno}, describe el outfit perfecto para {jugador_atraccion}. Si no le gusta, toma 1 shot.",
    "Todos: Inventen un apodo nuevo para {jugador_turno}. Si se repite alguno, {jugador_turno} toma 1 shot por repetición.",
    "{jugador_turno}, haz una predicción graciosa sobre el futuro de {jugador_random}. Si no hace reír, toma 1 shot.",
    "{jugador_turno}, canta un verso de una canción en otro idioma. Si te equivocas, toma 1 shot.",
    "Grupo: {jugador_turno} elige un tema y todos dicen una palabra relacionada. Si alguien repite, toma 1 shot.",
    "{jugador_turno}, actúa como si estuvieras en un programa de talentos. Si no impresionas, toma 2 shots.",
    "{jugador_turno}, describe tu película o serie favorita sin decir su nombre. Si alguien adivina, toma 1 shot.",
    "Todos: Hagan una ola como en un estadio, liderada por {jugador_turno}. Si alguien se equivoca, toma 1 shot.",
    "{jugador_turno}, cuenta un rumor falso y gracioso sobre ti mismo. Si nadie lo cree, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, hagan una mini obra de teatro. Si no dura 30 segundos, ambos toman 1 shot.",
    "{jugador_turno}, describe a {jugador_atraccion} como un personaje de videojuego. Si no le gusta, toma 1 shot.",
    "Todos: Cada uno dice qué animal sería {jugador_turno} y por qué. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, haz un truco de magia (o finge uno muy mal). Si nadie se impresiona, toma 2 shots.",
    "{jugador_turno}, canta el himno nacional con voz de caricatura. Si te ríes, toma 1 shot.",
    "Grupo: Hagan una carrera de relevos imaginaria con {jugador_turno} de capitán. Si alguien se equivoca, toma 1 shot.",
    "{jugador_turno}, cuenta qué harías si fueras invisible por un día. Si no convences, toma 2 shots.",
    "{jugador_turno}, imita el grito de un animal y que todos adivinen. Si nadie adivina, toma 2 shots.",
    "Todos: Digan una palabra para describir a {jugador_turno}. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, describe tu plan para sobrevivir un apocalipsis zombi. Si no es creíble, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, creen un lema para el grupo. Si el grupo no lo aprueba, ambos toman 1 shot.",
    "{jugador_turno}, haz una imitación exagerada de {jugador_random}. Si no hace reír, toma 1 shot.",
    "Grupo: {jugador_turno} elige un objeto y todos dicen para qué sirve. Si alguien no participa, toma 1 shot.",
    "{jugador_turno}, cuenta una historia usando solo 5 palabras. Si no tiene sentido, toma 2 shots.",
    "{jugador_turno}, describe cómo sería tu reality show ideal. Si no convences al grupo, toma 2 shots.",
    "Todos: Hagan un brindis liderado por {jugador_turno}. Si alguien no brinda, toma 1 shot.",
    "{jugador_turno}, imita a un vendedor de mercado por 20 segundos. Si no convences, toma 1 shot.",
    "{jugador_turno}, di algo que {jugador_atraccion} no sepa de ti. Si no lo sorprendes, toma 1 shot.",
    "Grupo: Hagan una ronda de aplausos para {jugador_turno}. Si alguien no aplaude, toma 1 shot.",
    "{jugador_turno}, haz un rap improvisado sobre el grupo. Si no rima, toma 2 shots.",
    "Todos: Digan qué profesión tendría {jugador_turno} en un mundo medieval. Si hay repeticiones, {jugador_turno} toma 1 shot por cada una.",
    "{jugador_turno}, describe a {jugador_random} como un cóctel. Si no le gusta, toma 1 shot.",
    "{jugador_turno}, haz una mueca graciosa por 10 segundos. Si alguien no se ríe, toma 1 shot.",
    "Grupo: Hagan una cadena de cumplidos, empezando por {jugador_turno}. Si alguien se traba, toma 1 shot.",
    "{jugador_turno}, cuenta qué harías si fueras presidente por un día. Si no convences, toma 2 shots.",
    "Todos: Cada uno dice un talento oculto. Si alguien no comparte, toma 1 shot.",
    "{jugador_turno}, imita a un influencer famoso por 20 segundos. Si nadie lo reconoce, toma 2 shots.",
    "{jugador_turno} y {jugador_random}, hagan un duelo de piropos a {jugador_atraccion}. El que pierda toma 1 shot.",
    "{jugador_turno}, canta una canción de los 90 con voz de robot. Si te equivocas, toma 1 shot.",
    "Grupo: Hagan un juego de mímica liderado por {jugador_turno}. Si alguien no adivina, toma 1 shot."
  ]

  useEffect(() => {
    setIsLoaded(true) // Forzamos carga inmediata para evitar transiciones iniciales
    const jugadoresGuardados = localStorage.getItem('nopal_jugadores')
    if (jugadoresGuardados) {
      const jugadoresData = JSON.parse(jugadoresGuardados)
      const jugadoresConStats = jugadoresData.map((j: any) => ({
        ...j,
        participaciones: 0
      }))
      setJugadores(jugadoresConStats)
      
      const indices = Array.from({ length: retosNivel1.length }, (_, i) => i)
      const indicesAleatorios = indices.sort(() => Math.random() - 0.5)
      setRetosDisponibles(indicesAleatorios)
    } else {
      router.push('/pedacopa/jugadores')
    }
  }, [router])

  useEffect(() => {
    if (jugadores.length > 0 && retosDisponibles.length > 0 && retoActual <= 20) {
      generarReto()
    }
  }, [jugadores, retosDisponibles, retoActual])

  const generarReto = () => {
    if (retosDisponibles.length === 0) return
    
    const indiceReto = retosDisponibles[0]
    let retoFinal = retosNivel1[indiceReto]

    const jugadorTurno = jugadores.reduce((prev, current) => 
      prev.participaciones <= current.participaciones ? prev : current
    )

    retoFinal = retoFinal.replace(/\{jugador_turno\}/g, jugadorTurno.nombre)

    const otrosJugadores = jugadores.filter(j => j.id !== jugadorTurno.id)
    if (otrosJugadores.length > 0) {
      const jugadorRandom = otrosJugadores[Math.floor(Math.random() * otrosJugadores.length)]
      retoFinal = retoFinal.replace(/\{jugador_random\}/g, jugadorRandom.nombre)
    }

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
    const jugadorTurno = jugadores.reduce((prev, current) => 
      prev.participaciones <= current.participaciones ? prev : current
    )
    
    setJugadores(prev => prev.map(j => 
      j.id === jugadorTurno.id 
        ? { ...j, participaciones: j.participaciones + 1 }
        : j
    ))

    if (retosDisponibles.length > 0) {
      const retoUsado = retosDisponibles[0]
      setRetosUsados(prev => [...prev, retoUsado])
      setRetosDisponibles(prev => prev.slice(1))
    }

    if (retoActual >= 20) {
      const statsNivel1 = {
        nivel: 1,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel1', JSON.stringify(statsNivel1))
      setIsCompleted(true)
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (isCompleted) {
    return (
      <div className="fixed inset-0 w-full min-h-screen max-h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400/30 rounded-full animate-firework"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-emerald-400/30 rounded-full animate-firework" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-lime-400/30 rounded-full animate-firework" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-lg mx-4 text-center z-50">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-green-400/20 via-emerald-500/30 to-lime-400/20 rounded-3xl blur-lg"></div>
            <div className="relative bg-gradient-to-br from-green-900/90 via-emerald-900/80 to-lime-900/90 border border-green-400/50 rounded-2xl p-8 sm:p-12 shadow-2xl z-50">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 animate-glow-text">
                <span className="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                  ¡Nivel Completado!
                </span>
              </h1>
              <p className="text-green-100 text-lg sm:text-xl mb-10 leading-relaxed">
                ¡Casa Tranquila ha sido conquistada! ¡Eres una leyenda de la fiesta!
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="group bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:via-emerald-400 hover:to-lime-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg animate-pulse"
              >
                <span className="flex items-center gap-3">
                  Continuar
                  <svg className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full min-h-screen max-h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 overflow-hidden">
      {/* Fondo simplificado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-emerald-900/20"></div>

      <div className="relative h-full flex flex-col z-50">
        {/* Header fijo */}
        <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 bg-black/40 backdrop-blur-sm border-b border-green-400/20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white animate-glow-text">
                  <span className="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                    Casa Tranquila
                  </span>
                </h1>
                <p className="text-green-300 font-medium text-xs sm:text-sm">¿Quién trae las chelas?</p>
              </div>
            </div>
            <div className="text-right">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-700/50 fill-none stroke-current"
                    strokeWidth="6 sm:stroke-width-8"
                    cx="50"
                    cy="50"
                    r="46"
                  />
                  <circle
                    className="text-green-400 fill-none stroke-current"
                    strokeWidth="6 sm:stroke-width-8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="46"
                    strokeDasharray={`${(retoActual / 20) * 289.026} 289.026`}
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="58" className="text-white fill-white text-xl sm:text-2xl font-bold" textAnchor="middle">
                    {retoActual}/20
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 pt-16 sm:pt-20 md:pt-24 overflow-y-auto z-50" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <div className="w-full max-w-5xl">
            {/* Reto actual */}
            <div className="relative mb-4 sm:mb-8">
              <div className="relative group perspective-1000 z-50">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-green-400/20 via-emerald-500/30 to-lime-400/20 rounded-2xl sm:rounded-3xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-green-900/90 via-emerald-900/80 to-lime-900/90 border border-green-400/50 rounded-2xl shadow-2xl transform transition-transform duration-300 group-hover:-rotate-y-2 group-hover:-rotate-x-2 z-50">
                  <div className="p-4 sm:p-6 border-b border-green-400/20">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center animate-glow-text">
                      Reto #{retoActual}
                    </h2>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 border border-green-400/50 rounded-xl p-4 sm:p-6">
                      <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-center break-words">
                        {reto || 'Cargando reto...'}
                      </p>
                    </div>
                  </div>
                </div>
                {retosUsados.length > 0 && (
                  <>
                    <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-yellow-400/50 rounded-full animate-confetti" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-0 right-0 w-3 sm:w-4 h-3 sm:h-4 bg-emerald-400/50 rounded-full animate-confetti" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-lime-400/50 rounded-full animate-confetti" style={{ animationDelay: '0.4s' }}></div>
                  </>
                )}
              </div>
            </div>

            {/* Controles */}
            <div className="">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 z-50">
                <button 
                  onClick={() => router.push('/pedacopa/niveles')}
                  className="group bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-5 sm:px-6 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 z-50 w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Salir
                  </span>
                </button>
                <button 
                  onClick={siguienteReto}
                  className="group bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:via-emerald-400 hover:to-lime-400 text-white font-bold py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg animate-vibrate z-50 w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-3">
                    {retoActual >= 20 ? 'Finalizar Nivel' : 'Completado'}
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 transform group-hover:rotate-360 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </span>
                </button>
              </div>
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
          height: 100dvh;
          max-height: 100dvh;
          background-attachment: fixed;
        }

        * {
          box-sizing: border-box;
          overscroll-behavior: contain;
        }

        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.3; }
          100% { transform: translateY(0) scale(1); opacity: 0.2; }
        }

        @keyframes firework {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }

        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 10px rgba(74, 222, 128, 0.7), 0 0 20px rgba(16, 185, 129, 0.5); }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }

        .animate-particle {
          animation: particle 5s ease-in-out infinite;
        }

        .animate-firework {
          animation: firework 3s ease-in-out infinite;
        }

        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }

        .animate-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40) forwards;
        }

        .animate-vibrate:hover {
          animation: vibrate 0.3s ease-in-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-particle, .animate-firework, .animate-confetti, .animate-glow, .animate-glow-text, .animate-typewriter, .animate-vibrate {
            animation: none !important;
            transform: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 640px) {
          .max-w-5xl {
            max-width: 95%;
          }
          button {
            font-size: 1rem;
            padding: 0.75rem 1rem;
          }
          svg {
            width: 1rem;
            height: 1rem;
          }
        }
      `}</style>
    </div>
  )
}