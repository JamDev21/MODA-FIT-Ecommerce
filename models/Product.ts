import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true }, // Mantenemos tu ID numérico para no romper URLs
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
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