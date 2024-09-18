interface OrderItem {
    id: number;
    orderId: number;
    name: string;
    price: number;
    quantity: number;
  }

export interface OrderProps{
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: number;
    customerAddress: string;
    shipping_status: string;
    payment_status: string;
    tax?: number;
    shipping?: number;
    tracking_id: string;
    totalAmount: number | string;
    currency: string;
    cardLast4?: string;
    payment_type:string;
    payment_brand: string;
    createdAt: Date;
    orderItems: OrderItem[]
}