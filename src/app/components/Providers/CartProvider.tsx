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
            successUrl='http://localhost:3000/stripe/success'
            cancelUrl='http://localhost:3000/stripe/error'
            billingAddressCollection={false}
            shouldPersist={true}
            language='en-US'
        >
            {children}
        </USCProvider>
    )
}

export default CartProvider
