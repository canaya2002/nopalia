import { useAuth } from '../contexts/AuthContext'

interface PremiumAccessResult {
  hasAccess: boolean
  isAuthenticated: boolean
  user: any
  isPremiumLevel: (level: number) => boolean
  canAccessLevel: (level: number) => boolean
}

export function usePremiumAccess(): PremiumAccessResult {
  const { user, loading } = useAuth()

  const isPremiumLevel = (level: number): boolean => {
    return level >= 2 && level <= 5
  }

  const canAccessLevel = (level: number): boolean => {
    // Nivel 1 siempre es gratis
    if (level === 1) return true
    
    // Niveles 2-5 requieren suscripción
    if (isPremiumLevel(level)) {
      return user?.hasActiveSub === true
    }
    
    return false
  }

  return {
    hasAccess: user?.hasActiveSub === true,
    isAuthenticated: !!user,
    user,
    isPremiumLevel,
    canAccessLevel
  }
}