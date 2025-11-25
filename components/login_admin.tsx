"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" 

export function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Estado de carga

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // Activamos estado de carga

    try {
      // 👇 1. Llamada a TU base de datos (vía API)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // ✅ Éxito
        toast.success("Acceso concedido", { 
          description: "Bienvenido administrador",
        })
        // Redirigir al dashboard
        router.push("/admin_dashboard")
      } else {
        // ❌ Error (Usuario no encontrado o contraseña mal)
        toast.error("Acceso denegado", { 
          description: data.message || "Credenciales incorrectas",
        })
      }
    } catch (error) {
      toast.error("Error de conexión", { 
        description: "No se pudo conectar con el servidor",
      })
    } finally {
      setIsLoading(false) // Desactivamos carga pase lo que pase
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Tarjeta de Login */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#222]">
            MODA <span className="text-[#f7b6c2]">FIT</span>
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-[#222] text-center mb-8">Panel de Administración</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-[#222] mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b6c2] focus:border-transparent"
            placeholder="admin@modafit.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-[#222] mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b6c2] focus:border-transparent"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#f7b6c2] text-white font-semibold py-3 rounded-lg hover:bg-[#f5a3b5] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verificando..." : "Ingresar"}
        </button>
      </form>

      {/* Bloque de Credenciales (Informativo) */}
      <div className="mt-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md">
        <h3 className="text-sm font-semibold text-[#222] mb-2">Credenciales de Prueba (MongoDB)</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Usuario:</span> admin@modafit.com</p>
          <p><span className="font-medium">Pass:</span> 123456</p>
        </div>
      </div>
    </div>
  )
}