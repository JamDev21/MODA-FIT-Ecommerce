import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';


// Función para EDITAR (PUT)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params; // Obtenemos el ID de la URL
    const body = await request.json(); // Obtenemos los datos nuevos

    // Buscamos por el campo "id" (tu ID numérico), NO por "_id" (el de MongoDB)
    const updatedProduct = await Product.findOneAndUpdate(
      { id: Number(id) }, 
      body,
      { new: true } // Para que devuelva el dato ya actualizado
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

// Función para ELIMINAR (DELETE)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    // Buscamos y borramos usando tu ID numérico
    const deletedProduct = await Product.findOneAndDelete({ id: Number(id) });

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}