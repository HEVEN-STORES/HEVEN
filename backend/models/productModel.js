// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   type: { type: String, required: true },
//   features: { type: String, required: true },
//   quality: { type: String, required: true },
//   actualPrice: { type: Number, required: true },
//   price: { type: Number, required: true },
//   image: { type: Array, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String, required: true },
//   sizes: { type: Array, required: true },
//   bestseller: { type: Boolean },
//   date: { type: Number, required: true },
// });
  
// const productModel = mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  features: { type: String, required: true },
  quality: { type: String, required: true },
  actualPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },

  // 🚀 Pre-order fields
  isPreOrder: { type: Boolean, default: false },
  preOrderAvailableDate: { type: Date },
  maxPreOrderQty: { type: Number },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

