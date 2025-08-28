
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add Product with Pre-order Support
const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      actualPrice,
      type,
      features,
      quality,
      isPreOrder,
      preOrderAvailableDate,
      maxPreOrderQty,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      type,
      quality,
      features,
      category,
      subCategory,
      actualPrice: Number(actualPrice),
      price: Number(price),
      bestseller: bestseller === 'true',
      isPreOrder: isPreOrder === 'true',
      preOrderAvailableDate: isPreOrder === 'true' ? new Date(preOrderAvailableDate) : null,
      maxPreOrderQty: isPreOrder === 'true' ? Number(maxPreOrderQty) || null : null,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product Added' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// List All Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Product by ID
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Single Product by ID
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Product Details (without image editing)
const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      description,
      type,
      features,
      quality,
      price,
      actualPrice,
      isPreOrder,
      preOrderAvailableDate,
      maxPreOrderQty,
    } = req.body;

    const updatedFields = {
      name,
      description,
      type,
      features,
      quality,
      price: Number(price),
      actualPrice: Number(actualPrice),
      isPreOrder: isPreOrder === true || isPreOrder === 'true',
      preOrderAvailableDate: isPreOrder === 'true' ? new Date(preOrderAvailableDate) : null,
      maxPreOrderQty: isPreOrder === 'true' ? Number(maxPreOrderQty) || null : null,
    };

    const updated = await productModel.findByIdAndUpdate(_id, updatedFields, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully', updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProducts,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
};




