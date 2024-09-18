import { db, orderItems, orders, users } from "@/lib/schema";
import { and, desc, eq, gt, sum } from "drizzle-orm";
import { subDays, subMonths, subYears } from 'date-fns';

const lastWeek = subDays(new Date(), 7);
const lastMonth = subMonths(new Date(), 1);
const lastYear = subYears(new Date(), 1);

// Previous periods
const previousWeek = subDays(new Date(), 14); // The week before last week
const previousMonth = subMonths(new Date(), 2); // The month before last month

//Last Week Sales
const lastWeekSalesResult = await db.select({ totalAmount: sum(orders.totalAmount) }).from(orders).where(gt(orders.createdAt, lastWeek))
export const lastWeekSales = lastWeekSalesResult[0].totalAmount as string;

const previousWeekSalesResult = await db.select({ totalAmount: sum(orders.totalAmount) })
    .from(orders).where(and(
        gt(orders.createdAt, previousWeek),
        gt(orders.createdAt, lastWeek)
    ));

const previousWeekSales = previousWeekSalesResult[0].totalAmount;

const lastMonthSalesResult = await db.select({ totalAmount: sum(orders.totalAmount) })
.from(orders).where(gt(orders.createdAt, lastMonth));

//Last Month Sales
export const lastMonthSales = lastMonthSalesResult[0].totalAmount as string;

const previousMonthSalesResult = await db.select({ totalAmount: sum(orders.totalAmount) })
    .from(orders).where(and(
        gt(orders.createdAt, previousMonth),
        gt(orders.createdAt, lastMonth)
    ));
const previousMonthSales = previousMonthSalesResult[0].totalAmount;

// Calculate percentage changes
export const weekChangePercentage = previousWeekSales
    ? ((Number(lastWeekSales) - Number(previousWeekSales)) / Number(previousWeekSales)) * 100
    : 0;

export const monthChangePercentage = previousMonthSales
    ? ((Number(lastMonthSales) - Number(previousMonthSales)) / Number(previousMonthSales)) * 100
    : 0;

//Last year sales
const lastYearSalesResult = await db.select({ totalAmount: sum(orders.totalAmount) }).from(orders).where(gt(orders.createdAt, lastYear))
export const lastYearSales = lastYearSalesResult[0].totalAmount as string;

//Total Sales
const totalRevenue = await db.select({ totalAmount: sum(orders.totalAmount) }).from(orders) 
export const totalSales = totalRevenue[0].totalAmount

//Total number of orders
const Orders = await db.select().from(orders) 
export const totalOrders = Orders.length

//Unshipped Order
const unshipped = await db.select().from(orders).where(eq(orders.shipping_status, 'unshipped'))
export const unshippedOrders = unshipped.length

//Recent Sales
export const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(5)

//Number of users
const Users = await db.select().from(users)
export const numberOfUsers = Users.length

//Get orders of certain user
export const getMyOrders = async(email:string) => {

    const Orders = await db.select().from(orders).where(eq(orders.customerEmail, email))

    const orderWithDetails = await Promise.all(
        Orders.map(async (order: any) => {
            const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id))

            return{
                ...order,
                orderItems: items
            }
        })
    );

    return orderWithDetails;
}


