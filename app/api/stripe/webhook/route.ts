import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Simple in-memory storage - En producción usar base de datos
let users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error) {
      console.error('Error verificando webhook:', error)
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      )
    }

    // Manejar eventos de Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Obtener información del usuario desde metadata
        const userId = session.metadata?.userId
        if (!userId) {
          console.error('No userId in session metadata')
          return NextResponse.json({ error: 'No userId found' }, { status: 400 })
        }

        // Buscar y actualizar usuario
        const userIndex = users.findIndex(u => u.id === userId)
        if (userIndex === -1) {
          console.error('Usuario no encontrado:', userId)
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Activar suscripción
        users[userIndex] = {
          ...users[userIndex],
          hasActiveSub: true,
          stripeSessionId: session.id,
          subscriptionDate: new Date().toISOString(),
          paymentStatus: 'completed'
        }

        console.log(`Suscripción activada para usuario ${userId}`)
        break

      case 'payment_intent.succeeded':
        console.log('Pago exitoso:', event.data.object.id)
        break

      case 'payment_intent.payment_failed':
        console.log('Pago fallido:', event.data.object.id)
        break

      default:
        console.log(`Evento no manejado: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Error en webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}