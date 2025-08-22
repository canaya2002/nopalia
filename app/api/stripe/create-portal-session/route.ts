import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserService } from '@/app/lib/userService'
import { createBillingPortalSession } from '@/app/lib/stripe'

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

      if (!user.stripeCustomerId) {
        return NextResponse.json(
          { success: false, error: 'Customer ID de Stripe no encontrado' },
          { status: 400 }
        )
      }

      // Crear sesión del portal de facturación
      const session = await createBillingPortalSession(user.stripeCustomerId)

      return NextResponse.json({
        success: true,
        url: session.url
      })

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Token inválido' },
        { status: 401 }
      )
    }

  } catch (error: any) {
    console.error('Error creando portal de facturación:', error)
    
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