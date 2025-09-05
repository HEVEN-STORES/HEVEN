import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import PreOrderInfo from '../components/PreOrderInfo';
import SizeChart from '../components/SizeChart';
import ReviewSection from '../components/ReviewSection';
import { useSwipeable } from 'react-swipeable';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addTOCart , user } = useContext(ShopContext);
  const userId = user?._id || null;

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentProduct = products.find((item) => item._id === productId);
    if (currentProduct) {
      setProductData(currentProduct);    
      setSelectedImage(currentProduct.image[0]);
      setCurrentIndex(0);
    }
  }, [productId, products]);

  // 🔻 Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextImage(),
    onSwipedRight: () => handlePrevImage(),
    trackMouse: true
  });

  const handleNextImage = () => {
    if (productData) {
      const nextIndex = (currentIndex + 1) % productData.image.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(productData.image[nextIndex]);
    }
  };

  const handlePrevImage = () => {
    if (productData) {
      const prevIndex = (currentIndex - 1 + productData.image.length) % productData.image.length;
      setCurrentIndex(prevIndex);
      setSelectedImage(productData.image[prevIndex]);
    }
  };

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

  // 🔻 Calculate discount percentage
  const discountPercentage = actualPrice && price ? Math.round(((actualPrice - price) / actualPrice) * 100) : 0;

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col sm:flex-row-reverse gap-3">
          {/* Main Image with Swipe */}
          <div {...handlers} className="w-full sm:w-[80%] relative">
            <img src={selectedImage} alt="Product" className="w-full h-auto rounded-lg" />

            {/* Navigation Arrows (only show on mobile) */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full sm:hidden"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full sm:hidden"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-3 sm:gap-0">
            {image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(idx);
                }}
                className={`cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 rounded ${
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
          
          {/* 🔻 Discounted Price and Discount Badge */}
          <p className="mt-1 text-3xl text-red-500 font-semibold">
            {currency}{price}
            <span className="ml-3 text-base text-green-600 font-medium">
              ({discountPercentage}% OFF)
            </span>
          </p>

          {/* Pre-order Highlight */}
          {isPreOrder && (
            <div className="bg-yellow-100 border border-yellow-500 p-4 rounded-md mt-5 text-sm">
              {preOrderAvailableDate && (
                <PreOrderInfo availableDate={preOrderAvailableDate} />
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

            <SizeChart />
          </div>  

          <hr className="mt-8 sm:w-4/5" />
          <ul className="text-sm text-gray-600 mt-5 space-y-1 list-disc list-inside">
            <li>100% Original Product</li>
            <li>Cash on Delivery available</li>
            <li>7-Day Return & Exchange Policy</li>
          </ul>
        </div>
      </div>

{/*       <ReviewSection productId={productId} userId={userId} /> */}
      <ReviewSection
  productId={product?._id}   // from your product details API
  userId={user?._id}         // from logged-in user (ShopContext or Redux)
/>


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
