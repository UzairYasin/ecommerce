import { handleStripeWebhooks } from '@/app/actions/StripeWebhook';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe'

export async function POST(req: Request){

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;
  
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
    await handleStripeWebhooks(event);
    return new NextResponse('ok', { status: 200})
  } catch (error) {
    return new NextResponse("invalid signature", {status: 400})
  }

}