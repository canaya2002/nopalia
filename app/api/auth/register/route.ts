import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserService } from '@/app/lib/userService'

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validaciones de entrada
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todos los campos son requeridos',
          details: {
            email: !email ? 'Email es requerido' : null,
            password: !password ? 'Contraseña es requerida' : null,
            name: !name ? 'Nombre es requerido' : null,
          },
        },
        { status: 400 }
      )
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'La contraseña debe tener al menos 6 caracteres',
        },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Formato de email inválido',
        },
        { status: 400 }
      )
    }

    // Validar longitud del nombre
    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'El nombre debe tener al menos 2 caracteres',
        },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingUser = await UserService.getUserByEmail(email) // Añadí await por si es asíncrono
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'El email ya está registrado',
        },
        { status: 409 }
      )
    }

    // Hash de la contraseña
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
      // Crear usuario (incluye creación de customer en Stripe)
      const newUser = await UserService.createUser({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        password: hashedPassword,
      })

      // Crear token JWT
      const tokenPayload = {
        userId: newUser.id,
        email: newUser.email,
        hasActiveSub: newUser.hasActiveSub,
      }

      const token = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: '30d',
        issuer: 'nopal-app',
        audience: 'nopal-users',
      })

      // Crear sesión en la base de datos
      const expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 días
      await UserService.createSession(newUser.id, token, expiresAt) // Añadí await por si es asíncrono

      // Preparar respuesta sin contraseña
      const userResponse = UserService.sanitizeUser(newUser)

      return NextResponse.json(
        {
          success: true,
          message: 'Usuario registrado exitosamente',
          token,
          user: {
            ...userResponse,
            hasActiveSubscription: UserService.hasActiveSubscription(newUser),
            isInTrial: UserService.isInTrial(newUser),
          },
        },
        { status: 201 }
      )

    } catch (error: any) {
      if (error.message === 'EMAIL_EXISTS') {
        return NextResponse.json(
          {
            success: false,
            error: 'El email ya está registrado',
          },
          { status: 409 }
        )
      }
      throw error // Re-lanzar para manejo general
    }

  } catch (error: any) {
    console.error('Error en registro:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString(), // Añadí timestamp para depuración
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}