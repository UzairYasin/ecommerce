// "use client"
import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
import {
    ChevronLeft, ChevronRight, Copy, CreditCard, File, Home, LineChart, ListFilter,
    MoreVertical, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Truck, Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { OrderProps } from "@/types"
import { useState, useEffect } from 'react'
import OrdersTable from "@/app/components/OrdersTable"
import { lastMonthSales, lastWeekSales, monthChangePercentage, weekChangePercentage } from "@/app/actions/analytics"

const Orders = async() => {

    const session = await auth();

    if (!session) {
        redirect('/signin')
    }

        const data = await fetch('https://cartlon.vercel.app/api/orders', {cache: "no-store"});   
        const orders:OrderProps[] = await data.json();

        const refetchOrders = async () => {
            const data = await fetch('https://cartlon.vercel.app/api/orders', { cache: "no-store" });
            const orders: OrderProps[] = await data.json();
        }

    return (

        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col sm:gap-4 sm:py-4 ">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <OrdersTable 
                    refetchOrders={refetchOrders}
                    orders={orders} 
                    weekChange={weekChangePercentage} 
                    monthChange={monthChangePercentage} 
                    lastWeekSales={lastWeekSales} 
                    lastMonthSales={lastMonthSales} />
                </main>
            </div>
        </div >

    )
}

export default Orders