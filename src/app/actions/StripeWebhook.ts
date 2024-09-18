import { db, orderItems, orders } from "@/lib/schema";
import Stripe from "stripe";

export async function handleStripeWebhooks(event: Stripe.Event) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    let session = event.data.object as Stripe.Checkout.Session;
    
    // Fetch the payment intent using the payment_intent ID from the session
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);

    // Extract the payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string);

    // Example of what information you can get from the paymentMethod object
    const paymentMethodDetails = {
        type: paymentMethod.type, // e.g., 'card', 'bank_transfer', etc.
        cardBrand: paymentMethod.card?.brand, // e.g., 'visa', 'mastercard'
        cardLast4: paymentMethod.card?.last4, // e.g., last 4 digits of the card
    };

    if (event.type === "checkout.session.completed") {
        const customerDetails = session.customer_details;

        // Inserting into orders table
        try {
            if (!customerDetails?.address || !session.amount_total) {
                throw new Error("Billing address and amount is required");
            }

            const Address = customerDetails.address
            const address = Address ?
                `${Address.line1},
                ${Address.line2 || ''},
                ${Address.city},
                ${Address.state || ''},
                ${Address.postal_code},
                ${Address.country}` : '';

            const insertedOrder = await db.insert(orders).values({
                customerName: customerDetails?.name || '',
                customerEmail: customerDetails?.email || '',
                customerPhone: customerDetails?.phone || '',
                customerAddress: address,
                payment_status: session.payment_status || '',
                totalAmount: (session.amount_total / 100).toFixed(2),
                currency: session.currency || '',
                cardLast4: paymentMethodDetails.cardLast4 || '',
                payment_type: paymentMethodDetails.type || '',
                payment_brand: paymentMethodDetails.cardBrand || ''
            }).returning();

            const orderId = insertedOrder[0].id;

            const products = await stripe.checkout.sessions.listLineItems(session.id, {
                limit: 100
            });

            // Inserting order items
            for (const item of products.data) {
                await db.insert(orderItems).values({
                    orderId: orderId,
                    name: item.description || '',
                    price: (item.amount_subtotal / 100).toFixed(2),
                    quantity: item.quantity || 0,
                });
            }

            console.log("Order processed successfully");

        } catch (error) {
            console.error("Error processing order:", error);
        }
    }
}
