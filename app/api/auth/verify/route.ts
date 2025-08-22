import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserService } from '@/app/lib/userService'

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno')
}

/**
 * Verificar token y sesión del usuario
 */
export async function POST(request: NextRequest) {
  try {
    // Obtener token del cuerpo o header
    const body = await request.json().catch(() => ({}))
    const headerToken = request.headers.get('authorization')?.substring(7)
    const token = body.token || headerToken

    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Token no proporcionado',
          isValid: false
        },
        { status: 401 }
      )
    }

    try {
      // Verificar y decodificar token JWT
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'nopal-app',
        audience: 'nopal-users'
      }) as any

      // Verificar que la sesión existe en la base de datos
      const session = UserService.getSessionByToken(token)
      if (!session) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Sesión no válida',
            isValid: false
          },
          { status: 401 }
        )
      }

      // Verificar que la sesión no ha expirado
      const now = Math.floor(Date.now() / 1000)
      if (now > session.expiresAt) {
        // Eliminar sesión expirada
        UserService.deleteSession(session.id)
        
        return NextResponse.json(
          { 
            success: false,
            error: 'Sesión expirada',
            isValid: false
          },
          { status: 401 }
        )
      }

      // Buscar usuario actual
      const user = UserService.getUserById(decoded.userId)
      if (!user) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Usuario no encontrado',
            isValid: false
          },
          { status: 404 }
        )
      }

      // Actualizar actividad de la sesión
      UserService.updateSessionActivity(session.id)

      // Verificar estado de suscripción
      const hasActiveSubscription = UserService.hasActiveSubscription(user)
      const isInTrial = UserService.isInTrial(user)

      // Preparar respuesta
      const userResponse = UserService.sanitizeUser(user)

      return NextResponse.json({
        success: true,
        isValid: true,
        user: {
          ...userResponse,
          hasActiveSubscription,
          isInTrial
        },
        session: {
          id: session.id,
          expiresAt: session.expiresAt,
          lastUsedAt: session.lastUsedAt
        },
        subscription: {
          status: user.subscriptionStatus,
          hasActive: hasActiveSubscription,
          isInTrial: isInTrial,
          currentPeriodEnd: user.subscriptionCurrentPeriodEnd,
          trialEndsAt: user.trialEndsAt
        }
      })

    } catch (jwtError: any) {
      let errorMessage = 'Token inválido'
      
      if (jwtError.name === 'TokenExpiredError') {
        errorMessage = 'Token expirado'
      } else if (jwtError.name === 'JsonWebTokenError') {
        errorMessage = 'Token malformado'
      }

      return NextResponse.json(
        { 
          success: false,
          error: errorMessage,
          isValid: false
        },
        { status: 401 }
      )
    }

  } catch (error: any) {
    console.error('Error verificando token:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor',
        isValid: false,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * Logout - invalidar sesión
 */
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Token no proporcionado' 
        },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    // Buscar y eliminar sesión
    const session = UserService.getSessionByToken(token)
    if (session) {
      UserService.deleteSession(session.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    })

  } catch (error: any) {
    console.error('Error en logout:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor'
      },
      { status: 500 }
    )
  }
}