"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
import { handleRemoveItem as remove } from "@/utils/api"

const Cart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
//   const [note, setNote] = useState<string>("")
  const [updating, setUpdating] = useState<boolean>(false)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  const userId = "cm84nn02h0000mzco3iudlgjx" // In a real app, get this from auth

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    if (cart) {
      const initialQuantities: { [key: string]: number } = {}
      cart.cart.items.forEach((item) => {
        initialQuantities[item.id] = item.quantity
      })
      setQuantities(initialQuantities)
    }
  }, [cart])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/cart/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch cart")
      }

      const data: CartResponse = await res.json()
      setCart(data)
    } catch (err) {
      setError((err as Error).message)
    //   toast({
    //     title: "Error",
    //     description: (err as Error).message,
    //     variant: "destructive",
    //   })
        alert(`Error : ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return

    try {
      setUpdating(true)
      const res = await fetch(`http://localhost:3000/api/cart/item/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ quantity }),
      })

      if (!res.ok) {
        throw new Error("Failed to update quantity")
      }

      // Update local state
      if (cart) {
        const updatedItems = cart.cart.items.map((item) => (item.id === itemId ? { ...item, quantity } : item))

        setCart({
          cart: {
            ...cart.cart,
            items: updatedItems,
          },
        })
      }

    //   toast({
    //     title: "Cart updated",
    //     description: "Item quantity has been updated",
    //   })
        alert('Cart Updated')
    } catch (err) {
    //   toast({
    //     title: "Error",
    //     description: (err as Error).message,
    //     variant: "destructive",
    //   })
        
        alert(`Error : ${(err as Error).message}`)
    } finally {
      setUpdating(false)
    }
  }

  const handleQuantityChange = (itemId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const removeItem = async (itemId: string) => {
        remove("cm84nn02h0000mzco3iudlgjx",itemId)
  }

  const updateCart = async () => {
    setUpdating(true)

    try {
      // Update all quantities that have changed
      const updatePromises = Object.entries(quantities).map(([itemId, quantity]) => {
        const currentItem = cart?.cart.items.find((item) => item.id === itemId)
        if (currentItem && currentItem.quantity !== quantity) {
          return updateQuantity(itemId, quantity)
        }
        return Promise.resolve()
      })

      await Promise.all(updatePromises)

    //   toast({
    //     title: "Cart updated",
    //     description: "Your cart has been updated successfully",
    //   })

      alert('Cart Updated');
    } catch (err) {
        console.log(err);
    //   toast({
    //     title: "Error",
    //     description: "Failed to update cart",
    //     variant: "destructive",
    //   })

        alert(`Error : Failed to update cart`)
    } finally {
      setUpdating(false)
    }
  }

  const calculateSubtotal = () => {
    if (!cart) return 0
    return cart.cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  const calculateSavings = () => {
    // Example calculation - in a real app, you'd compare to original prices
    // or apply discounts from your backend
    return 0
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your cart...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-destructive/10 p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchCart}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (!cart || cart.cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-semibold text-center mt-8 mb-8">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-sm border border-border">
        <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-muted-foreground p-4 border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {cart.cart.items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 p-4 border-b last:border-b-0 gap-4">
            <div className="col-span-6 flex gap-4">
              <div className="w-24 h-24 flex-shrink-0 bg-muted/20 rounded-md overflow-hidden">
                <Image
                  src={item.product.image[0] || "/placeholder.svg?height=96&width=96"}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-medium text-base">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.product.description || "No description available"}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 w-fit mt-2 transition-colors"
                  disabled={updating}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex items-center md:justify-center">
              <span className="text-sm font-medium md:hidden mr-2">Price:</span>
              <span className="font-medium">₹ {item.product.price.toLocaleString()}</span>
            </div>

            <div className="md:col-span-2 flex items-center md:justify-center">
              <span className="text-sm font-medium md:hidden mr-2">Quantity:</span>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={quantities[item.id] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  disabled={updating}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-between md:justify-end">
              <span className="text-sm font-medium md:hidden">Total:</span>
              <span className="font-medium">
                ₹ {((quantities[item.id] || item.quantity) * item.product.price).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 mt-8">
  {/* Order Summary Section */}
  <div className="bg-white rounded-lg shadow-sm border border-border p-6">
    <h3 className="text-lg font-medium mb-4">Order Summary</h3>

    <div className="space-y-2 mb-4">
      <div className="flex justify-between py-2 border-b">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">₹ {calculateSubtotal().toLocaleString()}</span>
      </div>

      {calculateSavings() > 0 && (
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Savings</span>
          <span className="font-medium text-green-600">- ₹ {calculateSavings().toLocaleString()}</span>
        </div>
      )}

      <div className="flex justify-between py-2 text-lg">
        <span className="font-medium">Total</span>
        <span className="font-semibold">₹ {(calculateSubtotal() - calculateSavings()).toLocaleString()}</span>
      </div>
    </div>

    <div className="text-sm text-muted-foreground mb-6">
      Tax included. Shipping calculated at checkout.
    </div>

    {/* Buttons */}
    <div className="space-y-3">
      <Button
        className="w-full"
        size="lg"
        onClick={() => alert("Proceeding to checkout")}
        disabled={updating}
      >
        Checkout
      </Button>

      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={updateCart}
        disabled={updating}
      >
        {updating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Cart"
        )}
      </Button>
    </div>
  </div>

  {/* Continue Shopping Button */}
  <div className="flex justify-start">
    <Link
      href="/products"
      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Continue Shopping
    </Link>
  </div>
</div>


    </div>
  )
}

export default Cart

