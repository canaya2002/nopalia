'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Login exitoso - verificar si hay un nivel deseado guardado
        const nivelDeseado = localStorage.getItem('nopal_nivel_deseado')
        if (nivelDeseado) {
          localStorage.removeItem('nopal_nivel_deseado')
          // Redirigir de vuelta a niveles
          router.push('/pedacopa/niveles')
        } else {
          // Redirigir al dashboard o página principal
          router.push('/pedacopa/niveles')
        }
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch (error) {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegisterRedirect = () => {
    router.push('/register')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-orange-400/50 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-lime-400/40 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/30"></div>

      <div className="relative flex flex-col h-full w-full">
        {/* Header */}
        <header className={`pt-8 sm:pt-12 pb-6 text-center transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/10 via-white/10 to-emerald-400/10 blur-xl rounded-lg"></div>
              <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
                <span className="bg-gradient-to-r from-emerald-100 via-white to-lime-100 bg-clip-text text-transparent drop-shadow-xl">
                  Iniciar Sesión
                </span>
              </h1>
            </div>
            <p className="text-emerald-200/90 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Accede a tu cuenta para continuar con NOPAL
            </p>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-8">
          <div className={`w-full max-w-md transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{animationDelay: '0.3s'}}>
            
            {/* Logo/Imagen del nopal */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden border-3 border-yellow-400/50 shadow-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <div className="text-4xl">🌵</div>
                </div>
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>

            {/* Formulario */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/15 via-emerald-500/20 to-lime-400/15 rounded-xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl p-6 sm:p-8">
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-200 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-semibold text-sm mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full p-4 rounded-lg bg-white/15 text-white placeholder-gray-300 border border-white/25 focus:border-green-400 focus:outline-none text-base font-medium backdrop-blur-sm transition-all duration-300"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold text-sm mb-2">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Tu contraseña"
                        className="w-full p-4 rounded-lg bg-white/15 text-white placeholder-gray-300 border border-white/25 focus:border-green-400 focus:outline-none text-base font-medium backdrop-blur-sm transition-all duration-300"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.email || !formData.password}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:via-emerald-400 hover:to-lime-400 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-600 text-white disabled:text-gray-300 font-bold py-4 px-6 rounded-lg text-base transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 shadow-xl disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Iniciando sesión...</span>
                        </>
                      ) : (
                        <>
                          <span>Iniciar Sesión</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="px-4 text-white/60 text-sm font-medium">o</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Register redirect */}
                <button
                  onClick={handleRegisterRedirect}
                  disabled={isSubmitting}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 text-base"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 bg-black/20 backdrop-blur-sm border-t border-white/10 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{animationDelay: '0.8s'}}>
          <div className="max-w-md mx-auto text-center">
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="group relative bg-black/40 hover:bg-black/60 text-white font-medium py-3 px-6 sm:px-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-lg shadow-xl"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base">
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Volver</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
      
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
          height: 100vh;
          max-height: 100vh;
          background-attachment: fixed;
        }
        
        @supports (height: 100dvh) {
          .fixed {
            height: 100dvh;
            max-height: 100dvh;
          }
        }
        
        * {
          box-sizing: border-box;
          overscroll-behavior: contain;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}