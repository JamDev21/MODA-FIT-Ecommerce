"use client"

import { useState, useMemo } from "react"
import { Search, ShoppingCart, User, Heart, Facebook, Instagram, Twitter, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link";
import { Product } from "@/lib/types"

export function ModaFitStore({ products }: { products: Product[] }) {
  const [cartCount, setCartCount] = useState(2)
  
  // 1. Estados para filtros
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('') // 👈 Nuevo estado para búsqueda

  // 2. Lógica de filtrado inteligente (Búsqueda > Categoría)
  const filteredProducts = useMemo(() => {
    // A. Si hay texto en el buscador, ignoramos categorías y buscamos en todo
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      return products.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        p.category.toLowerCase().includes(lowerTerm) ||
        p.description.toLowerCase().includes(lowerTerm)
      );
    }

    // B. Si no hay búsqueda, aplicamos filtros de categoría normales
    if (activeCategory === 'all') {
      return products;
    }
    
    if (activeCategory === 'new') {
      return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
    }

    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory, searchTerm]);

  // Handler para limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
  }

  const handleNavClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setActiveCategory(category);
    setSearchTerm(''); // Limpiamos búsqueda al cambiar de categoría
    
    const catalogSection = document.getElementById('product-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler para el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Si el usuario empieza a escribir, hacemos scroll automático al catálogo
    if (e.target.value.length === 1) {
        document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, productName: string) => {
    e.preventDefault() 
    e.stopPropagation(); 
    toast.success("Producto añadido", {
      description: `${productName} se agregó al carrito.`,
    })
    setCartCount(prev => prev + 1)
  }

  const toggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.preventDefault() 
    e.stopPropagation();
    toast.info("Producto añadido a favoritos")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#333] shadow-md transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">          
          {/* Logo */}
          <div 
            className="text-2xl font-bold cursor-pointer"
            onClick={(e) => handleNavClick(e, 'all')}
          >
            <span className="text-white">MODA </span>
            <span className="text-[#f7b6c2]">FIT</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, 'new')}
              className={`transition-colors text-sm ${activeCategory === 'new' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}
            >
              New Arrivals
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, 'Leggings')}
              className={`transition-colors text-sm ${activeCategory === 'Leggings' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}
            >
              Leggings
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, 'Tops')}
              className={`transition-colors text-sm ${activeCategory === 'Tops' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}
            >
              Tops
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, 'Conjuntos')}
              className={`transition-colors text-sm ${activeCategory === 'Conjuntos' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}
            >
              Conjuntos
            </a>
            <Link href="/admin-login" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Admin
            </Link>
          </nav>

          {/* Action Icons & Search */}
          <div className="flex items-center gap-4">
            {/* 👇 INPUT DE BÚSQUEDA FUNCIONAL */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 border border-transparent focus-within:border-[#f7b6c2]/50 transition-all">
              <Search className="h-4 w-4 text-white" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-white/60 w-24 focus:w-32 transition-all"
              />
              {/* Botón pequeño para limpiar búsqueda si hay texto */}
              {searchTerm && (
                <button onClick={clearSearch}>
                    <X className="h-3 w-3 text-white/70 hover:text-white" />
                </button>
              )}
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
            <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#f7b6c2] leading-[1.1]">MODA FIT</h1>
              <p className="text-white text-base md:text-lg max-w-sm leading-snug">
                Ropa deportiva premium: cómoda, resistente y diseñada para tu rendimiento.
              </p>
              <p className="text-white text-base md:text-lg max-w-sm leading-snug">
                Viste MODA, Viste FIT
              </p>
              <Button
                onClick={(e) => handleNavClick(e, 'new')}
                className="bg-[#f7b6c2] hover:bg-[#f7b6c2]/90 text-white font-semibold px-8 py-6 text-base"
              >
                Ver Colección 
              </Button>
            </div>

            <div className="relative">
              <img
                src="/images/image_fondo.png"
                alt="Atleta MODA FIT"
                className="w-full h-auto object-contain scale-125 md:scale-150"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
      </section>

      {/* Product Catalog */}
      <section id="product-catalog" className="py-16 bg-gray-50 min-h-[600px]">
        <div className="container mx-auto px-6">
          
          {/* Título Dinámico */}
          <h2 className="text-3xl font-bold text-[#222] mb-8 text-center uppercase tracking-wide">
             {searchTerm ? `Resultados para "${searchTerm}"` : 
              activeCategory === 'all' ? 'Catálogo Completo' : 
              activeCategory === 'new' ? 'Novedades' : 
              activeCategory}
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  href={`/producto/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white/80 text-gray-600 hover:bg-[#f7b6c2] hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-[#222] text-base line-clamp-1">{product.name}</h3>
                    <p className="text-xl font-bold text-[#222]">${product.price.toFixed(2)}</p>
                    <Button
                      onClick={(e) => handleAddToCart(e, product.name)}
                      className="w-full bg-[#222] hover:bg-[#222]/90 text-white font-medium py-2 transition-all hover:shadow-lg"
                    >
                      Añadir
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Mensaje de No Encontrado
            <div className="text-center py-20">
                <p className="text-xl text-gray-400 mb-4">
                    {searchTerm ? `No encontramos productos que coincidan con "${searchTerm}"` : "No hay productos en esta categoría."}
                </p>
                <Button 
                    variant="outline" 
                    className="text-[#222] border-[#222] hover:bg-gray-100"
                    onClick={(e) => {
                        setSearchTerm('');
                        handleNavClick(e, 'all');
                    }}
                >
                    Ver todos los productos
                </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8">
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">About Us</a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">Contact</a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">Shipping & Returns</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}