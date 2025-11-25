import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true }, // Mantenemos tu ID numérico para no romper URLs
  name: { type: String, required: true },
  sku: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  care: { type: String, default: "" },
  images: [{ type: String }], // Array de strings
  sizes: [{ type: String }],
  colors: [{
    name: String,
    hex: String,
    label: String,
    _id: false
  }],
  category: { type: String, required: true },
}, { timestamps: true }); // Añade fecha de creación automáticamente

// Si el modelo ya existe (hot reload), úsalo; si no, créalo.
const Product = models.Product || model('Product', ProductSchema);

export default Product;