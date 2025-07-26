// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item]
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div className=''>
//         {
//           cartData.map((item, index) => {
//             const productData = products.find((product) => product._id === item._id);

//             return (
//               <div
//                 key={index}
//                 className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_0.2fr_0.5fr] items-center gap-4'
//               >
//                 <div className='flex items-start gap-6'>
//                   {
//                     productData ? (
//                       <>
//                         <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
//                         <div>
//                           <p className='text-xs sm:text-lg font-medium'>
//                             {productData.name}
//                           </p>
//                           <div className='flex items-center gap-5 mt-2'>
//                             <p>{currency}{productData.price}</p>
//                             <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                           </div>

//                           {/* Pre-Order Tag and Delivery Range */}
//                           {productData.isPreOrder && productData.preOrderAvailableDate && (() => {
//                             const availableDate = new Date(productData.preOrderAvailableDate);
//                             const startDate = new Date(availableDate);
//                             const endDate = new Date(availableDate);
//                             startDate.setDate(startDate.getDate() + 7);  // 1 week after
//                             endDate.setDate(endDate.getDate() + 12);     // +5 days

//                             const formatDateShort = (date) =>
//                               date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//                             return (
//                               <div className="mt-1">
//                                 <p className="text-red-600 text-xs font-semibold">🛒 Pre-Order Product</p>
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Estimated Delivery:{' '}
//                                   <strong>{`${formatDateShort(startDate)} – ${formatDateShort(endDate)}, ${endDate.getFullYear()}`}</strong>
//                                 </p>
//                               </div>
//                             );
//                           })()}
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className='w-16 sm:w-20 bg-gray-200 h-20 flex items-center justify-center text-xs text-gray-500'>
//                           N/A
//                         </div>
//                         <div>
//                           <p className='text-xs sm:text-lg font-medium text-red-500'>Product Out of Stock</p>
//                           <div className='flex items-center gap-5 mt-2'>
//                             <p className='line-through text-gray-400'>{currency}0</p>
//                             <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                           </div>
//                         </div>
//                       </>
//                     )
//                   }
//                 </div>

//                 <input
//                   onChange={(e) =>
//                     e.target.value === '' || e.target.value === '0'
//                       ? null
//                       : updateQuantity(item._id, item.size, Number(e.target.value))
//                   }
//                   className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
//                   type="number"
//                   min={1}
//                   defaultValue={item.quantity}
//                   disabled={!productData}
//                 />

//                 <img
//                   onClick={() => updateQuantity(item._id, item.size, 0)}
//                   src={assets.bin_icon}
//                   className='w-4 mr-4 sm:w-5 cursor-pointer'
//                   alt="Remove"
//                 />
//               </div>
//             );
//           })
//         }
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() => navigate('/PlaceOrder')}
//               className='bg-black text-white text-sm my-8 px-8 py-3'
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import PreOrderInfo from '../components/PreOrderInfo';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className=''>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_0.2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                {productData ? (
                  <>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>
                        {productData.name}
                      </p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>

                      {/* Pre-Order Info Component */}
                      {productData.isPreOrder && productData.preOrderAvailableDate && (
                        <PreOrderInfo availableDate={productData.preOrderAvailableDate} />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-16 sm:w-20 bg-gray-200 h-20 flex items-center justify-center text-xs text-gray-500'>
                      N/A
                    </div>
                    <div>
                      <p className='text-xs sm:text-lg font-medium text-red-500'>Product Out of Stock</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='line-through text-gray-400'>{currency}0</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={1}
                defaultValue={item.quantity}
                disabled={!productData}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/PlaceOrder')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


