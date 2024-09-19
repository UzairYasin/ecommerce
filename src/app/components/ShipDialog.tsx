"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderProps } from "@/types"
import { useState } from "react"
import { toast } from "sonner";

export default function ShipDialog({ order }: { order: OrderProps }) {

    const [tracking, setTracking] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const handleShipping = async () => {

        setIsLoading(true)
        try {
            const res = await fetch("https://cartlon.vercel.app/api/orders", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: order.id,
                    tracking_id: tracking,
                    shipping_status: 'shipped'
                })
            })
            
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
        setIsOpen(false)
        toast.success("Order Shipped")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button variant={"outline"} size={'md'} className="px-5">Ship</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Tracking Id</DialogTitle>
                    <DialogDescription>
                        Provide tracking id here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="trackingId" className="text-right">
                            Tracking Id
                        </Label>
                        <Input id="trackingId" required onChange={(event: any) => setTracking(event.target.value)} type="text" name="trackingId" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                        <Button type="button" disabled={isLoading} onClick={handleShipping}>
                            Ship
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
