"use client"
import axios from "axios";
import { useState } from "react"
// import { X } from "lucide-react"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"
// import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShippingForm } from "./shipping-form"
import { formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { cashfree } from "@/utils/cash"
import { toast } from "sonner"

type cart = CartResponse["cart"];

interface CheckoutDrawerProps {
  cart : cart 
  isOpen: boolean
  onClose: () => void
}

interface DecodedToken {
  id: string
  [key: string]: unknown
}



export function CheckoutDrawer({ cart, isOpen, onClose }: CheckoutDrawerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  const shippingCost = subtotal > 0 ? 100 : 0
  const total = subtotal + shippingCost

  const getUserId = (): string | null => {
    const token = Cookies.get("auth_token");

    console.log("Token from cookies:", token)

    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token as string)
      console.log("Decoded token:", decoded)
      return decoded.id
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  }

  const handleRedirect = (sessionId: string) => {
    const checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: `${window.location.origin}/checkout/success`,
    }

    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
        setError(result.error.message)
        setIsLoading(false)
      }
      if (result.redirect) {
        console.log("Redirecting to payment gateway")
      }
    })
  }

  const handleCheckout = async (address: ShippingAddress) => {
    setIsLoading(true)
    setError("")

    const userId = getUserId()

    if (!userId) {
      setError("You must be logged in to checkout")
      setIsLoading(false)
      return
    }

    try {
      const { data } = await axios.post("/api/payment", {
        userId,
        orderId: `order_${Math.random().toString(36).substring(2, 10)}`,
        customer_name: address.name,
        customer_email: address.email,
        customer_phone: address.phoneNumber,
        amount: total,
        shipping_address: address,
        cart_items: cart.items,
      });
    
      console.log("------", data);
    
      if (data.payment_session_id) {
        handleRedirect(data.payment_session_id);
      } else {
        throw new Error("Missing payment session ID");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.response?.data?.message || error.message || "Payment failed. Try again.");
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle className="flex-1">Checkout</SheetTitle>
            {/* <Button variant="ghost" size="icon" onClick={handleClose} disabled={isLoading}>
              <X className="h-5 w-5" />
            </Button> */}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

            <ShippingForm onSubmit={handleCheckout} isLoading={isLoading} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}