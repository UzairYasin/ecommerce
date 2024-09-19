import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { Button } from '@/components/ui/button'
import { ListFilter, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getMyOrders } from '@/app/actions/analytics'
import { OrderProps } from '@/types'

const Page = async () => {

    const session = await auth()

    if (!session || session.user.role !== 'user') {
        return redirect('/')
    }

    const myOrders = await getMyOrders(session.user.email)

    return (
        <>
            <main className="grid flex-1 max-w-[1200px] mx-auto items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-10">

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle className='text-2xl'>My Orders</CardTitle>
                        <CardDescription>
                            Manage your orders and view their status.
                        </CardDescription>
                        <div className="flex">
                            <div className="ml-auto flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 gap-1">
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Archived
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Payment Status
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Created at
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myOrders.map((order: OrderProps) => (
                                    <TableRow key={order.id}>
{/*                                         <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src="/placeholder.svg"
                                                width="64"
                                            />
                                        </TableCell> */}
                                        <TableCell className="font-medium line">
                                            {order.orderItems.map(item => item.name).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            {order.shipping_status === 'shipped' ?
                                                (
                                                    <Badge variant="success">Shipped</Badge>
                                                ) :
                                                (
                                                    <Badge variant="outline">In process</Badge>
                                                )}

                                        </TableCell>
                                        <TableCell>${order.totalAmount}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {order.payment_status === 'paid' ?
                                                (
                                                    <Badge variant="success">paid</Badge>
                                                ) :
                                                (
                                                    <Badge variant="outline">unpaid</Badge>
                                                )}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour12: true
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Track Order</DropdownMenuItem>
                                                    <DropdownMenuItem>Cancel</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}

export default Page
