import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import stripe from '@/app/lib/stripe'
import { UserService } from '@/app/lib/userService'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    if (session.mode === 'subscription' && session.customer) {
      const customerId = session.customer as string
      const user = UserService.getUserByStripeCustomerId(customerId)
      
      if (user) {
        // Obtener la suscripción de Stripe
        const subscription = await stripe.subscriptions.list({
          customer: customerId,
          limit: 1,
        })

        if (subscription.data.length > 0) {
          const sub = subscription.data[0]
          
          UserService.updateUser(user.id, {
            hasActiveSub: true,
            stripeSubscriptionId: sub.id,
            subscriptionStatus: sub.status as any,
            subscriptionPlanId: sub.items.data[0]?.price.id,
            subscriptionCurrentPeriodEnd: sub.current_period_end,
          })

          console.log(`Subscription activated for user ${user.id}`)
        }
      }
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    const user = UserService.getUserByStripeCustomerId(customerId)
    
    if (user) {
      UserService.updateUser(user.id, {
        hasActiveSub: subscription.status === 'active' || subscription.status === 'trialing',
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscription.status as any,
        subscriptionPlanId: subscription.items.data[0]?.price.id,
        subscriptionCurrentPeriodEnd: subscription.current_period_end,
        trialEndsAt: subscription.trial_end,
      })

      console.log(`Subscription created for user ${user.id}`)
    }
  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    const user = UserService.getUserByStripeCustomerId(customerId)
    
    if (user) {
      const isActive = subscription.status === 'active' || subscription.status === 'trialing'
      
      UserService.updateUser(user.id, {
        hasActiveSub: isActive,
        subscriptionStatus: subscription.status as any,
        subscriptionPlanId: subscription.items.data[0]?.price.id,
        subscriptionCurrentPeriodEnd: subscription.current_period_end,
        trialEndsAt: subscription.trial_end,
      })

      console.log(`Subscription updated for user ${user.id}, status: ${subscription.status}`)
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    const user = UserService.getUserByStripeCustomerId(customerId)
    
    if (user) {
      UserService.updateUser(user.id, {
        hasActiveSub: false,
        subscriptionStatus: 'canceled',
        subscriptionCurrentPeriodEnd: null,
        trialEndsAt: null,
      })

      console.log(`Subscription canceled for user ${user.id}`)
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    if (invoice.subscription) {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
      await handleSubscriptionUpdated(subscription)
    }
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    const user = UserService.getUserByStripeCustomerId(customerId)
    
    if (user) {
      // Marcar como moroso si el pago falla
      UserService.updateUser(user.id, {
        subscriptionStatus: 'past_due',
      })

      console.log(`Payment failed for user ${user.id}`)
    }
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}