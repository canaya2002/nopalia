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
    "{jugador_turno}, cuenta qué harías con un millón de dólares. If no convences al grupo, toma 2 shots.",
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
    "{jugador_turno}, describe cómo sería tu reality show ideal. If no convences al grupo, toma 2 shots.",
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
    const plantilla = retosNivel1[indiceReto]
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
      const statsNivel1 = {
        nivel: 1,
        completado: true,
        fecha: new Date().toISOString(),
        jugadores: jugadores
      }
      localStorage.setItem('nopal_stats_nivel1', JSON.stringify(statsNivel1))
      router.push('/pedacopa/niveles')
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  const saltarReto = () => {
    // Mover el reto actual a retosUsados sin incrementar participaciones
    if (retosDisponibles.length > 0) {
      const retoUsado = retosDisponibles[0]
      setRetosUsados(prev => [...prev, retoUsado])
      setRetosDisponibles(prev => prev.slice(1))
    }

    if (retoActual >= 20) {
      siguienteReto()
    } else {
      setRetoActual(prev => prev + 1)
    }
  }

  if (retoActual > 20) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-2xl mx-4 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 via-emerald-500/30 to-lime-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-green-900/60 via-emerald-900/40 to-lime-900/60 backdrop-blur-xl border border-green-400/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                  Nivel Completado
                </span>
              </h1>
              <p className="text-green-200 text-xl mb-8 leading-relaxed">
                Casa Tranquila ha sido conquistada. Excelente trabajo!
              </p>
              <button 
                onClick={() => router.push('/pedacopa/niveles')}
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:via-emerald-400 hover:to-lime-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-lg"
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
      
      {/* Fondo minimalista */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      </div>

      {/* Gradiente simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-emerald-900/20"></div>

      <div className="relative min-h-screen flex flex-col">
        
        {/* Header simplificado */}
        <header className={`p-6 md:p-8 bg-black/20 backdrop-blur-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  Casa Tranquila
                </h1>
                <p className="text-green-300 font-medium">¿Quién trae las chelas?</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-white">
                {retoActual}<span className="text-green-300 text-xl">/20</span>
              </div>
              <p className="text-green-200 text-sm">Retos</p>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-4xl">
            
            {/* Reto actual - diseño limpio */}
            <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400/15 via-emerald-500/20 to-lime-400/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-lime-900/40 backdrop-blur-xl border border-green-400/30 rounded-2xl shadow-2xl">
                  
                  {/* Header simple del reto */}
                  <div className="p-6 border-b border-green-400/20">
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Reto #{retoActual}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Contenido del reto */}
                  <div className="p-6 md:p-8 lg:p-12">
                    <div className="bg-gradient-to-r from-green-600/60 to-emerald-600/60 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 md:p-8 lg:p-10">
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
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                
                {/* Botón salir */}
                <button 
                  onClick={() => router.push('/pedacopa/niveles')}
                  className="group bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm order-3 sm:order-1"
                >
                  <span className="flex items-center gap-2">
                    <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span>Salir</span>
                  </span>
                </button>

                {/* Botón completar */}
                <button 
                  onClick={siguienteReto}
                  className="group bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:via-emerald-400 hover:to-lime-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg order-1 sm:order-3"
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
                      className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(retoActual / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-green-200 text-sm mt-2">
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