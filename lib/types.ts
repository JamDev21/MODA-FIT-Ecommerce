// Aquí solo definimos CÓMO se ven los datos.
// No importamos mongoose ni nada de backend.

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string; label: string }[];
  category: string;
  _id?: string;
}