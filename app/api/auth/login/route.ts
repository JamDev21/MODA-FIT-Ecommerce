import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    // 1. Recibimos los datos del formulario
    const { email, password } = await request.json();

    // 2. Buscamos el usuario en MongoDB
    const user = await User.findOne({ email });

    // 3. Si no existe el usuario
    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' }, 
        { status: 401 }
      );
    }

    // 4. Verificar contraseña (comparación directa por ahora)
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Contraseña incorrecta' }, 
        { status: 401 }
      );
    }

    // 5. ¡Login exitoso!
    // (Aquí podrías devolver un token, pero por ahora devolvemos éxito)
    return NextResponse.json({ 
      message: 'Login exitoso', 
      user: { email: user.email, role: user.role } 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error en el servidor' }, 
      { status: 500 }
    );
  }
}