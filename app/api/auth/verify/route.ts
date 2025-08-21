import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Simple in-memory storage - En producción usar base de datos
let users: any[] = []

const JWT_SECRET = process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_cambiar_en_produccion'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remover "Bearer "

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    // Buscar usuario
    const user = users.find(u => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      )
    }

    // Respuesta sin contraseña
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)

  } catch (error) {
    console.error('Error verificando token:', error)
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )
  }
}