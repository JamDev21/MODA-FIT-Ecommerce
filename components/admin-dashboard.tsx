"use client"

import { useState } from "react"
import {
  LayoutGrid,
  Tag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Plus,
  Download,
  Filter,
  Pencil,
  Trash2,
  Search,
  ShoppingBag,
  User,
  X,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Product = {
  id: number
  name: string
  sku: string
  price: string
  stock: number
  description?: string
  category?: string
}

const navItems = [
  { name: "Dashboard", icon: LayoutGrid, active: true },
  { name: "Productos", icon: Tag, active: false },
  { name: "Pedidos", icon: ShoppingCart, active: false },
  { name: "Usuarios", icon: Users, active: false },
  { name: "Reportes", icon: BarChart3, active: false },
  { name: "Configuración", icon: Settings, active: false },
]

export function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard")

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Leggings Deportivos",
      sku: "LGG-001",
      price: "45.00",
      stock: 120,
      description: "Leggings de alta calidad",
      category: "Leggings",
    },
    {
      id: 2,
      name: "Top Fitness Rosa",
      sku: "TOP-002",
      price: "32.00",
      stock: 85,
      description: "Top deportivo color rosa",
      category: "Tops",
    },
    {
      id: 3,
      name: "Conjunto Yoga",
      sku: "CNJ-003",
      price: "78.00",
      stock: 45,
      description: "Conjunto completo para yoga",
      category: "Conjuntos",
    },
    {
      id: 4,
      name: "Sports Bra Negro",
      sku: "BRA-004",
      price: "28.00",
      stock: 200,
      description: "Top deportivo negro",
      category: "Tops",
    },
    {
      id: 5,
      name: "Shorts Running",
      sku: "SHT-005",
      price: "35.00",
      stock: 150,
      description: "Shorts para correr",
      category: "Leggings",
    },
    {
      id: 6,
      name: "Chaqueta Deportiva",
      sku: "CHQ-006",
      price: "65.00",
      stock: 60,
      description: "Chaqueta ligera deportiva",
      category: "Conjuntos",
    },
    {
      id: 7,
      name: "Mallas Compresión",
      sku: "MLL-007",
      price: "52.00",
      stock: 95,
      description: "Mallas de compresión",
      category: "Leggings",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
    category: "Leggings",
  })

  const [editingProduct, setEditingProduct] = useState<number | null>(null)

  const handleAddProduct = () => {
    setFormData({
      name: "",
      description: "",
      sku: "",
      price: "",
      stock: "",
      category: "Leggings",
    })
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      sku: product.sku,
      price: product.price,
      stock: product.stock.toString(),
      category: product.category || "Leggings",
    })
    setEditingProduct(product.id)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  const handleSaveProduct = () => {
    if (!formData.name || !formData.sku || !formData.price || !formData.stock) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    if (editingProduct !== null) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                sku: formData.sku,
                price: formData.price,
                stock: Number.parseInt(formData.stock),
                category: formData.category,
              }
            : p,
        ),
      )
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        price: formData.price,
        stock: Number.parseInt(formData.stock),
        category: formData.category,
      }
      setProducts([...products, newProduct])
    }

    setIsModalOpen(false)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-semibold text-sidebar-foreground tracking-wide">Dashtitles</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activeNav

            return (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 relative
                  ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary-foreground rounded-r-full" />
                )}
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Public Navigation Mockup */}
        <header className="bg-white border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">MODA FIT</h2>

              {/* Category Menu */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Novedades
                </a>
                <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Tops
                </a>
                <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Conjuntos
                </a>
                <a href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Ofertas
                </a>
              </nav>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <Search className="w-5 h-5 text-foreground/70" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <User className="w-5 h-5 text-foreground/70" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 text-foreground/70" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-secondary/30">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Gestión de Productos</h2>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                onClick={handleAddProduct}
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir Producto
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>

            {/* Products Table */}
            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold text-foreground">Nombre de Producto</TableHead>
                    <TableHead className="font-semibold text-foreground">SKU</TableHead>
                    <TableHead className="font-semibold text-foreground">Precio</TableHead>
                    <TableHead className="font-semibold text-foreground">Stock</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                      <TableCell className="text-foreground font-medium">${product.price}</TableCell>
                      <TableCell>
                        <span
                          className={`
                          inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${
                            product.stock > 100
                              ? "bg-green-100 text-green-800"
                              : product.stock > 50
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        `}
                        >
                          {product.stock} unidades
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 hover:bg-primary/10 rounded-lg transition-colors group"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          </button>
                          <button
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-2xl font-bold text-foreground">
                {editingProduct !== null ? "Editar Producto" : "Añadir Nuevo Producto"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Body - Form */}
            <div className="p-6 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre de Producto <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                  placeholder="Ej: Leggings Deportivos"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background resize-none"
                  placeholder="Describe las características del producto..."
                />
              </div>

              {/* SKU and Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SKU <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleFormChange("sku", e.target.value)}
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                    placeholder="Ej: LGG-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                  >
                    <option value="Leggings">Leggings</option>
                    <option value="Tops">Tops</option>
                    <option value="Conjuntos">Conjuntos</option>
                  </select>
                </div>
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Precio (USD) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                    placeholder="45.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Stock <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleFormChange("stock", e.target.value)}
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Photo Upload Area */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Carga de Fotos</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Arrastra y suelta tus imágenes aquí, o{" "}
                    <span className="text-primary font-medium">haz clic para seleccionar</span>
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG hasta 10MB</p>
                </div>
              </div>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProduct}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                Guardar Producto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
