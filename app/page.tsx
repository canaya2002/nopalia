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
    <div className="h-screen relative overflow-hidden fixed inset-0">
      {/* Fondo principal simplificado */}
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
        {/* Partículas flotantes */}
        {[...Array(15)].map((_, i) => (
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
      <div className="relative flex flex-col h-full px-4">
        <div className="flex-1 flex items-center justify-center">
          <div className={`text-center transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Imagen del nopal mejorada */}
            <div className={`mb-8 transform transition-all duration-2000 ${isLoaded ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative inline-block group">
                {/* Anillo de energía simple */}
                <div className="absolute -inset-2 rounded-full border-2 border-yellow-400/30 animate-spin-slow"></div>
                
                {/* Contenedor de la imagen */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                  {/* Resplandor sutil */}
                  <div className="absolute -inset-3 bg-yellow-400/20 rounded-full blur-lg animate-pulse-gentle"></div>
                  
                  {/* Imagen */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-yellow-400/50 group-hover:border-yellow-300 transition-all duration-700 hover:scale-105 animate-float-gentle shadow-xl bg-gradient-to-br from-green-600 to-green-800">
                    <Image
                      src="/images/nopalia.png"
                      alt="Nopal"
                      fill
                      className={`object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      priority
                    />
                    
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-yellow-400/10 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Texto de bienvenida */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '0.6s'}}>
              <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-lg">
                Bienvenido a
              </span>
            </h1>

            {/* NOPAL con animaciones limpias */}
            <div className={`mb-12 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '0.8s'}}>
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
            
            {/* Botón limpio y mejorado */}
            <div className={`mt-8 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '1.5s'}}>
              <button 
                type="button"
                onClick={handleComenzar}
                className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-red-500 text-black font-bold py-4 px-8 sm:py-5 sm:px-12 md:py-6 md:px-16 rounded-xl text-lg sm:text-xl md:text-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl border-2 border-yellow-300/50 hover:border-orange-300 overflow-hidden group"
              >
                {/* Texto del botón */}
                <span className="relative z-10 font-black">Comenzar</span>
                
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Efecto de onda al hover */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer mejorado */}
        <footer className={`relative bg-gradient-to-r from-black/50 via-emerald-900/60 to-black/50 backdrop-blur-sm text-white text-center py-6 border-t border-yellow-400/30 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{animationDelay: '2s'}}>
          <div className="px-4">
            <p className="text-sm sm:text-base font-medium">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold text-xl">NOPAL</span>
              <span className="mx-2 opacity-75 text-yellow-400">-</span>
              <span className="opacity-90 font-semibold">By Carlos Anaya</span>
              <span className="mx-2 text-yellow-400 text-lg"></span>
              <span className="opacity-75 text-yellow-200 text-sm">v1.0</span>
            </p>
            
            {/* Línea decorativa simple */}
            <div className="mt-3 flex justify-center">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
          </div>
        </footer>
      </div>

      {/* Estilos CSS simplificados */}
      <style jsx>{`
        @keyframes bounce-letter {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-8px) scale(1.05); 
          }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
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
        
        /* Fix para dispositivos móviles - elimina espacios en blanco */
        html, body {
          overflow: hidden;
          height: 100%;
          position: fixed;
          width: 100%;
        }
        
        @supports (height: 100dvh) {
          .h-screen {
            height: 100dvh !important;
          }
        }
        
        @media (max-height: 700px) {
          .h-screen {
            height: 100vh !important;
            height: 100dvh !important;
          }
        }
        
        /* Prevenir scroll en cualquier dirección */
        * {
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  )
}