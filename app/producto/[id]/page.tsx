import { getProductById, getRelatedProducts } from '@/lib/products'
import { ProductDetail } from '@/components/product-detail'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

// 1. Actualizamos el tipo: params es ahora una Promise
export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. ¡ESPERAMOS! (await) a que se resuelvan los params
  const { id } = await params
  
  // 3. Ahora ya tenemos el string "1", "2", etc. y podemos convertirlo
  const productId = Number(id)

  const product = await getProductById(productId)

  if (!product) {
    notFound()
  }

  //  1. OBTENEMOS LOS RELACIONADOS AQUÍ (En el servidor)
  const relatedProducts = await getRelatedProducts(productId, product.category)

  //  2. SE LOS PASAMOS AL COMPONENTE COMO PROP
  return <ProductDetail product={product} relatedProducts={relatedProducts} />

}