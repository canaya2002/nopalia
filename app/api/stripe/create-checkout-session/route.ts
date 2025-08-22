import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserService } from '@/app/lib/userService'
import { createCheckoutSession, STRIPE_CONFIG } from '@/app/lib/stripe'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Token no proporcionado' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const user = UserService.getUserById(decoded.userId)
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Usuario no encontrado' },
          { status: 404 }
        )
      }

      const { priceId } = await request.json()

      if (!priceId) {
        return NextResponse.json(
          { success: false, error: 'Price ID es requerido' },
          { status: 400 }
        )
      }

      // Verificar que el usuario no tenga ya una suscripción activa
      if (UserService.hasActiveSubscription(user)) {
        return NextResponse.json(
          { success: false, error: 'Ya tienes una suscripción activa' },
          { status: 400 }
        )
      }

      if (!user.stripeCustomerId) {
        return NextResponse.json(
          { success: false, error: 'Customer ID de Stripe no encontrado' },
          { status: 400 }
        )
      }

      // Crear sesión de checkout
      const session = await createCheckoutSession(
        user.stripeCustomerId,
        priceId,
        user.id
      )

      return NextResponse.json({
        success: true,
        url: session.url,
        sessionId: session.id
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Token inválido' },
        { status: 401 }
      )
    }

  } catch (error: any) {
    console.error('Error creando sesión de checkout:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}