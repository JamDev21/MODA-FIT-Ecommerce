"use client"

import { ShoppingCart, Trash2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function CartSheet({ className = "text-white" }: { className?: string }) {
  const { items, removeFromCart, cartTotal, cartCount } = useCart()

  // 👇 LÓGICA PARA WHATSAPP
  const handleCheckout = () => {
    const phoneNumber = "525615045665" 
    
    let message = "Hola MODA FIT, quiero realizar el siguiente pedido:\n\n"
    
    items.forEach((item) => {
      message += `▪️ ${item.quantity}x ${item.name}\n   Talla: ${item.size} | Color: ${item.color}\n   Precio: $${item.price}\n\n`
    })

    message += `*TOTAL A PAGAR: $${cartTotal.toFixed(2)}*`

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={`relative ${className} hover:text-[#f7b6c2] transition-colors`}>
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#f7b6c2] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-[#222]">Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
              <p>El carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4 items-center border-b pb-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-[#222] line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.size} / {item.color}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm font-bold text-[#f7b6c2]">
                        {item.quantity} x ${item.price}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-[#222]">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 text-lg gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}