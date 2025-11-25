'use client'

import { useState } from 'react'
import { Heart, ChevronDown, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner' 
// import { Product, getRelatedProducts } from '@/lib/products' 
import { Product } from '@/lib/types'
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/cart-sheet"
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Define la prop que recibirá el componente
interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Acepta 'product' como prop
export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  // Usa los datos del producto
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'default')
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Obtén los datos de las props
  const productImages = product.images;
  const sizes = product.sizes;
  const colors = product.colors;
  
  // Obtén productos relacionados dinámicamente

  const handleAddToCart = () => {
    // Llamamos a la función del contexto global
    // Le pasamos: el producto entero, la talla seleccionada y el color seleccionado
    addToCart(product, selectedSize, selectedColor)
  }

  const handleAddToFavorites = () => {
    console.log('Añadido a favoritos')
    toast.info('Producto añadido a favoritos')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header (puedes reemplazarlo por tu header de 'ModaFitStore' si quieres) */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              MODA <span className="text-[#f7b6c2]">FIT</span>
            </h1>
          </Link>
          <div>
            <CartSheet />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#f7b6c2]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Vista ${idx + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-[#222]">{product.name}</h1>
              <p className="mt-2 text-3xl font-semibold text-[#222]">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <p className="text-[#222] leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector - Buttons */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#222]">Talla</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
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
            
            {/* Color Selector */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#222]">Color</label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
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

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-md bg-[#f7b6c2] py-3 font-semibold text-white transition-all hover:bg-[#f5a5b5] hover:shadow-md h-auto text-base"
              >
                Añadir al Carrito
              </Button>
              <Button
                onClick={handleAddToFavorites}
                variant="outline"
                className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-[#f7b6c2] py-3 font-semibold text-[#f7b6c2] transition-all hover:bg-[#f7b6c2] hover:text-white h-auto text-base"
              >
                <Heart className="h-5 w-5" />
                Agregar a Favoritos
              </Button>
            </div>

            {/* Product Details Accordion (Usando shadcn/ui) */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-[#222]">
                  Detalles del producto y cuidado
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 space-y-2 text-[#222]">
                    <p>• Material: 82% poliéster, 18% elastano</p>
                    <p>• Tecnología de absorción de humedad</p>
                    <p>• Costuras planas para mayor comodidad</p>
                    <p>• Lavar a máquina en agua fría</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Customer Reviews */}
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#222]">Opiniones de clientas</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= 4 ? 'fill-[#f7b6c2] text-[#f7b6c2]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-[#222]">4.9/5</span>
                </div>
              </div>
              <p className="text-sm text-[#222]">Basado en 127 opiniones</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#222]">Productos relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                href={`/producto/${relatedProduct.id}`}
                key={relatedProduct.id}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#222]">{relatedProduct.name}</h3>
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
      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#222] hover:text-[#f7b6c2]">
                About Us
              </a>
              <a href="#" className="text-sm text-[#222] hover:text-[#f7b6c2]">
                Contact
              </a>
              <a href="#" className="text-sm text-[#222] hover:text-[#f7b6c2]">
                Shipping & Returns
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-[#222] hover:text-[#f7b6c2]">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2]">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2]">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}