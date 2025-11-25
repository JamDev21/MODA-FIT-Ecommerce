import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';

// 👇 DATOS FIJOS PARA RESTAURAR LA BASE DE DATOS
const initialProducts = [
  {
    id: 1,
    name: 'TOP DEPORTIVO ACTIVELUX',
    price: 68.00,
    description: 'Top deportivo de alto rendimiento diseñado para brindarte comodidad y estilo durante tus entrenamientos más intensos. Fabricado con tecnología de absorción de humedad y tejido de compresión suave.',
    images: [
      '/images/pink-athletic-sports-bra-front-view.jpg',
      '/images/pink-athletic-sports-bra-side-view.jpg',
      '/images/pink-athletic-sports-bra-back-view.jpg',
      '/images/pink-athletic-sports-bra-detail-view.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'pink', hex: '#f7b6c2', label: 'Rosa' },
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'black', hex: '#222222', label: 'Negro' },
    ],
    category: 'Tops'
  },
  {
    id: 2,
    name: 'Sculpt Leggings Negros',
    price: 25.99,
    description: 'Leggings de cintura alta perfectos para cualquier actividad, desde yoga hasta running. Su tejido no transparenta y ofrece un ajuste perfecto.',
    images: [
      '/images/black-high-waist-athletic-leggings.jpg',
      '/images/black-athletic-leggings.jpg',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'black', hex: '#222222', label: 'Negro' },
    ],
    category: 'Leggings'
  },
  {
    id: 3,
    name: 'Active Short Set',
    price: 24.99,
    description: 'Conjunto de top rosa y shorts negros, ideal para un look deportivo y cómodo. El material es ligero y transpirable.',
    images: [
      '/images/pink-top-black-shorts-set.jpg',
    ],
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'pink-black', hex: '#f7b6c2', label: 'Rosa/Negro' },
    ],
    category: 'Conjuntos'
  },
  {
    id: 4,
    name: 'Sculpt Crop Top',
    price: 19.99,
    description: 'Top corto de manga larga, perfecto para combinar con tus leggings favoritos. Ofrece soporte ligero y mucho estilo.',
    images: [
      '/images/black-crop-top-leggings.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', hex: '#222222', label: 'Negro' },
    ],
    category: 'Tops'
  },
  {
    id: 5,
    name: 'Flow Tank Top Rosa',
    price: 24.99,
    description: 'Camiseta sin mangas ligera y transpirable, perfecta para tus sesiones de yoga o pilates. Su corte holgado te da libertad de movimiento.',
    images: [
      '/images/pink-athletic-tank-top.jpg',
      '/images/pink-tank-top-athletic.jpg' 
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'pink', hex: '#f7b6c2', label: 'Rosa' }
    ],
    category: 'Tops'
  },
  {
    id: 6,
    name: 'Active Shorts Negros',
    price: 19.99,
    description: 'Shorts deportivos cómodos y versátiles. Cuentan con una cintura elástica ancha para un ajuste seguro y un tejido que absorbe la humedad.',
    images: [
      '/images/black-athletic-shorts.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'black', hex: '#222222', label: 'Negro' }
    ],
    category: 'Leggings'
  },
  {
    id: 7,
    name: 'Stride Sports Bra Blanco',
    price: 16.99,
    description: 'Soporte medio para tus entrenamientos diarios. Este bra deportivo combina funcionalidad y un diseño limpio en color blanco.',
    images: [
      '/images/athletic-sports-bra.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'black', hex: '#222222', label: 'Negro' }
    ],
    category: 'Tops'
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // 1. Limpiar la base de datos (Borrar todo lo anterior)
    await Product.deleteMany({});
    await User.deleteMany({});

    // 2. Insertar los productos desde el array local de este archivo
    await Product.insertMany(initialProducts);

    // 3. Crear el usuario admin
    await User.create({
      email: 'admin@modafit.com',
      password: '123456',
      role: 'admin'
    });

    return NextResponse.json({ 
      message: '¡Base de datos restaurada!', 
      productsCount: initialProducts.length,
      userCreated: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error al sembrar datos', 
      details: error 
    }, { status: 500 });
  }
}