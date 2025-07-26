// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {

//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(
//         backendUrl + '/api/order/userorders',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];

//         response.data.orders.forEach((order) => {
//           // Skip the whole order if payment is false
//           if (order.payment === false) return;

//           order.items.forEach((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             item['_id'] = order._id;

//             allOrdersItem.push(item);
//           });
//         });

//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.error("Failed to load orders:", error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {orderData.map((item, index) => (
//           <div
//             key={index}
//             className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
//           >
//             <div className='flex items-start gap-6 text-sm'>
//               <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
//               <div>
//                 <p className='sm:text-base font-medium'>{item.name}</p>
//                 <div className='flex items-center gap-3 mt-1 text-base'>
//                   <p>{currency}{item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p className='mt-1'>
//                   Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
//                 </p>
//                 <p className='mt-1'>
//                   Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span>
//                 </p>
//                 <p className='mt-1'>
//                   Payment: <span className='text-gray-400'>{item.payment ? 'Done' : 'Pending'}</span>
//                 </p>
//                 <p className='mt-1'>
//                   Order Id: <span className='text-gray-400'>{item._id}</span>
//                 </p>
//               </div>
//             </div>

//             <div className='md:w-1/2 flex justify-between'>
//               <div className='flex items-center gap-2'>
//                 <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                 <p className='text-sm md:text-base'>{item.status}</p>
//               </div>

//               <button
//                 onClick={loadOrderData}
//                 className='border px-4 py-2 text-sm font-medium rounded-sm'
//               >
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}

//         {orderData.length === 0 && (
//           <p className='text-center text-gray-500 mt-10'>No orders to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
           if (order.payment === false) return;

          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['_id'] = order._id;

            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              
                <div className="relative w-16 sm:w-20">
                  {item.isPreOrder && (
                    <div className="absolute top-0 left-0 bg-black text-white text-[10px] font-semibold px-2 py-[2px] rounded-br">
                      PRE-ORDER
                    </div>
                  )}
                  <img src={item.image[0]} className='w-full' alt="" />
                </div>
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>
                  Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='mt-1'>
                  Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
                <p className='mt-1'>
                  Payment: <span className='text-gray-400'>{item.payment ? 'Done' : 'Pending'}</span>
                </p>
                <p className='mt-1'>
                  Order Id: <span className='text-gray-400'>{item._id}</span>
                </p>

                {/* ✅ Pre-Order Expected Delivery */}
                
                    <p className='mt-1 text-orange-600 font-medium'>
  Expected Delivery On: {
    item.isPreOrder && item.preOrderAvailableDate
      ? new Date(
          new Date(item.preOrderAvailableDate).getTime() + 7 * 24 * 60 * 60 * 1000
        ).toDateString()
      : item.date
        ? new Date(
            Number(item.date) + 3 * 24 * 60 * 60 * 1000
          ).toDateString()
        : 'N/A'
  }
</p>


                
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>

              <button
                onClick={loadOrderData}
                className='border px-4 py-2 text-sm font-medium rounded-sm'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}

        {orderData.length === 0 && (
          <p className='text-center text-gray-500 mt-10'>No orders to display.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
