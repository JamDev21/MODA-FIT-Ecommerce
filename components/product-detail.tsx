'use client'

import { useState } from 'react'
import { Heart, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner' 
import { Product } from '@/lib/types' 
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/cart-sheet"

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// 👇 IMPORTANTE: 'export default' para arreglar tu error
export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '')
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Estado para la cantidad
  const [quantity, setQuantity] = useState(1)
  
  const productImages = product.images;
  const sizes = product.sizes;
  const colors = product.colors || [];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity)
  }

  const handleAddToFavorites = () => {
    toast.info('Producto añadido a favoritos')
  }

  // Controles de cantidad
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  const increaseQty = () => setQuantity(prev => prev + 1)

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header con Carrito a la derecha */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between w-full">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              MODA <span className="text-[#f7b6c2]">FIT</span>
            </h1>
          </Link>
          
          {/* Icono del carrito */}
          <div className="flex items-center">
            <CartSheet className="text-[#222]" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Columna Izquierda: Imágenes */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                 <Image
                    src={productImages && productImages.length > 0 ? productImages[selectedImage] : "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all relative ${
                    selectedImage === idx
                      ? 'border-[#f7b6c2]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Vista ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#222]">{product.name}</h1>
              <p className="mt-2 text-3xl font-semibold text-[#222]">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-[#222] leading-relaxed">
              {product.description}
            </p>

            {/* Tallas */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#222]">Talla</label>
              <div className="flex flex-wrap gap-3">
                {sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border-2 px-6 py-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-[#f7b6c2] bg-[#f7b6c2] text-white'
                        : 'border-gray-300 text-[#222] hover:border-[#f7b6c2]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Colores */}
            {colors.length > 0 && (
              <div>
                <label className="mb-3 block text-sm font-medium text-[#222]">Color</label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      // Usamos una key compuesta para evitar errores de duplicados
                      key={`${color.name}-${color.hex}`}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#222] ring-2 ring-[#f7b6c2] ring-offset-2'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selector de Cantidad */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#222]">Cantidad</label>
              <div className="flex items-center gap-4 border border-gray-300 rounded-md w-fit px-2 py-1">
                <button 
                  onClick={decreaseQty}
                  className="p-2 text-gray-500 hover:text-[#222] disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={increaseQty}
                  className="p-2 text-gray-500 hover:text-[#222]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-md bg-[#f7b6c2] py-6 text-lg font-semibold text-white transition-all hover:bg-[#f5a5b5] hover:shadow-md"
              >
                Añadir al Carrito - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                onClick={handleAddToFavorites}
                variant="outline"
                className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-[#f7b6c2] py-6 font-semibold text-[#f7b6c2] transition-all hover:bg-[#f7b6c2] hover:text-white h-auto text-base"
              >
                <Heart className="h-5 w-5" />
                Agregar a Favoritos
              </Button>
            </div>

            {/* Acordeón */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-[#222]">
                  Detalles y Cuidado
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 space-y-2 text-[#222] whitespace-pre-line">
                    {product.care || "Lavar a máquina en frío. No usar blanqueador. Secar a baja temperatura."}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Productos Relacionados */}
        <section className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#222]">Productos relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                href={`/producto/${relatedProduct.id}`}
                key={relatedProduct.id}
                className="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all block"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <Image
                    src={relatedProduct.images?.[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#222] line-clamp-1">{relatedProduct.name}</h3>
                  <p className="mt-1 text-lg font-bold text-[#222]">${relatedProduct.price.toFixed(2)}</p>
                  <Button className="mt-3 w-full rounded-md bg-[#222] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#333] h-auto">
                    Ver producto
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}