import db from './db'
import { createStripeCustomer } from './stripe'

export interface User {
  id: string
  email: string
  name: string
  password?: string
  hasActiveSub: boolean
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  subscriptionStatus: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
  subscriptionPlanId: string | null
  subscriptionCurrentPeriodEnd: number | null
  trialEndsAt: number | null
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  email: string
  name: string
  password: string
}

export interface UpdateUserData {
  name?: string
  hasActiveSub?: boolean
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus?: string
  subscriptionPlanId?: string
  subscriptionCurrentPeriodEnd?: number
  trialEndsAt?: number
}

export interface UserSession {
  id: string
  userId: string
  token: string
  expiresAt: number
  createdAt: string
  lastUsedAt: string
}

export class UserService {
  /**
   * Crear un nuevo usuario con customer de Stripe
   */
  static async createUser(userData: CreateUserData): Promise<User> {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    try {
      // Crear customer en Stripe primero
      const stripeCustomer = await createStripeCustomer(
        userData.email.toLowerCase().trim(),
        userData.name.trim()
      )

      // Crear usuario en la base de datos
      const stmt = db.prepare(`
        INSERT INTO users (
          id, email, name, password, hasActiveSub, stripeCustomerId,
          subscriptionStatus, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, 0, ?, 'inactive', ?, ?)
      `)
      
      const result = stmt.run(
        userId,
        userData.email.toLowerCase().trim(),
        userData.name.trim(),
        userData.password,
        stripeCustomer.id,
        now,
        now
      )
      
      if (result.changes === 0) {
        throw new Error('No se pudo crear el usuario')
      }
      
      const user = this.getUserById(userId)
      if (!user) {
        throw new Error('Error al recuperar el usuario creado')
      }
      
      return user
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('EMAIL_EXISTS')
      }
      throw error
    }
  }

  /**
   * Obtener usuario por email
   */
  static getUserByEmail(email: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE')
    const result = stmt.get(email.toLowerCase().trim()) as User | undefined
    
    if (result) {
      return this.transformUser(result)
    }
    
    return null
  }

  /**
   * Obtener usuario por ID
   */
  static getUserById(id: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
    const result = stmt.get(id) as User | undefined
    
    if (result) {
      return this.transformUser(result)
    }
    
    return null
  }

  /**
   * Obtener usuario por Stripe Customer ID
   */
  static getUserByStripeCustomerId(customerId: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE stripeCustomerId = ?')
    const result = stmt.get(customerId) as User | undefined
    
    if (result) {
      return this.transformUser(result)
    }
    
    return null
  }

  /**
   * Actualizar usuario
   */
  static updateUser(id: string, updates: UpdateUserData): boolean {
    const allowedFields = [
      'name', 'hasActiveSub', 'stripeCustomerId', 'stripeSubscriptionId',
      'subscriptionStatus', 'subscriptionPlanId', 'subscriptionCurrentPeriodEnd',
      'trialEndsAt'
    ]
    
    const fields = Object.keys(updates).filter(key => allowedFields.includes(key))
    
    if (fields.length === 0) {
      return false
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ')
    const values = fields.map(field => {
      const value = updates[field as keyof UpdateUserData]
      return field === 'hasActiveSub' ? (value ? 1 : 0) : value
    })
    
    const stmt = db.prepare(`
      UPDATE users 
      SET ${setClause}, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `)
    
    const result = stmt.run(...values, id)
    return result.changes > 0
  }

  /**
   * Verificar si el usuario tiene suscripción activa
   */
  static hasActiveSubscription(user: User): boolean {
    if (!user.hasActiveSub) return false
    
    // Verificar si la suscripción está activa
    const activeStatuses = ['active', 'trialing']
    if (!activeStatuses.includes(user.subscriptionStatus)) return false
    
    // Si tiene fecha de fin de período, verificar que no haya expirado
    if (user.subscriptionCurrentPeriodEnd) {
      const now = Math.floor(Date.now() / 1000)
      if (now > user.subscriptionCurrentPeriodEnd) return false
    }
    
    return true
  }

  /**
   * Verificar si el usuario está en período de prueba
   */
  static isInTrial(user: User): boolean {
    if (!user.trialEndsAt) return false
    
    const now = Math.floor(Date.now() / 1000)
    return now < user.trialEndsAt && user.subscriptionStatus === 'trialing'
  }

  /**
   * Crear sesión de usuario
   */
  static createSession(userId: string, token: string, expiresAt: number): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    const stmt = db.prepare(`
      INSERT INTO user_sessions (id, userId, token, expiresAt, createdAt, lastUsedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    
    stmt.run(sessionId, userId, token, expiresAt, now, now)
    return sessionId
  }

  /**
   * Obtener sesión por token
   */
  static getSessionByToken(token: string): UserSession | null {
    const stmt = db.prepare('SELECT * FROM user_sessions WHERE token = ?')
    return stmt.get(token) as UserSession | null
  }

  /**
   * Actualizar última actividad de la sesión
   */
  static updateSessionActivity(sessionId: string): void {
    const stmt = db.prepare(`
      UPDATE user_sessions 
      SET lastUsedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `)
    stmt.run(sessionId)
  }

  /**
   * Eliminar sesión
   */
  static deleteSession(sessionId: string): boolean {
    const stmt = db.prepare('DELETE FROM user_sessions WHERE id = ?')
    const result = stmt.run(sessionId)
    return result.changes > 0
  }

  /**
   * Limpiar sesiones expiradas
   */
  static cleanExpiredSessions(): number {
    const now = Math.floor(Date.now() / 1000)
    const stmt = db.prepare('DELETE FROM user_sessions WHERE expiresAt < ?')
    const result = stmt.run(now)
    return result.changes
  }

  /**
   * Transformar resultado de BD a interfaz User
   */
  private static transformUser(dbUser: any): User {
    return {
      ...dbUser,
      hasActiveSub: Boolean(dbUser.hasActiveSub),
      subscriptionCurrentPeriodEnd: dbUser.subscriptionCurrentPeriodEnd || null,
      trialEndsAt: dbUser.trialEndsAt || null,
    }
  }

  /**
   * Limpiar contraseña para respuestas públicas
   */
  static sanitizeUser(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}