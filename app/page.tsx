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
    
    // Efecto parallax del mouse (deshabilitado en móviles)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleComenzar = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Navegando a /modos...')
    e.preventDefault()
    e.stopPropagation()
    
    const button = e.currentTarget
    const ripple = document.createElement('div')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
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
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden">
      {/* Fondo principal */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-lime-800"></div>
      
      {/* Fondo dinámico con parallax sutil */}
      <div 
        className="absolute inset-0 opacity-20 transition-transform duration-1000"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/30 via-transparent to-orange-600/30"></div>
      </div>

      {/* Sistema de partículas simplificado */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#fbbf24', '#f59e0b', '#84cc16', '#22c55e'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Gradiente superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

      {/* Contenido Principal */}
      <div className="relative flex flex-col h-full w-full">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className={`text-center transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Imagen del nopal */}
            <div className={`mb-8 transform transition-all duration-2000 ${isLoaded ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`} style={{ animationDelay: '0.3s' }}>
              <div className="relative inline-block group">
                <div className="absolute -inset-2 rounded-full border-2 border-yellow-400/30 animate-spin-slow"></div>
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                  <div className="absolute -inset-3 bg-yellow-400/20 rounded-full blur-lg animate-pulse-gentle"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-yellow-400/50 group-hover:border-yellow-300 transition-all duration-700 hover:scale-105 animate-float-gentle shadow-xl bg-gradient-to-br from-green-600 to-green-800">
                    <Image
                      src="/images/nopalia.png"
                      alt="Nopal"
                      fill
                      className={`object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-yellow-400/10 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Texto de bienvenida */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-lg">
                Bienvenido a
              </span>
            </h1>

            {/* NOPAL con animaciones */}
            <div className={`mb-12 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <div className="relative inline-flex items-center justify-center">
                {['N', 'O', 'P', 'A', 'L'].map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 cursor-default animate-bounce-letter"
                    style={{
                      animationDelay: `${1.5 + index * 0.1}s`,
                      textShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
                      filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.3))'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Botón */}
            <div className={`mt-8 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ animationDelay: '1.5s' }}>
              <button 
                type="button"
                onClick={handleComenzar}
                className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-red-500 text-black font-bold py-4 px-8 sm:py-5 sm:px-12 md:py-6 md:px-16 rounded-xl text-lg sm:text-xl md:text-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl border-2 border-yellow-300/50 hover:border-orange-300 overflow-hidden group"
              >
                <span className="relative z-10 font-black">Comenzar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer fijado en la parte inferior */}
        <footer className="bg-gradient-to-r from-black/50 via-emerald-900/60 to-black/50 backdrop-blur-sm text-white text-center py-4 border-t border-yellow-400/30 flex-shrink-0">
          <div className="px-4">
            <p className="text-sm sm:text-base font-medium">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold text-xl">NOPAL</span>
              <span className="mx-2 opacity-75 text-yellow-400">-</span>
              <span className="opacity-90 font-semibold">By Carlos Anaya</span>
              <span className="mx-2 text-yellow-400 text-lg"></span>
              <span className="opacity-75 text-yellow-200 text-sm">v1.0</span>
            </p>
            <div className="mt-3 flex justify-center">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
          </div>
        </footer>
      </div>

      {/* Estilos CSS corregidos y optimizados */}
      <style jsx>{`
        @keyframes bounce-letter {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-bounce-letter {
          animation: bounce-letter 2s ease-in-out;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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
        
        /* Estilos base para prevenir scroll y espacio negro */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: fixed;
          overscroll-behavior: none;
          touch-action: none;
          -webkit-overflow-scrolling: none;
        }
        
        /* Contenedor principal */
        .fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
        }
        
        @supports (height: 100dvh) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
        }
        
        /* Contenedor de contenido */
        .h-full {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          touch-action: none;
        }
        
        /* Contenido principal */
        .flex-1 {
          flex: 1 1 auto;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        
        /* Footer */
        .flex-shrink-0 {
          flex-shrink: 0;
          width: 100%;
          box-sizing: border-box;
        }
        
        /* Ajustes para móviles */
        @media (max-width: 640px) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
          
          .flex-1 {
            min-height: 0;
            overflow: hidden;
          }
          
          .flex-shrink-0 {
            padding-bottom: env(safe-area-inset-bottom, 16px);
          }
        }
        
        /* Prevenir scroll y rebote */
        * {
          box-sizing: border-box;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: none;
          touch-action: none;
        }
      `}</style>
    </div>
  )
}