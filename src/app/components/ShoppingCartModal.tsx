"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();
  const {userId} = useAuth();
  const router = useRouter()

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    if (!userId) {
      console.log('Redirecting to signup...');
      router.push('/sign-up');
      return; // Add return to prevent further code execution
    }
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log(result);
      }
    } catch (error) {
      alert("error:" + error);
    }
  }
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()} >
      <SheetTrigger asChild className='cursor-pointer'>
        <Image src='data:image/png;base64,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'
          width={40} height={40} alt='cart' />
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {cartCount === 0 ? (
          <div className="h-full flex flex-col mx-auto my-auto items-center justify-center">
            <h1 className="py-6 text-gray-500">Your cart is empty!</h1>
            <Image src="/shopping-bag.png" width={200} height={200} alt="shopping-bag" />
          </div>
        ) :
          (<div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">

                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-auto  flex-shrink-0 overflow-hidden rounded-md border ">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={50}
                          height={50}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-red-400 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>${totalPrice}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes are calculated at checkout.
              </p>

              <div className="mt-6">
                <Button onClick={handleCheckoutClick} className="w-full">
                  Checkout
                </Button>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  OR{" "}
                  <button
                    onClick={() => handleCartClick()}
                    className=" font-medium text-primary hover:text-primary/80"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </div>)}
      </SheetContent>
    </Sheet>
  );
}
