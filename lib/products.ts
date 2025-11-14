// Definimos un tipo de producto más completo
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string; label: string }[];
  category: string;
}

// Nuestra "Base de Datos" de productos
const allProducts: Product[] = [
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
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'Pink', hex: '#f588ffff', label: 'Rosa' },
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
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'black', hex: '#222222', label: 'Negro' },
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
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'Orange', hex: '#ffae00ff', label: 'Naranja' },
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
      '/images/pink-tank-top-athletic.jpg' // (Asegúrate de tener esta imagen si la tienes)
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'pink', hex: '#f7b6c2', label: 'Rosa' },
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'black', hex: '#222222', label: 'Negro' },
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
      { name: 'Rosa', hex: '#f12bf8ff', label: 'Rosa' },
      { name: 'white', hex: '#ffffff', label: 'Blanco' },
      { name: 'black', hex: '#222222', label: 'Negro' },
      { name: 'Red', hex: '#f30202ff', label: 'Rojo' },
    ],
    category: 'Leggings' // (O puedes crear una categoría 'Shorts')
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
      { name: 'black', hex: '#222222', label: 'Negro' },
      { name: 'Pink', hex: '#f12bf8ff', label: 'Rosa' },
    ],
    category: 'Tops'
  }
];

// Función para obtener todos los productos
export function getProducts() {
  return allProducts;
}

// Función para obtener un producto por su ID
export function getProductById(id: number) {
  return allProducts.find((product) => product.id === id);
}

// Función para obtener productos relacionados (ej: misma categoría)
export function getRelatedProducts(currentProductId: number, category: string) {
  return allProducts.filter(
    (product) => product.category === category && product.id !== currentProductId
  ).slice(0, 4); // Muestra hasta 4 productos relacionados
}