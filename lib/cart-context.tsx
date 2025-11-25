"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: any, size: string, color: string) => void
  removeFromCart: (id: number, size: string, color: string) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 1. Cargar carrito del LocalStorage al iniciar
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem("modafit_cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error parsing cart", e)
      }
    }
  }, [])

  // 2. Guardar en LocalStorage cada vez que cambie
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("modafit_cart", JSON.stringify(items))
    }
  }, [items, isMounted])

  const addToCart = (product: any, size: string, color: string) => {
    setItems((prev) => {
      // Buscamos si ya existe exactamente el mismo producto (mismo ID, talla y color)
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      )

      if (existing) {
        toast.success("Cantidad actualizada en el carrito")
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      toast.success("Producto agregado al carrito")
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg",
          quantity: 1,
          size,
          color,
        },
      ]
    })
  }

  const removeFromCart = (id: number, size: string, color: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)))
    toast.info("Producto eliminado del carrito")
  }

  const clearCart = () => {
    setItems([])
    toast.success("Carrito vaciado")
  }

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  if (!isMounted) {
    return null
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}