// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { assets } from '../assets/assets';

// const Product = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const { products, currency, addTOCart } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');

//   useEffect(() => {
//     const currentProduct = products.find((item) => item._id === productId);
//     if (currentProduct) {
//       setProductData(currentProduct);
//       setSelectedImage(currentProduct.image[0]);
//     }
//   }, [productId, products]);

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size before adding to cart.');
//       return;
//     }
//     addTOCart(productData._id, selectedSize);
//     //toast.success('Product added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size before purchasing.');
//       return;
//     }
//     addTOCart(productData._id, selectedSize);
//     navigate('/cart');
//   };

//   if (!productData) return <div className="opacity-0">Loading...</div>;

//   return (
//     <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
//       <ToastContainer />

//       {/* Product Section */}
//       <div className="flex flex-col sm:flex-row gap-12">
//         {/* Product Images */}
//         <div className="flex-1 flex flex-col sm:flex-row-reverse gap-3">
//           <div className="w-full sm:w-[80%]">
//             <img src={selectedImage} alt="Product" className="w-full h-auto" />
//           </div>
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-3 sm:gap-0">
//             {productData.image.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`Thumbnail ${idx}`}
//                 onClick={() => setSelectedImage(img)}
//                 className={`cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 ${
//                   selectedImage === img ? 'border-2 border-black' : ''
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-medium">{productData.name}</h1>

//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(4)].map((_, i) => (
//               <img key={i} src={assets.star_icon} alt="star" className="w-4" />
//             ))}
//             <img src={assets.star_dull_icon} alt="star" className="w-4" />
//             <span className="pl-2 text-sm">(1)</span>
//           </div>

//           <p className="mt-5 text-3xl font-medium text-gray-500">
//             Actual Price: 
//             <del className='text-red-500'> {currency} {productData.actualPrice}</del>
//           </p>
//           <p className="mt-1 text-3xl text-red-500 font-semibold">{currency}{productData.price}</p>

//           <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

//          <p className="mt-5 text-gray-600 md:w-4/5">
//             <span className="text-black font-medium">Features:</span> {productData.features}
//           </p>
//           <p className="mt-5 text-gray-600 md:w-4/5">
//             <span className="text-black">Type:</span> {productData.type}
//           </p>
//           <p className="mt-5 text-gray-600 md:w-4/5">
//             <span className="text-black">Fabric:</span> {productData.quality}
//           </p>
//           {/* Size Selection */}
//           <div className="my-8">
//             <p className="mb-2">Select Size</p>
//             <div className="flex gap-2 flex-wrap">
//               {productData.sizes.map((size, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedSize(size)}
//                   className={`border px-4 py-2 rounded ${
//                     selectedSize === size ? 'border-black bg-red-500' : 'bg-gray-100'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 flex-wrap">
//             <button
//               onClick={handleAddToCart}
//               className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-800"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-orange-700"
//             >
//               Buy Now
//             </button>
//           </div>

//           {/* Highlights */}
//           <hr className="mt-8 sm:w-4/5" />
//           <ul className="text-sm text-gray-600 mt-5 space-y-1 list-disc list-inside">
//             <li>100% Original Product</li>
//             <li>Cash on Delivery available</li>
//             <li>7-Day Return & Exchange Policy</li>
//           </ul>
//         </div>
//       </div>

//       {/* Description and Reviews */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
//           <p className="border px-5 py-3 text-sm text-gray-500">Reviews (1)</p>
//         </div>
//         <div className="border px-6 py-6 text-sm text-gray-600 space-y-4">
//           <p>
//             The e-commerce platform allows users to browse and purchase products online, with a user-friendly interface, secure transactions,
//             and efficient order management.
//           </p>
//           <p>
//             Designed for scalability and performance, this platform offers advanced features to enhance the shopping experience and increase engagement.
//           </p>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addTOCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const currentProduct = products.find((item) => item._id === productId);
    if (currentProduct) {
      setProductData(currentProduct);
      setSelectedImage(currentProduct.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    addTOCart(productData._id, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size before purchasing.');
      return;
    }
    addTOCart(productData._id, selectedSize);
    navigate('/cart');
  };

  if (!productData) return <div className="opacity-0">Loading...</div>;

  const {
    name,
    actualPrice,
    price,
    image,
    description,
    features,
    quality,
    type,
    sizes,
    category,
    subCategory,
    isPreOrder,
    preOrderAvailableDate,
    maxPreOrderQty
  } = productData;

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col sm:flex-row-reverse gap-3">
          <div className="w-full sm:w-[80%]">
            <img src={selectedImage} alt="Product" className="w-full h-auto" />
          </div>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-3 sm:gap-0">
            {image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 ${
                  selectedImage === img ? 'border-2 border-black' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <span className="pl-2 text-sm">(1)</span>
          </div>

          <p className="mt-5 text-3xl font-medium text-gray-500">
            Actual Price: <del className='text-red-500'>{currency} {actualPrice}</del>
          </p>
          <p className="mt-1 text-3xl text-red-500 font-semibold">{currency}{price}</p>

          {/* Pre-order Highlight */}
          {isPreOrder && (
            <div className="bg-yellow-100 border border-yellow-500 p-4 rounded-md mt-5 text-sm">
              <p className="font-semibold text-yellow-800">🛒 This is a Pre-Order Product</p>
              {preOrderAvailableDate && (
                <p>Available on: <strong>{new Date(preOrderAvailableDate).toLocaleDateString()}</strong></p>
              )}
              {maxPreOrderQty && (
                <p>Max Pre-Order Quantity: <strong>{maxPreOrderQty}</strong></p>
              )}
              <p className="text-yellow-700 mt-1">You can order now and receive it when stock arrives.</p>
            </div>
          )}

          <p className="mt-5 text-gray-600 md:w-4/5">{description}</p>
          <p className="mt-5 text-gray-600 md:w-4/5"><span className="text-black font-medium">Features:</span> {features}</p>
          <p className="mt-5 text-gray-600 md:w-4/5"><span className="text-black font-medium">Type:</span> {type}</p>
          <p className="mt-5 text-gray-600 md:w-4/5"><span className="text-black font-medium">Fabric:</span> {quality}</p>

          {/* Size Selection */}
          <div className="my-8">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${
                    selectedSize === size ? 'border-black bg-red-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-800"
            >
              {isPreOrder ? 'Pre-Order' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-orange-700"
            >
              {isPreOrder ? 'Pre-Order Now' : 'Buy Now'}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <ul className="text-sm text-gray-600 mt-5 space-y-1 list-disc list-inside">
            <li>100% Original Product</li>
            <li>Cash on Delivery available</li>
            <li>7-Day Return & Exchange Policy</li>
          </ul>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (1)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-600 space-y-4">
          <p>{description}</p>
          <p>
            This item is part of our latest collection designed for comfort, quality, and durability.
            Shop now and stay stylish.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={category} subCategory={subCategory} />
    </div>
  );
};

export default Product;


