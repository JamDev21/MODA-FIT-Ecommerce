"use client"

import { useState } from "react"
import { Search, ShoppingCart, User, Heart, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  isFavorite: boolean
}

export function ModaFitStore() {
  //const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Sculpt Leggings",
      price: 25.99,
      imageUrl: "./images/black-athletic-leggings.jpg",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Sculpt Leggings",
      price: 25.99,
      imageUrl: "./images/black-high-waist-leggings.jpg",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Stride Sports Bra",
      price: 16.99,
      imageUrl: "./images/pink-sports-bra.jpg",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Active Short Set",
      price: 24.99,
      imageUrl: "./images/pink-top-black-shorts-set.jpg",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Sculpt",
      price: 19.99,
      imageUrl: "./images/black-crop-top-leggings.jpg",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Flow Tank Top",
      price: 24.99,
      imageUrl: "./images/pink-tank-top-athletic.jpg",
      isFavorite: false,
    },
  ])

  const [cartCount, setCartCount] = useState(2)

  const handleAddToCart = (productId: number) => {
  toast.success("Producto añadido", {
    description: "Se agregó al carrito correctamente.",
  })
}


  const toggleFavorite = (productId: number) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product)),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#333] shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-white">MODA </span>
            <span className="text-[#f7b6c2]">FIT</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              New Arrivals
            </a>
            <a href="#" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Leggings
            </a>
            <a href="#" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Tops
            </a>
            <a href="#" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Accessories
            </a>
            <a href="#" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Sale
            </a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-white" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-white/60 w-24"
              />
            </div>
            <button className="relative text-white hover:text-[#f7b6c2] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f7b6c2] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-white hover:text-[#f7b6c2] transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#4a4a4a] to-[#6a6a6a] overflow-hidden">
        <div className="container mx-auto px-6 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#f7b6c2] leading-[1.1]">MODA FIT</h1>
              <p className="text-white text-base md:text-lg max-w-sm leading-snug">
                Ropa deportiva premium: cómoda, resistente y diseñada para tu rendimiento.                                                                      
                Viste MODA, Viste FIT
              </p>
              <Button
                onClick={() => handleAddToCart(0)}
                className="bg-[#f7b6c2] hover:bg-[#f7b6c2]/90 text-white font-semibold px-8 py-6 text-base"
              >
                Añadir
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img
                src="/images/image_fondo.png"
                alt="Atleta MODA FIT"
                className="w-full h-auto object-contain scale-125 md:scale-150"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
      </section>

      {/* Product Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      product.isFavorite
                        ? "bg-[#f7b6c2] text-white"
                        : "bg-white/80 text-gray-600 hover:bg-[#f7b6c2] hover:text-white"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${product.isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-[#222] text-base">{product.name}</h3>
                  <p className="text-xl font-bold text-[#222]">${product.price.toFixed(2)}</p>
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-[#222] hover:bg-[#222]/90 text-white font-medium py-2 transition-all hover:shadow-lg"
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Footer Links */}
            <div className="flex gap-8">
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                About Us
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                Shipping & Returns
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
