import { db, orderItems, orders } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    const Orders = await db.select().from(orders).orderBy(desc(orders.createdAt));

    const orderWithDetails = await Promise.all(
        Orders.map(async (order: any) => {
            const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id))

            return {
                ...order,
                orderItems: items
            }
        })
    );

    return NextResponse.json(orderWithDetails)

}

export async function PUT(req: NextRequest) {

    const body = await req.json();

    try {
        const res = await db.update(orders).set({
            tracking_id: body.tracking_id,
            shipping_status: body.shipping_status,
        }).where(eq(orders.id, body.id));

        return NextResponse.json("Shipped", { status: 200 })
    } catch (error) {
        return NextResponse.json("error:"+error, {status:400})
    }


}

