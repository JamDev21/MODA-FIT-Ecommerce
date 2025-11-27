"use client"

import { useState, useMemo } from "react"
import { Search, ShoppingCart, User, Heart, Facebook, Instagram, Twitter, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link";
import { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/cart-sheet"
// 👇 Imports para el Modal del Footer
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ModaFitStore({ products }: { products: Product[] }) {
  const { addToCart } = useCart()
  
  // 1. Estados para filtros
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('') 
  const [cartCount, setCartCount] = useState(2) // Mantenemos tu estado local si lo usas visualmente, aunque CartSheet tiene el suyo

  // Estado para el Modal del Footer
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [infoContent, setInfoContent] = useState({ title: "", content: "" })

  // 2. Lógica de filtrado inteligente (Búsqueda > Categoría)
  const filteredProducts = useMemo(() => {
    // A. Si hay texto en el buscador
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      return products.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        p.category.toLowerCase().includes(lowerTerm) ||
        p.description.toLowerCase().includes(lowerTerm)
      );
    }

    // B. Si no hay búsqueda, filtros de categoría
    if (activeCategory === 'all') {
      return products;
    }
    
    if (activeCategory === 'new') {
      return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
    }

    // Filtro exacto (Mapeando Accessories a lo que haya en BD si es necesario)
    return products.filter(p => p.category === activeCategory || (activeCategory === 'Accessories' && (p.category === 'Conjuntos' || p.category === 'Accesorios')));
  }, [products, activeCategory, searchTerm]);

  // Handler para limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
  }

  const handleNavClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setActiveCategory(category);
    setSearchTerm(''); 
    
    const catalogSection = document.getElementById('product-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler para el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 1) {
        document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //  Handler modificado para que el Carrito FUNCIONE de verdad con la BD
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    // Valores por defecto para añadir directo desde el catálogo
    const defaultSize = product.sizes?.[0] || "U"
    const defaultColor = product.colors?.[0]?.name || "N/A"

    // Guardar en el contexto global (para que aparezca en el CartSheet)
    addToCart(product, defaultSize, defaultColor)
    
    // Tu lógica original de estado local (opcional, pero la dejo para no romper tu diseño)
    setCartCount(prev => prev + 1)
  }

  const toggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.preventDefault() 
    e.stopPropagation();
    toast.info("Producto añadido a favoritos")
  }

  // 👇 Función para abrir el Modal del Footer
  const openFooterInfo = (e: React.MouseEvent, type: 'about' | 'contact' | 'shipping') => {
    e.preventDefault();
    const contents = {
      about: { title: "Sobre Nosotros", content: "En MODA FIT nos dedicamos a empoderar tu entrenamiento con ropa deportiva de alta tecnología y diseño vanguardista." },
      contact: { title: "Contáctanos", content: "📧 Email: contacto@modafit.com\n📱 WhatsApp: +52 56 1504 5665\n📍 Tezoquipa, Atitalaquia. Hgo." },
      shipping: { title: "Envíos y Devoluciones", content: "🚚 Envíos a todo México (3-5 días).\n🔄 Cambios gratis por talla o defecto de fabrica dentro de los primeros 15 días, siempre y cuando la prenda conserve la etiqueta." }
    };
    setInfoContent(contents[type]);
    setInfoModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#333] shadow-md transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">          
          {/* Logo */}
          <div 
            className="text-2xl font-bold cursor-pointer"
            onClick={(e) => {e.preventDefault(); setActiveCategory('all'); setSearchTerm('')}}
          >
            <span className="text-white">MODA </span>
            <span className="text-[#f7b6c2]">FIT</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" onClick={(e) => handleNavClick(e, 'new')} className={`transition-colors text-sm ${activeCategory === 'new' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}>
              New Arrivals
            </a>
            <a href="#" onClick={(e) => handleNavClick(e, 'Leggings')} className={`transition-colors text-sm ${activeCategory === 'Leggings' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}>
              Leggings
            </a>
            <a href="#" onClick={(e) => handleNavClick(e, 'Tops')} className={`transition-colors text-sm ${activeCategory === 'Tops' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}>
              Tops
            </a>
            <a href="#" onClick={(e) => handleNavClick(e, 'Accessories')} className={`transition-colors text-sm ${activeCategory === 'Accessories' && !searchTerm ? 'text-[#f7b6c2] font-semibold' : 'text-white hover:text-[#f7b6c2]'}`}>
              Conjuntos y Accesorios
            </a>
            <Link href="/admin-login" className="text-white hover:text-[#f7b6c2] transition-colors text-sm">
              Admin
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 border border-transparent focus-within:border-[#f7b6c2]/50 transition-all">
              <Search className="h-4 w-4 text-white" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-white/60 w-24 focus:w-32 transition-all"
              />
              {searchTerm && <X className="h-3 w-3 text-white cursor-pointer" onClick={() => setSearchTerm('')} />}
            </div>
            
            {/* Usamos CartSheet para que el carrito funcione de verdad */}
            <CartSheet />
            
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
      <section id="product-catalog" className="py-16 bg-gray-50 min-h-[500px]">
        <div className="container mx-auto px-6">
          
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
                      //  Pasamos el objeto 'product' completo para que el carrito funcione
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-[#222] hover:bg-[#222]/90 text-white font-medium py-2 transition-all hover:shadow-lg"
                    >
                      Añadir
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
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
            {/*  LINKS ACTUALIZADOS CON MODAL */}
            <div className="flex gap-8">
              <a href="#" onClick={(e) => openFooterInfo(e, 'about')} className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                About Us
              </a>
              <a href="#" onClick={(e) => openFooterInfo(e, 'contact')} className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                Contact
              </a>
              <a href="#" onClick={(e) => openFooterInfo(e, 'shipping')} className="text-[#222] hover:text-[#f7b6c2] transition-colors text-sm">
                Shipping & Returns
              </a>
            </div>

            {/*  REDES SOCIALES REALES */}
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="https://wa.me/525615045665" target="_blank" rel="noreferrer" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#222] hover:text-[#f7b6c2] transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/*  COMPONENTE DIALOG PARA LA INFO */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[#f7b6c2] text-2xl font-bold">{infoContent.title}</DialogTitle>
            <DialogDescription className="pt-4 text-[#222] text-base whitespace-pre-line">
              {infoContent.content}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}