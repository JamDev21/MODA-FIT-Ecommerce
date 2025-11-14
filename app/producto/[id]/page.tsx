// app/producto/[id]/page.tsx
'use client' 

import { useParams, notFound } from 'next/navigation' 
import { getProductById } from '@/lib/products'
import { ProductDetail } from '@/components/product-detail'
import { useEffect, useState } from 'react' 

// Un tipo simple para el estado de carga
type Product = ReturnType<typeof getProductById>;

export default function ProductoPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null | undefined>(null);

  useEffect(() => {
    // Obtenemos el ID de los params
    const id = params.id
    
    if (id) {
      const productId = Number(id)
      const foundProduct = getProductById(productId)
      setProduct(foundProduct)
    }
  }, [params.id]) // Se ejecuta cada vez que el ID de la URL cambia

  // 1. Mientras 'product' es null, estamos cargando
  if (product === null) {
    return <div style={{ color: 'white' }}>Cargando producto...</div>
  }

  // 2. Si 'product' es undefined, no se encontró
  if (product === undefined) {
    notFound() // Muestra la página 404
  }

  // 3. Si encontramos el producto, lo mostramos
  return <ProductDetail product={product} />
}