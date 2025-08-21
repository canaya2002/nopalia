'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    
    // Efecto parallax del mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleComenzar = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Navegando a /modos...')
    e.preventDefault()
    e.stopPropagation()
    
    // Añadir efecto de ripple al hacer clic
    const button = e.currentTarget
    const ripple = document.createElement('div')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple')
    
    button.appendChild(ripple)
    
    setTimeout(() => {
      router.push('/modos')
    }, 300)
    
    setTimeout(() => {
      ripple.remove()
    }, 1000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900">
      {/* Fondo dinámico con parallax */}
      <div 
        className="absolute inset-0 opacity-30 transition-transform duration-1000"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800/50 via-transparent to-lime-800/50"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-900/20 via-transparent to-orange-900/20"></div>
      </div>

      {/* Sistema de partículas mejorado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flotantes grandes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`large-${i}`}
            className={`absolute w-3 h-3 rounded-full animate-float-random opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#fbbf24', '#f59e0b', '#84cc16', '#22c55e'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Partículas medianas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className={`absolute w-2 h-2 rounded-full animate-drift opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#fde047', '#facc15', '#a3e635', '#65a30d'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
        
        {/* Partículas pequeñas */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`small-${i}`}
            className={`absolute w-1 h-1 rounded-full animate-twinkle opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#fef3c7', '#fde68a', '#ecfccb', '#d9f99d'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ondas de energía mejoradas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-40 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-wave-1 transform -rotate-3"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-32 bg-gradient-to-l from-transparent via-orange-400/8 to-transparent animate-wave-2 transform rotate-2"></div>
        <div className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r from-transparent via-lime-400/6 to-transparent animate-wave-3 transform rotate-1"></div>
      </div>

      {/* Rayos de luz dinámicos */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-t from-yellow-400/20 to-transparent animate-light-ray"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              width: '2px',
              height: `${30 + Math.random() * 40}px`,
              transform: `rotate(${-45 + i * 15}deg)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradiente superpuesto con efectos de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-emerald-900/30"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20"></div>

      {/* Contenido Principal */}
      <div className="relative flex-1 flex items-center justify-center min-h-screen px-4">
        <div className={`text-center transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Imagen del nopal con efectos avanzados */}
          <div className={`mb-12 transform transition-all duration-2000 ${isLoaded ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`} style={{animationDelay: '0.3s'}}>
            <div className="relative inline-block group">
              {/* Anillos de energía */}
              <div className="absolute inset-0 animate-pulse-ring">
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/40 animate-expand-ring"></div>
                <div className="absolute inset-2 rounded-full border border-orange-400/30 animate-expand-ring" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute inset-4 rounded-full border border-lime-400/20 animate-expand-ring" style={{animationDelay: '1s'}}></div>
              </div>
              
              {/* Contenedor de la imagen */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44">
                {/* Efectos de resplandor */}
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-500/40 to-amber-400/30 rounded-full blur-xl animate-glow-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-lime-400/30 to-yellow-400/20 rounded-full blur-lg animate-glow-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Contenedor de la imagen con máscara circular */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-yellow-400/60 group-hover:border-yellow-300 transition-all duration-700 hover:scale-110 animate-float-gentle shadow-2xl bg-gradient-to-br from-green-600 to-green-800">
                  <Image
                    src="/images/nopalia.png"
                    alt="Nopal"
                    fill
                    className={`object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  
                  {/* Overlay sutil para integración */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-yellow-400/10 rounded-full"></div>
                  
                  {/* Efecto de cristal */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full"></div>
                </div>
                
                {/* Partículas orbitales */}
                <div className="absolute inset-0 animate-orbit-slow">
                  <div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
                  <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-orange-400 rounded-full transform -translate-y-1/2 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-amber-400 rounded-full transform -translate-x-1/2 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full transform -translate-y-1/2 animate-pulse" style={{animationDelay: '0.9s'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Texto de bienvenida mejorado */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '0.6s'}}>
            <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-2xl animate-text-glow">
              Bienvenido a
            </span>
          </h1>

          {/* NOPAL con animaciones avanzadas */}
          <div className={`mb-16 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '0.8s'}}>
            <div className="relative inline-flex items-center justify-center">
              {/* Efectos de fondo para el texto */}
              <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/5 via-orange-400/10 to-amber-400/5 blur-3xl animate-pulse"></div>
              
              {['N', 'O', 'P', 'A', 'L'].map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent hover:scale-125 transition-all duration-500 cursor-default animate-letter-dance"
                  style={{
                    animationDelay: `${1.5 + index * 0.15}s`,
                    animationDuration: '1.5s',
                    textShadow: '0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)',
                    filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          
          {/* Botón mejorado con efectos avanzados */}
          <div className={`mt-8 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '1.5s'}}>
            <div className="relative inline-block group">
              <button 
                type="button"
                onClick={handleComenzar}
                className="relative z-20 bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-500 text-black font-black py-4 px-12 sm:py-5 sm:px-16 md:py-6 md:px-20 rounded-2xl text-xl sm:text-2xl md:text-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-yellow-500/70 border-3 border-yellow-300/60 hover:border-orange-300 animate-pulse-slow cursor-pointer overflow-hidden group"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="relative z-10 drop-shadow-lg animate-text-shimmer">Comenzar</span>
                
                {/* Efectos internos del botón */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-orange-200/30 rounded-2xl group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Efecto de ondas */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000"></div>
                </div>
              </button>
              
              {/* Efectos externos del botón */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-80 transition-all duration-500 animate-pulse-gentle"></div>
              
              {/* Sistema de partículas alrededor del botón */}
              <div className="absolute inset-0 animate-orbit-particles">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-60px) translateX(-50%)`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer mejorado */}
      <footer className={`relative bg-gradient-to-r from-black/60 via-emerald-900/70 to-black/60 backdrop-blur-lg text-white text-center py-6 sm:py-8 border-t border-yellow-400/40 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{animationDelay: '2s'}}>
        <div className="relative">
          {/* Efectos de fondo del footer */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
          
          <p className="text-sm sm:text-base md:text-lg font-medium px-4 relative z-10">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold animate-text-glow text-2xl">NOPAL</span>
            <span className="mx-3 opacity-75 text-yellow-400">-</span>
            <span className="opacity-90 font-semibold">By Carlos Anaya</span>
            <span className="mx-3 text-yellow-400 animate-bounce text-xl" style={{animationDuration: '2s'}}>🌵</span>
            <span className="mx-3 opacity-60 hidden sm:inline">|</span>
            <span className="ml-2 opacity-75 text-yellow-200 hidden sm:inline font-medium">Versión 1.0</span>
          </p>
          
          {/* Líneas decorativas animadas mejoradas */}
          <div className="mt-4 flex flex-col items-center space-y-2">
            <div className="w-24 sm:w-32 md:w-40 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-shimmer-line"></div>
            <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-shimmer-line" style={{animationDelay: '0.5s'}}></div>
            <div className="w-6 sm:w-8 md:w-10 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-shimmer-line" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </footer>

      {/* Efectos ambientales avanzados */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-yellow-400/50 animate-shimmer-top"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400/50 via-lime-400/50 to-emerald-400/50 animate-shimmer-bottom"></div>

      {/* Estilos CSS personalizados avanzados */}
      <style jsx>{`
        @keyframes letter-dance {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotateZ(0deg); 
            filter: hue-rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) scale(1.1) rotateZ(2deg); 
            filter: hue-rotate(10deg);
          }
          50% { 
            transform: translateY(-8px) scale(1.05) rotateZ(-1deg); 
            filter: hue-rotate(-5deg);
          }
          75% { 
            transform: translateY(-12px) scale(1.08) rotateZ(1deg); 
            filter: hue-rotate(15deg);
          }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-12px) rotate(2deg) scale(1.02); }
          66% { transform: translateY(-6px) rotate(-1deg) scale(0.98); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(-10px) translateX(-5px) rotate(180deg); }
          75% { transform: translateY(-25px) translateX(8px) rotate(270deg); }
        }
        
        @keyframes drift {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(15px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes expand-ring {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        @keyframes orbit-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes orbit-particles {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wave-1 {
          0%, 100% { transform: translateX(-100%) rotate(-3deg); opacity: 0; }
          50% { transform: translateX(0%) rotate(-3deg); opacity: 1; }
        }
        
        @keyframes wave-2 {
          0%, 100% { transform: translateX(100%) rotate(2deg); opacity: 0; }
          50% { transform: translateX(0%) rotate(2deg); opacity: 1; }
        }
        
        @keyframes wave-3 {
          0%, 100% { transform: translateX(-50%) rotate(1deg); opacity: 0; }
          50% { transform: translateX(50%) rotate(1deg); opacity: 1; }
        }
        
        @keyframes light-ray {
          0%, 100% { opacity: 0; transform: scaleY(0); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        
        @keyframes text-glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8)); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes shimmer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer-top {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes shimmer-bottom {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        .animate-letter-dance {
          animation: letter-dance 1.5s ease-in-out;
        }
        
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        
        .animate-float-random {
          animation: float-random 8s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 10s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        
        .animate-expand-ring {
          animation: expand-ring 3s ease-out infinite;
        }
        
        .animate-orbit-slow {
          animation: orbit-slow 20s linear infinite;
        }
        
        .animate-orbit-particles {
          animation: orbit-particles 8s linear infinite;
        }
        
        .animate-wave-1 {
          animation: wave-1 8s ease-in-out infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 10s ease-in-out infinite;
        }
        
        .animate-wave-3 {
          animation: wave-3 12s ease-in-out infinite;
        }
        
        .animate-light-ray {
          animation: light-ray 5s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: text-shimmer 2s ease-in-out infinite;
        }
        
        .animate-shimmer-line {
          animation: shimmer-line 3s ease-in-out infinite;
        }
        
        .animate-shimmer-top {
          background-size: 200% 100%;
          animation: shimmer-top 4s ease-in-out infinite;
        }
        
        .animate-shimmer-bottom {
          background-size: 200% 100%;
          animation: shimmer-bottom 5s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-effect 1s linear;
          pointer-events: none;
        }
        
        @keyframes ripple-effect {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}