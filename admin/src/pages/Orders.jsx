import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])


  const fetchAllOrders = async () => {

    if (!token) {

      return null

    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }



  useEffect(() => {
    fetchAllOrders();
  }, [token])
// Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full sm:w-1/2 border border-gray-400 rounded-md"
        />
      </div>

    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3  items-start border-2 border-gray-500 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  <p><strong>Order Items:</strong></p>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p  className='py-0.2' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className='py-0.2' key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p className='mt-2'><strong>Coustomer Details:</strong></p>
                <p className='mt-1 mb-2 font-medium '>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "-" + order.address.pincode + " , " + order.address.state + "," + order.address.country + ","}</p>

                </div>
                <p>{order.address.phone}</p>

              </div>
              <div>
                <p className='text-sm sm:text-[15px] '>Items:{order.items.length}</p>
                <p className='mt-3 '>Method:{order.paymentMethod}</p>
                <p> Payment:{order.payment ? 'Done':'Pending'}</p>
                <p>Date:{new Date(order.date).toLocaleDateString()}</p>

              </div>
              <p className='text-5xl sm:text-[15px] font-bold'>{currency}{order.amount}</p>
              <p>Order ID:{order._id}</p>

              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold '>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
