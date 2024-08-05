"use client"
import React, { ReactNode } from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

const CartProvider = ({ children }: { children: ReactNode}) => {
    return (
        <USCProvider
            mode='payment'
            cartMode='client-only'
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
            currency='USD'
            successUrl='http://cartlon.vercel.app/stripe/success'
            cancelUrl='http://cartlon.vercel.app/stripe/error'
            billingAddressCollection={true}
            shipping_address_collection: {allowed_countries: ['US'],}
            shouldPersist={true}
            language='en-US'
        >
            {children}
        </USCProvider>
    )
}

export default CartProvider
