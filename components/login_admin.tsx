"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" 

export function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // --- LÓGICA MODIFICADA PARA SONNER ---
    if (email === "admin@modafit.com" && password === "123456") {
      // 2. Mostrar toast de éxito (estilo sonner)
      toast.success("Acceso concedido", { 
        description: "Bienvenido administrador",
      })

      // 3. Redirigir al dashboard
      router.push("/admin_dashboard")
      return
    }

    // 4. Mostrar toast de error (estilo sonner)
    toast.error("Acceso denegado", { 
      description: "Correo o contraseña incorrectos",
    })
    // ------------------------------------
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Tarjeta de Login */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#222]">
            MODA <span className="text-[#f7b6c2]">FIT</span>
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-[#222] text-center mb-8">Panel de Administración</h2>

        {/* Campo Email */}
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
          />
        </div>

        {/* Campo Contraseña */}
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
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-[#f7b6c2] text-white font-semibold py-3 rounded-lg hover:bg-[#f5a3b5] transition-colors duration-200"
        >
          Ingresar
        </button>
      </form>

      {/* Bloque de Credenciales de Prueba */}
      <div className="mt-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md">
        <h3 className="text-sm font-semibold text-[#222] mb-2">Credenciales de Prueba (Demo)</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Usuario:</span> admin@modafit.com
          </p>
          <p>
            <span className="font-medium">Pass:</span> 123456
          </p>
        </div>
      </div>
    </div>
  )
}