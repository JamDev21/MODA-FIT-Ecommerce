import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';
// 1. OBTENER TODOS LOS PRODUCTOS (GET)
export async function GET() {
  try {
    await connectDB();
    // Buscamos todos y ordenamos por fecha de creación (más nuevos primero)
    const products = await Product.find({}).sort({ createdAt: -1 });

   return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar productos' }, { status: 500 });
  }
}

// 2. CREAR UN NUEVO PRODUCTO (POST)
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // --- VALIDACIONES ---
    if (!body.name || !body.category) {
        return NextResponse.json({ error: 'Nombre y Categoría son obligatorios' }, { status: 400 });
    }

    // Validar que precio y stock sean números
    if (isNaN(Number(body.price)) || isNaN(Number(body.stock))) {
        return NextResponse.json({ error: 'Precio y Stock deben ser números válidos' }, { status: 400 });
    }

    // Generar ID autoincremental simple (buscamos el último ID)
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    // Crear el producto en MongoDB
    const newProduct = await Product.create({
      id: newId,
      name: body.name,
      sku: body.sku,
      price: body.price,
      stock: body.stock,
      description: body.description,
      care: body.care || "",
      category: body.category,
      // Si viene un array de imágenes úsalo, si no, pon placeholder
      images: body.images && body.images.length > 0 ? body.images : ['/placeholder.svg'],
      sizes: body.sizes || [], 
      colors: body.colors || []
    });

    return NextResponse.json(newProduct, { status: 201 });

  } catch (error: any) {
    console.error("❌ ERROR EN POST /api/products:", error); 
    return NextResponse.json({ 
        error: error.message || 'Error al crear producto en base de datos' 
    }, { status: 500 });
  }
}