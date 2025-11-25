"use client"

import { useState, useEffect, useMemo } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  LayoutGrid, Tag, ShoppingCart, Users, BarChart3, Settings,
  Plus, Download, Filter, Pencil, Trash2, Search, ShoppingBag, User, X, Upload, Check,
  RefreshCcw, // Icono para cambiar el modo de categoría
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Categorías base (siempre estarán ahí)
const DEFAULT_CATEGORIES = ["Leggings", "Tops", "Conjuntos", "Accesorios"];

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL"];
const AVAILABLE_COLORS = [
  { name: "negro", hex: "#222222", label: "Negro" },
  { name: "blanco", hex: "#ffffff", label: "Blanco" },
  { name: "rosa", hex: "#f7b6c2", label: "Rosa" },
  { name: "azul", hex: "#3b82f6", label: "Azul" },
  { name: "verde", hex: "#22c55e", label: "Verde" },
  { name: "rojo", hex: "#ef4444", label: "Rojo" },
  { name: "gris", hex: "#6b7280", label: "Gris" },
];

type Product = {
  id: number
  name: string
  sku: string
  price: number
  stock: number
  description?: string
  care?: string
  category?: string
  images?: string[]
  sizes?: string[]
  colors?: { name: string; hex: string; label: string }[]
}

const navItems = [
  { name: "Dashboard", icon: LayoutGrid, active: true },
  { name: "Salir", icon: LogOut, active: false },
]

export function AdminDashboard() {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  
// Función para manejar el click en el menú
  const handleNavClick = (itemName: string) => {
    if (itemName === "Salir") {
      router.push("/") // 👈 Redirige al inicio
    } else {
      setActiveNav(itemName) // 👈 Cambia la vista normal
    }
  }

  // Estado para controlar si estamos escribiendo una categoría nueva
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    care: "",
    sku: "",
    price: "",
    stock: "",
    category: "", 
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as any[]
  })

  // Calculamos las categorías disponibles dinámicamente
  // (Combina las por defecto + las que ya existen en los productos descargados)
  const dynamicCategories = useMemo(() => {
    const existingCategories = products.map(p => p.category).filter(Boolean) as string[];
    // Usamos Set para eliminar duplicados
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...existingCategories]));
  }, [products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      toast.error("Error al cargar productos")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const resetForm = () => {
    setFormData({
      name: "", description: "", care: "", sku: "", price: "", stock: "", 
      category: "Leggings", images: [], sizes: [], colors: []
    })
    setIsCustomCategory(false) // Resetear modo categoría al limpiar
  }

  const handleAddProduct = () => {
    resetForm()
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      care: product.care || "",
      sku: product.sku || "",
      price: (product.price || 0).toString(),
      stock: (product.stock || 0).toString(),
      
      category: product.category || "Leggings",
      images: product.images || [],
      sizes: product.sizes || [],
      colors: product.colors || []
    })
    setEditingProduct(product.id)
    setIsModalOpen(true)
    setIsCustomCategory(false)
  }

  // Helpers para UI
  const toggleSize = (size: string) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const toggleColor = (colorObj: any) => {
    setFormData(prev => {
      const exists = prev.colors.some(c => c.name === colorObj.name);
      const newColors = exists
        ? prev.colors.filter(c => c.name !== colorObj.name)
        : [...prev.colors, colorObj];
      return { ...prev, colors: newColors };
    });
  };

  // Manejo inteligente del cambio de categoría
  const handleCategoryChange = (value: string) => {
    if (value === "new_custom_category") {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, category: "" })); // Limpiar para que escriban
    } else {
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
        if (res.ok) {
          toast.success("Producto eliminado")
          fetchProducts()
        } else {
          toast.error("No se pudo eliminar")
        }
      } catch (error) {
        toast.error("Error de conexión")
      }
    }
  }

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.sku || !formData.price || !formData.category) {
      toast.warning("Nombre, SKU, Precio y Categoría son obligatorios")
      return
    }

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    try {
      const url = editingProduct !== null ? `/api/products/${editingProduct}` : '/api/products';
      const method = editingProduct !== null ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      })

      if (!res.ok) throw new Error('Error en la operación')
      
      toast.success(editingProduct !== null ? "Producto actualizado" : "Producto creado")
      fetchProducts()
      setIsModalOpen(false)

    } catch (error) {
      console.error(error)
      toast.error("Hubo un error al guardar")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-[#222] text-white border-r flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold tracking-wide">MODA FIT <span className="text-[#f7b6c2]">ADMIN</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.name} onClick={() => handleNavClick(item.name)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800">
              <item.icon className="w-5 h-5" /> {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Gestión de Productos</h2>
            <Button onClick={handleAddProduct} className="bg-[#222] text-white hover:bg-black">
              <Plus className="w-4 h-4 mr-2" /> Añadir Producto
            </Button>
          </div>


          <div className="bg-white rounded-lg shadow border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Precio (MXN)</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Variantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="font-bold text-green-700">{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-600 uppercase">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {product.colors?.map((c, i) => (
                          <div key={i} className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: c.hex}} title={c.label}/>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.sizes?.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEditProduct(product)} className="p-2 hover:text-blue-600"><Pencil className="w-4 h-4"/></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingProduct !== null ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Fila 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Producto *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#f7b6c2] outline-none" />
                </div>
                
                {/* SELECTOR DINÁMICO DE CATEGORÍA */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-gray-700">Categoría *</label>
                    <button 
                      type="button" 
                      onClick={() => setIsCustomCategory(!isCustomCategory)}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <RefreshCcw className="w-3 h-3" /> Cambiar
                    </button>
                  </div>
                  
                  {isCustomCategory ? (
                    <input 
                      type="text" 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full border rounded-lg p-2.5 bg-blue-50 focus:ring-2 focus:ring-[#f7b6c2] outline-none placeholder:text-gray-400" 
                      placeholder="Nueva categoría..." 
                      autoFocus
                    />
                  ) : (
                    <select 
                      value={formData.category} 
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full border rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#f7b6c2] outline-none"
                    >
                      {dynamicCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option disabled>──────────</option>
                      <option value="new_custom_category" className="font-bold text-blue-600">+ Crear Nueva...</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Fila 2 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">SKU *</label>
                  <input type="text" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#f7b6c2] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Precio (MXN) *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#f7b6c2] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#f7b6c2] outline-none" />
                </div>
              </div>

              {/* Tallas y Colores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Tallas</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                          formData.sizes.includes(size) 
                            ? "bg-[#222] text-white border-[#222]" 
                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Colores</label>
                  <div className="flex flex-wrap gap-3">
                    {AVAILABLE_COLORS.map((color) => {
                      const isSelected = formData.colors.some(c => c.name === color.name);
                      return (
                        <button
                          key={color.name}
                          onClick={() => toggleColor(color)}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                            isSelected 
                              ? "ring-2 ring-offset-2 ring-[#f7b6c2] scale-110" 
                              : "border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.label}
                        >
                          {isSelected && <Check className={`w-4 h-4 ${color.name === 'blanco' ? 'text-black' : 'text-white'}`} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                  <textarea rows={2} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border rounded-lg p-2.5 resize-none focus:ring-2 focus:ring-[#f7b6c2] outline-none" placeholder="Resumen..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cuidados y Materiales</label>
                  <textarea rows={3} value={formData.care} onChange={(e) => setFormData({...formData, care: e.target.value})}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#f7b6c2] outline-none" placeholder="Lavar a mano..." />
                </div>
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Imagen Principal</label>
                <CldUploadWidget 
                  uploadPreset="modafit_preset" // ⚠️ ASEGÚRATE DE QUE ESTE SEA TU PRESET REAL
                  onSuccess={(result: any) => {
                    const imageUrl = result.info.secure_url;
                    setFormData(prev => ({ ...prev, images: [imageUrl] }));
                    toast.success("Imagen cargada");
                  }}
                >
                  {({ open }) => (
                    <div onClick={() => open()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                      {formData.images.length > 0 ? (
                        <div className="flex flex-col items-center">
                          <img src={formData.images[0]} alt="Preview" className="h-40 object-contain rounded-md shadow-sm mb-2" />
                          <span className="text-xs text-blue-600 font-medium">Clic para cambiar</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-500">
                          <Upload className="w-10 h-10 mb-2 text-gray-400" />
                          <p>Subir imagen</p>
                        </div>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 sticky bottom-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveProduct} className="bg-[#222] text-white hover:bg-black">
                {editingProduct !== null ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}