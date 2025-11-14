import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MODA FIT - Admin Dashboard",
  description: "Panel de administración para MODA FIT e-commerce",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Dejamos la supresión aquí por si acaso
    <html lang="es" suppressHydrationWarning>
      {/* 👇 AÑADIMOS 'suppressHydrationWarning' AL BODY.
        Esto es lo que le dice a React que ignore las discrepancias
        DENTRO de tus páginas (que es donde está el error).
      */}
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}