import connectDB from "@/lib/db";
import ProductModel from "@/models/Product";
import { Product } from "@/lib/types";

// Exportamos la interfaz para que otros archivos de servidor la usen
export type { Product };

// Función auxiliar para limpiar un producto individual
// Esto evita repetir código y asegura que SIEMPRE se limpie igual
const cleanProduct = (p: any): Product => {
  return {
    ...p,
    _id: p._id.toString(), // Convertir el ID principal a string
    
    // 👇 AQUÍ ESTÁ LA MAGIA: Reconstruimos el array de colores SIN el _id
    colors: p.colors?.map((c: any) => ({
      name: c.name,
      hex: c.hex,
      label: c.label
    })) || [],
    
    // Aseguramos que otros arrays existan
    images: p.images || [],
    sizes: p.sizes || []
  };
};

// 1. Obtener TODOS los productos
export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({}).lean();
  // Usamos la función de limpieza
  return products.map(cleanProduct);
}

// 2. Obtener UN producto por ID
export async function getProductById(id: number): Promise<Product | null> {
  await connectDB();
  const product = await ProductModel.findOne({ id: id }).lean();
  
  if (!product) return null;
  
  // Usamos la función de limpieza
  return cleanProduct(product);
}

// 3. Obtener relacionados
export async function getRelatedProducts(currentProductId: number, category: string): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({
    category: category,
    id: { $ne: currentProductId }
  }).limit(4).lean();
  
  // Usamos la función de limpieza (¡Esto es lo que faltaba!)
  return products.map(cleanProduct);
}