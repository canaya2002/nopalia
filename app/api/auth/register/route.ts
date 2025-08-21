import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Simple in-memory storage - En producción usar base de datos
const users: any[] = []

const JWT_SECRET = process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_cambiar_en_produccion'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validaciones
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 12)
    const userId = Date.now().toString()
    
    const newUser = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      hasActiveSub: false,
      stripeCustomerId: null,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)

    // Crear token JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Respuesta sin contraseña
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}