// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, require: true },
//     description: { type: String, require: true },
//     actualPrice: { type: Number, require: true },
//     price: { type: Number, require: true },
//     image: { type: Array, require: true },
//     category: { type: String, require: true },
//     subCategory: { type: String, require: true },
//     sizes: { type: Array, require: true },
//     bestseller: { type: Boolean },
//     date: { type: Number, require: true },

// })

// const productModel = mongoose.models.product|| mongoose.model("product",productSchema);

// export default productModel



import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    features: { type: String, require: true },
    quality: { type: String, require: true },
    actualPrice: { type: Number, require: true },
    price: { type: Number, require: true },
    image: { type: Array, require: true },
    category: { type: String, require: true },
    subCategory: { type: String, require: true },
    sizes: { type: Array, require: true },
    bestseller: { type: Boolean },
    date: { type: Number, require: true },

})

const productModel = mongoose.models.product|| mongoose.model("product",productSchema);

export default productModel
