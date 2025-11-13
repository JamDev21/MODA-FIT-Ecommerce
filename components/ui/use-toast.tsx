"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"

type ToastMessage = {
  id: string
  title?: string
  description?: string
}

type ToastContextType = {
  toasts: ToastMessage[]
  toast: (props: Omit<ToastMessage, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<any[]>([])

  const toast = (message: string) => {
    setToasts((prev) => [...prev, { id: Date.now(), message }])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { useToast, ToastProvider}