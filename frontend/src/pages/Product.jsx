// import React, { useContext, useEffect, useState } from 'react'
// import { useParams , useNavigate} from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { toast,ToastContainer } from 'react-toastify';

// const Product = () => {
   
//   const {productId} = useParams();
   
  
//   const {products , currency , addTOCart} = useContext(ShopContext);
//   const [productData,setProductData] = useState(false);
//   const [image,setImage] = useState('')
//   const [size,setSize] = useState('');

//  const navigate = useNavigate();
//  const handleBuyNow = () => {
//   if (!size) {
//     toast.error("Please select a size before purchasing.");
//     return;
//   }
//   addTOCart(productData._id, size);
//   navigate('/Cart');
// }


//   const fetchProductData = async()=>{
//       products.map((item)=>{
//         if(item._id === productId){
//           setProductData(item)
//           setImage(item.image[0])          
//           return null;
//         }
//       })
//   }
//   useEffect(()=>{
//     fetchProductData();
//   },[productId,products])

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//        {/* Product Data */}
//        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
//             {/* product Images */}
//             <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//               <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal  sm:w-[18.7%] w-full  '>
//                    {
//                     productData.image.map((item,index)=>(
//                       <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//                     ))
//                    }
//               </div>
//               <div className='w-full sm:w-[80%] '>
//                 <img className='w-full h-auto' src={image} alt="" />

//               </div>
//             </div>

//             {/* -----PRoduct Info */}
//              <div className='flex-1'>
//                  <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//                  <div className='flex items-center gap-1 mt-2'>
                    
//                     <img src={assets.star_icon} alt="" className="w-3 5" />
//                     <img src={assets.star_icon} alt="" className="w-3 5" />
//                     <img src={assets.star_icon} alt="" className="w-3 5" />
//                     <img src={assets.star_icon} alt="" className="w-3 5" />
//                     <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//                     <p className='pl-2'>(122)</p>

//                  </div>
//                 <p className='mt-5 text-3xl font-medium'>Actual Price: {currency}<del>{productData.actualPrice}</del></p>
//                  <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//                  <p className='mt-5 text-gray-500 md:w-4/5 '>{productData.description}</p>

//                  <div className='flex flex-col gap-4 my-8 '>
//                   <p>Select Size</p>
//                    <div className='flex gap-2'>

//                     {
//                       productData.sizes.map((item,index)=>(
//                         <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ?'border-orange-500' : '' }`} key={index}>{item}</button>
//                       ))
//                     }

//                    </div>

//                  </div>

//                  <button onClick={()=>addTOCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add To Cart</button>
//                  <br /><br />
//                  <button onClick={handleBuyNow}  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Buy    Now</button>
//                     <hr className='mt-8 sm:w-4/5'/>
                    

//                     <div className='text-sm text-gray-500 mt-5 flex  flex-col gap-1'>

//                       <p>100% Original Product.</p>
//                       <p>Cash On Delivey is available on this Product.</p>
//                       <p>Easy return and Exchange Policy within 7-Days.</p>

//                     </div>
                       
                          
//              </div>

//        </div>

//        {/* Description and Review Section */}
//        <div className='mt-20'>
//         <div className='flex '>
//             <b className='border px-5 py-3 text-sm  '>Description</b>
//             <p className='border px-5 py-3 text-sm '> Reviews (122)</p>

//         </div>
//           <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>

//             <p>The e-commerce project is a web-based platform that allows users to browse, 
//               search, and purchase products online. The system provides a user-friendly interface, secure transactions,
//                and efficient order management to enhance the customer experience. It includes features for both customers
//                and administrators to manage products, orders, and payments seamlessly.</p>

//                <p>This e-commerce project aims to provide a smooth and secure shopping experience with advanced features to improve 
//                 user engagement and sales. It is scalable, customizable, and optimized for businesses of all sizes.</p>

//           </div>

//        </div>
//        {/* Display Related Products */}
//         <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

//     </div>
//   ): <div  className='opacity-0'></div>
// }

// export default Product




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
    toast.success('Product added to cart!');
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

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <ToastContainer />

      {/* Product Section */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col sm:flex-row-reverse gap-3">
          <div className="w-full sm:w-[80%]">
            <img src={selectedImage} alt="Product" className="w-full h-auto" />
          </div>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-3 sm:gap-0">
            {productData.image.map((img, idx) => (
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

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <span className="pl-2 text-sm">(122)</span>
          </div>

          <p className="mt-5 text-3xl font-medium text-gray-500">
            Actual Price: {currency}
            <del>{productData.actualPrice}</del>
          </p>
          <p className="mt-1 text-3xl font-semibold">{currency}{productData.price}</p>

          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

          <p className="mt-5 text-gray-600 md:w-4/5">Features :{productData.features}</p>
          <p className="mt-5 text-gray-600 md:w-4/5">Type : {productData.type}</p>
          <p className="mt-5 text-gray-600 md:w-4/5">Fabric : {productData.quality}</p>


          {/* Size Selection */}
          <div className="my-8">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${
                    selectedSize === size ? 'border-black bg-gray-200' : 'bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-orange-700"
            >
              Buy Now
            </button>
          </div>

          {/* Highlights */}
          <hr className="mt-8 sm:w-4/5" />
          <ul className="text-sm text-gray-600 mt-5 space-y-1 list-disc list-inside">
            <li>100% Original Product</li>
            <li>Cash on Delivery available</li>
            <li>7-Day Return & Exchange Policy</li>
          </ul>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (122)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-600 space-y-4">
          <p>
            The e-commerce platform allows users to browse and purchase products online, with a user-friendly interface, secure transactions,
            and efficient order management.
          </p>
          <p>
            Designed for scalability and performance, this platform offers advanced features to enhance the shopping experience and increase engagement.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;

