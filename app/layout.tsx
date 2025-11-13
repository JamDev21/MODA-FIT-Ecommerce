import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { ToastProvider } from "@/components/ui/use-toast"
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
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* 🔥 Ahora SÍ todo está dentro del ToastProvider */}
        <ToastProvider>
          {children}
          <Toaster />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
