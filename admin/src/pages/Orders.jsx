// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [showPaid, setShowPaid] = useState(true) // true = paid, false = unpaid

//   const fetchAllOrders = async () => {
//     if (!token) return null
//     try {
//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
//       if (response.data.success) {
//         setOrders(response.data.orders.reverse())
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/status',
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       )
//       if (response.data.success) {
//         await fetchAllOrders()
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error("Failed to update status.")
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders()
//   }, [token])

//   // Filter orders by payment status and search query
//   const filteredOrders = orders
//     .filter(order => order.payment === showPaid)
//     .filter(order => order._id.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">Order Page</h3>

//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by Order ID"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 w-full sm:w-1/2 border border-gray-400 rounded-md"
//         />

//         <button
//           onClick={() => setShowPaid(!showPaid)}
//           className={`px-4 py-2 rounded-md text-sm font-semibold border ${
//             showPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//           }`}
//         >
//           {showPaid ? 'Showing Paid Orders' : 'Showing Unpaid Orders'}
//         </button>
//       </div>

//       <div>
//         {
//           filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-500 p-5 md:p-8 my-3 md:my-4 text-sm text-gray-700' key={index}>
//               <img className='w-12' src={assets.parcel_icon} alt="" />

//               <div>
//                 <div>
//                   <p><strong>Order Items:</strong></p>
//                   {
//                     order.items.map((item, index) => (
//                      // <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span>{index !== order.items.length - 1 ? ',' : ''}</p>
//                        <p className='py-0.5 flex items-center gap-2' key={index}>
//   {item.name} X {item.quantity} <span>({item.size})</span>
//   {
//     item.isPreOrder && (
//       <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
//         Pre-Order
//       </span>
//     )
//   }
//   {index !== order.items.length - 1 ? ',' : ''}
// </p>
//                     ))
//                   }
//                 </div>
//                 <p className='mt-2'><strong>Customer Details:</strong></p>
//                 <p className='mt-1 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
//                 <div>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + "-" + order.address.pincode + " , " + order.address.state + "," + order.address.country + ","}</p>
//                 </div>
//                 <p>{order.address.email}</p>

//                 <p>{order.address.phone}</p>
//               </div>

//               <div>
//                 <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
//                 <p className='mt-3'>Method: {order.paymentMethod}</p>
//                 <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
//                 <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//               </div>

//               <p className='text-5xl sm:text-[15px] font-bold'>{currency}{order.amount}</p>
//               <p>Order ID: {order._id}</p>

//               <select
//                 onChange={(event) => statusHandler(event, order._id)}
//                 value={order.status}
//                 className='p-2 font-semibold'
//               >
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           )) : (
//             <p className="text-gray-500 mt-4">No {showPaid ? 'paid' : 'unpaid'} orders match the search.</p>
//           )
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders




import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showPaid, setShowPaid] = useState(true)

  useEffect(() => {
    const fetchAllOrders = async () => {
      if (!token) return
      try {
        const { data } = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
        if (data.success) setOrders(data.orders.reverse())
        else toast.error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchAllOrders()
  }, [token])

  const handleStatusChange = async (event, orderId) => {
    const status = event.target.value
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      )
      if (data.success) {
        setOrders(prev => prev.map(order =>
          order._id === orderId ? { ...order, status } : order
        ))
      }
    } catch (error) {
      toast.error("Failed to update status.")
    }
  }

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => order.payment === showPaid)
      .filter(order => order._id.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [orders, showPaid, searchQuery])

  const renderAddress = (address = {}) => (
    <>
      <p className="font-medium">{address.firstName} {address.lastName}</p>
      <p>{address.street},</p>
      <p>{address.city}-{address.pincode}, {address.state}, {address.country}</p>
      <p>{address.email}</p>
      <p>{address.phone}</p>
    </>
  )

  // const renderItems = (items = []) => items.map((item, idx) => (
  //   <p key={idx} className="py-0.5 flex items-center gap-2">
  //     {item.name} x {item.quantity} <span>({item.size})</span>
  //     {item.isPreOrder && (
  //       <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
  //         Pre-Order
  //       </span>
  //     )}
  //     {idx !== items.length - 1 && ','}
  //   </p>
  // ))

  const renderItems = (items = []) => items.map((item, idx) => (
  <div key={idx} className="mb-2">
    <p className="font-bold">{item.name}</p>
    <p className="ml-2">
      <strong>Qty:</strong> {item.quantity}
    </p>
    <p className="ml-2">
      <strong>Size:</strong> {item.size}
    </p>
    {item.isPreOrder && (
      <p className="ml-2 mt-1">
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
          Pre-Order
        </span>
      </p>
    )}
  </div>
))


  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full sm:w-1/2 border border-gray-400 rounded-md"
        />
        <button
          onClick={() => setShowPaid(prev => !prev)}
          className={`px-4 py-2 rounded-md text-sm font-semibold border ${showPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {showPaid ? 'Showing Paid Orders' : 'Showing Unpaid Orders'}
        </button>
      </div>

      {filteredOrders.length > 0 ? filteredOrders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-500 p-5 md:p-8 my-3 md:my-4 text-sm text-gray-700"
        >
          <img className="w-12" src={assets.parcel_icon} alt="parcel" />

          <div>
            <p><strong>Order Items:</strong></p>
            {renderItems(order.items)}
            <p className="mt-2"><strong>Customer Details:</strong></p>
            <div className="mt-1 mb-2">{renderAddress(order.address)}</div>
          </div>

          <div>
            <p>Items: {order.items.length}</p>
            <p className="mt-3">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>

          <p className="text-5xl sm:text-[15px] font-bold">{currency}{order.amount}</p>
          <p>Order ID: {order._id}</p>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e, order._id)}
            className="p-2 font-semibold"
          >
            {["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      )) : (
        <p className="text-gray-500 mt-4">No {showPaid ? 'paid' : 'unpaid'} orders match the search.</p>
      )}
    </div>
  )
}

export default Orders

