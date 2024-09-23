"use client"
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft, ChevronRight, Copy, CreditCard, File, Home, LineChart, ListFilter,
    MoreVertical, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Truck, Users2,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { OrderProps } from '@/types'
import ShipDialog from './ShipDialog'
import { toast } from 'sonner'

const OrdersTable =
    ({ orders, lastWeekSales, lastMonthSales, weekChange, monthChange }:
        { orders: OrderProps[], lastWeekSales: string, lastMonthSales: string, weekChange: number, monthChange: number }) => {

        const [ordersList, setOrdersList] = useState<OrderProps[]>([]);
        const [selectedOrder, setSelectedOrder] = useState<OrderProps | null>(null)

        const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('week')
        const [statusFilters, setStatusFilters] = useState<'all' | 'shipped' | 'unshipped' | null>('all')

        useEffect(() => {

            if (orders && orders.length > 0) {
                setOrdersList(orders)
                setSelectedOrder(orders[0])
            }
        }, [orders])

        const refetchOrders = async () => {
            const data = await fetch('https://cartlon.vercel.app/api/orders', { cache: "no-store" });
            const updatedOrders: OrderProps[] = await data.json();
            setOrdersList(updatedOrders);
          };

        useEffect(() => {
            const now = new Date();

            const filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt)
                const timeCondition = (() => {
                    switch (timeFilter) {
                        case 'week':
                            return now.getTime() - orderDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
                        case 'month':
                            return now.getMonth() === orderDate.getMonth() && now.getFullYear() === orderDate.getFullYear();
                        case 'year':
                            return now.getFullYear() === orderDate.getFullYear();
                        default:
                            return true;
                    }
                })();

                // Filter by order status
                const statusCondition = (() => {
                    switch (statusFilters) {
                        case 'shipped':
                            return order.shipping_status === 'shipped';
                        case 'unshipped':
                            return order.shipping_status === 'unshipped';
                        case 'all':
                        default:
                            return true; // If 'all' is selected, show all orders
                    }
                })();
                // const statusCondition =
                //     (statusFilters.shipped && order.shipping_status === 'shipped') ||
                //     (statusFilters.declined && order.shipping_status === 'declined') ||
                //     (statusFilters.refunded && order.shipping_status === 'refunded') ||
                //     (statusFilters.unshipped && order.shipping_status === 'unshipped') ||
                //     (statusFilters.all && (order.shipping_status === 'shipped' || order.shipping_status === 'unshipped'))

                return timeCondition && statusCondition;
            })

            setOrdersList(filteredOrders);

        }, [timeFilter, statusFilters, orders])
        // console.log(orders)

        const toggleStatusFilter = (status: 'all' | 'shipped' | 'unshipped') => {
            setStatusFilters(prevStatus => (
                prevStatus === status ? null : status
            )
            )
        }

        const handleOrderClick = (order: OrderProps) => {
            setSelectedOrder(order)
        }

        const copy = (type: string) => {

            if (type === 'Order Id ') {
                navigator.clipboard.writeText(String(selectedOrder?.id))
            }
            if (type === 'Tracking Id ') {
                navigator.clipboard.writeText(selectedOrder?.tracking_id as string)
            }

            return toast.success(type + "Copied")
        }

        return (
            <>
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2">
                        <Card x-chunk="dashboard-05-chunk-1">
                            <CardHeader className="pb-2">
                                <CardDescription>This Week</CardDescription>
                                <CardTitle className="text-4xl">${lastWeekSales}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    +{weekChange}% from last week
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={25} aria-label="25% increase" />
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-2">
                            <CardHeader className="pb-2">
                                <CardDescription>This Month</CardDescription>
                                <CardTitle className="text-4xl">${lastMonthSales}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    +{monthChange}% from last month
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={12} aria-label="12% increase" />
                            </CardFooter>
                        </Card>
                    </div>
                    <Tabs defaultValue="week" onValueChange={value => setTimeFilter((value) as 'week' | 'month' | 'year')}>
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="week">Week</TabsTrigger>
                                <TabsTrigger value="month">Month</TabsTrigger>
                                <TabsTrigger value="year">Year</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Filter</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked={statusFilters === 'all'}
                                            onCheckedChange={() => toggleStatusFilter('all')}>
                                            All
                                        </DropdownMenuCheckboxItem>
                                        {/* <DropdownMenuCheckboxItem checked={statusFilters.declined} 
                                    onCheckedChange={() => toggleStatusFilter('declined')}>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked={statusFilters.refunded} 
                                    onCheckedChange={() => toggleStatusFilter('refunded')}>
                                        Refunded
                                    </DropdownMenuCheckboxItem> */}
                                        <DropdownMenuCheckboxItem checked={statusFilters === 'shipped'}
                                            onCheckedChange={() => toggleStatusFilter('shipped')}>
                                            Shipped
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked={statusFilters === 'unshipped'}
                                            onCheckedChange={() => toggleStatusFilter('unshipped')}>
                                            Unshipped
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <TabsContent value="week">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <CardTitle>Orders</CardTitle>
                                    <CardDescription>
                                        Recent orders from your store.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Customer</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Shipping
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Payment
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Date
                                                </TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {ordersList.map((order: OrderProps) => (
                                                <TableRow className="" key={order.id}>
                                                    <TableCell>
                                                        <div className="font-medium">{order.customerName}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {order.customerEmail}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.shipping_status === 'shipped' ? (
                                                            <Badge variant={'success'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="hidden sm:table-cell" variant={'destructive'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.payment_status === 'paid' ?
                                                            (<Badge className="text-xs" variant="success">
                                                                {order.payment_status}
                                                            </Badge>)
                                                            : (<Badge className="text-xs" variant="destructive">
                                                                {order.payment_status}
                                                            </Badge>)
                                                        }
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">{Number(order.totalAmount).toLocaleString(
                                                        undefined, {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    }
                                                    )}</TableCell>
                                                    <TableCell>
                                                        <Button size={'sm'} onClick={() => handleOrderClick(order)} variant={'outline'}>
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="month">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <CardTitle>Orders</CardTitle>
                                    <CardDescription>
                                        Recent orders from your store.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Customer</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Shipping
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Payment
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Date
                                                </TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {ordersList.map((order: OrderProps) => (
                                                <TableRow className="" key={order.id}>
                                                    <TableCell>
                                                        <div className="font-medium">{order.customerName}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {order.customerEmail}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.shipping_status === 'shipped' ? (
                                                            <Badge variant={'success'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="hidden sm:table-cell" variant={'destructive'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.payment_status === 'paid' ?
                                                            (<Badge className="text-xs" variant="success">
                                                                {order.payment_status}
                                                            </Badge>)
                                                            : (<Badge className="text-xs" variant="destructive">
                                                                {order.payment_status}
                                                            </Badge>)
                                                        }
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">{Number(order.totalAmount).toLocaleString(
                                                        undefined, {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    }
                                                    )}</TableCell>
                                                    <TableCell>
                                                        <Button size={'sm'} onClick={() => handleOrderClick(order)} variant={'outline'}>
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="year">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <CardTitle>Orders</CardTitle>
                                    <CardDescription>
                                        Recent orders from your store.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Customer</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Shipping
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Payment
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Date
                                                </TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {ordersList.map((order: OrderProps) => (
                                                <TableRow className="" key={order.id}>
                                                    <TableCell>
                                                        <div className="font-medium">{order.customerName}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {order.customerEmail}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.shipping_status === 'shipped' ? (
                                                            <Badge variant={'success'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="hidden sm:table-cell" variant={'destructive'}>
                                                                {order.shipping_status}
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {order.payment_status === 'paid' ?
                                                            (<Badge className="text-xs" variant="success">
                                                                {order.payment_status}
                                                            </Badge>)
                                                            : (<Badge className="text-xs" variant="destructive">
                                                                {order.payment_status}
                                                            </Badge>)
                                                        }
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">{Number(order.totalAmount).toLocaleString(
                                                        undefined, {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    }
                                                    )}</TableCell>
                                                    <TableCell>
                                                        <Button size={'sm'} onClick={() => handleOrderClick(order)} variant={'outline'}>
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    {selectedOrder && (<Card
                        className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    Order {selectedOrder.id}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        value={selectedOrder.id}
                                        onClick={() => copy("Order Id ")}
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only">Copy Order ID</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>Date: {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</CardDescription>
                                {selectedOrder.tracking_id ?
                                    (<Badge className='text-sm w-fit' variant={'success'}>Shipped</Badge>) :
                                    (<Badge className='text-sm w-fit' variant={'destructive'}>Unshipped</Badge>)
                                }
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                {selectedOrder.tracking_id ?
                                    (
                                        <>
                                            <CardTitle className="group flex items-center gap-2 text-sm">
                                                <Button size={'md'} variant={'outline'}>
                                                    Track Order
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                    value={selectedOrder.tracking_id}
                                                    onClick={() => copy("Tracking Id ")}
                                                >
                                                    <Copy className="h-3 w-3" />
                                                    <span className="sr-only">Copy Order ID</span>
                                                </Button>
                                            </CardTitle>
                                        </>) :
                                    (
                                        <ShipDialog refetchOrders={refetchOrders} order={selectedOrder} />
                                    )
                                }
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">Order Details</div>
                                <ul className="grid gap-3">
                                    {selectedOrder.orderItems.map((item, index) => {
                                        return (
                                            <li key={index} className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    {item.name} x <span>{item.quantity}</span>
                                                </span>
                                                <span>{Number(item.price).toLocaleString(
                                                    undefined, {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }
                                                )}</span>
                                            </li>
                                        )
                                    })}

                                    {/* <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Aqua Filters x <span>1</span>
                                            </span>
                                            <span>$49.00</span>
                                        </li> */}
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>
                                            {Number(selectedOrder.totalAmount).toLocaleString(
                                                undefined, {
                                                style: 'currency',
                                                currency: 'USD',
                                            }
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>$0.00</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>$0.00</span>
                                    </li>
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">Total</span>
                                        <span>{Number(selectedOrder.totalAmount).toLocaleString(
                                            undefined, {
                                            style: 'currency',
                                            currency: 'USD',
                                        }
                                        )}</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Shipping Information</div>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        {/* <span>Liam Johnson</span>
                                            <span>1234 Main St.</span>
                                            <span>Anytown, CA 12345</span> */}
                                        {selectedOrder.customerAddress}
                                    </address>
                                </div>
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">Billing Information</div>
                                    <div className="text-muted-foreground">
                                        Same as shipping address
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Customer Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Customer</dt>
                                        <dd>{selectedOrder.customerName}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Email</dt>
                                        <dd>
                                            <a href={`mailto:${selectedOrder.customerEmail}`}>
                                                {selectedOrder.customerEmail}
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Phone</dt>
                                        <dd>
                                            {selectedOrder.customerPhone ?
                                                (<a href={`tel:${selectedOrder.customerPhone}`}>{selectedOrder.customerPhone}</a>)
                                                : (<a href='#'>-</a>)
                                            }
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Payment Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="flex items-center gap-1 text-muted-foreground">
                                            <CreditCard className="h-4 w-4" />
                                            {selectedOrder.payment_brand}
                                        </dt>
                                        <dd>**** **** **** {selectedOrder.cardLast4}</dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground">
                                Updated <time dateTime={new Date(selectedOrder.createdAt).toLocaleDateString()}>
                                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</time>
                            </div>
                            <Pagination className="ml-auto mr-0 w-auto">
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button size="icon" variant="outline" className="h-6 w-6">
                                            <ChevronLeft className="h-3.5 w-3.5" />
                                            <span className="sr-only">Previous Order</span>
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button size="icon" variant="outline" className="h-6 w-6">
                                            <ChevronRight className="h-3.5 w-3.5" />
                                            <span className="sr-only">Next Order</span>
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    </Card>
                    )}
                </div >
            </>
        )
    }

export default OrdersTable
