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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample product data
const products = [
  { id: 1, name: "Leggings Deportivos", sku: "LGG-001", price: "$45.00", stock: 120 },
  { id: 2, name: "Top Fitness Rosa", sku: "TOP-002", price: "$32.00", stock: 85 },
  { id: 3, name: "Conjunto Yoga", sku: "CNJ-003", price: "$78.00", stock: 45 },
  { id: 4, name: "Sports Bra Negro", sku: "BRA-004", price: "$28.00", stock: 200 },
  { id: 5, name: "Shorts Running", sku: "SHT-005", price: "$35.00", stock: 150 },
  { id: 6, name: "Chaqueta Deportiva", sku: "CHQ-006", price: "$65.00", stock: 60 },
  { id: 7, name: "Mallas Compresión", sku: "MLL-007", price: "$52.00", stock: 95 },
]

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
                onClick={() => console.log("Añadir producto")}
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
                      <TableCell className="text-foreground font-medium">{product.price}</TableCell>
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
                            onClick={() => console.log("Editar", product.id)}
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          </button>
                          <button
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                            onClick={() => console.log("Eliminar", product.id)}
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
    </div>
  )
}
