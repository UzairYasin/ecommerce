import { Button } from '@/components/ui/button'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export interface ProductCartProps{
    color:string;
    name: string;
    description: string;
    price: number;
    image: string;
    currency: string; 
    price_id:string;
    quantity:number;
}

export default function AddToBag({price_id, color, name, description, price, image, currency}:ProductCartProps) {

    const {addItem, handleCartClick, shouldDisplayCart} = useShoppingCart();

    const product = {
      price_id: price_id,
      name: name,
      description: description,
      price: price,
      image: image,
      currency:currency,
      color:color,
      quantity:1,
    };

    return (
        <>
            <Button onClick={() => {
                addItem(product), handleCartClick();
            }}>
                Add to Cart
            </Button>
        </>
    )
}
