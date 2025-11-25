import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { getProducts } from '@/lib/products'; // Tu archivo actual con los datos falsos

export async function GET() {
  try {
    await connectDB();
    
    // 1. Borrar datos viejos para evitar duplicados (opcional)
    await Product.deleteMany({});

    // 2. Obtener los datos de tu archivo local
    const localProducts = getProducts();

    // 3. Insertarlos en MongoDB
    await Product.insertMany(localProducts);

    return NextResponse.json({ message: '¡Datos cargados en MongoDB con éxito!' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}