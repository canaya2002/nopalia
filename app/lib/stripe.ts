import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY no está definido en las variables de entorno')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export default stripe

// Configuración de productos/precios
export const STRIPE_CONFIG = {
  // Cambia estos IDs por los reales de tu dashboard de Stripe
  MONTHLY_PRICE_ID: 'price_1234567890abcdef', // ID del precio mensual
  YEARLY_PRICE_ID: 'price_0987654321fedcba',   // ID del precio anual
  
  // URLs de éxito y cancelación
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
}

// Helper para crear un customer en Stripe
export async function createStripeCustomer(email: string, name: string) {
  return await stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'nopal-app'
    }
  })
}

// Helper para crear una sesión de checkout
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string
) {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: STRIPE_CONFIG.SUCCESS_URL,
    cancel_url: STRIPE_CONFIG.CANCEL_URL,
    metadata: {
      userId,
    },
  })
}

// Helper para crear un portal de facturación
export async function createBillingPortalSession(customerId: string) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })
}