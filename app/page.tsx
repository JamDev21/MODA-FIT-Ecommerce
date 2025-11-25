import { ModaFitStore } from "@/components/moda-fit-store"
import { getProducts } from "@/lib/products"

// Esto asegura que la página se regenere con datos nuevos y no use caché viejo
export const dynamic = 'force-dynamic' 

export default async function Page() {
  // 👇 AÑADIMOS 'await' PORQUE AHORA VIENE DE LA BASE DE DATOS
  const products = await getProducts()

  return <ModaFitStore products={products} />
}