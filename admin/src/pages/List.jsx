// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'

// const List = ({ token }) => {
//   const [list, setList] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list')
//       if (response.data.success) {
//         setList(response.data.products)
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/product/remove',
//         { id },
//         { headers: { token } }
//       )
//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList()
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   // Filtered list based on search input
//   const filteredList = list.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>

//       {/* Search bar */}
//       <input
//         type="text"
//         placeholder="Search products by name..."
//         className="mb-4 p-2 border rounded w-full md:w-1/2"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className='flex flex-col gap-2 '>
//         {/* Table Header */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Selling Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* Filtered Product List */}
//         {filteredList.map((item, index) => (
//           <div
//             className='grid grid-col-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-400 text-sm'
//             key={index}
//           >
//             <img className='w-12' src={item.image[0]} alt={item.name} />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default List


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editProduct, setEditProduct] = useState(null)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        backendUrl + '/api/product/update',
        {
          _id: editProduct._id,
          name: editProduct.name,
          price: editProduct.price,
          actualPrice: editProduct.actualPrice,
          description: editProduct.description,
          isPreOrder: editProduct.isPreOrder,
          preOrderAvailableDate: editProduct.preOrderAvailableDate,
          maxPreOrderQty: editProduct.maxPreOrderQty,
        },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success("Product updated")
        setEditProduct(null)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <p className='mb-2'>All Products List</p>

      <input
        type="text"
        placeholder="Search products by name..."
        className="mb-4 p-2 border rounded w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Pre-Order</b>
          <b className='text-center'>Action</b>
        </div>

        {filteredList.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'
            key={index}
          >
            <img className='w-12' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p>{item.isPreOrder ? "Yes" : "No"}</p>
            <div className='flex gap-2 justify-end'>
              <button onClick={() => setEditProduct(item)} className='text-blue-600 text-sm'>Edit</button>
              <p onClick={() => removeProduct(item._id)} className='text-red-600 text-sm cursor-pointer'>Delete</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editProduct && (
        <form onSubmit={updateProduct} className='mt-6 p-4 border rounded bg-yellow-50 max-w-xl'>
          <h3 className='text-lg font-semibold mb-3'>Edit Product: {editProduct.name}</h3>
          <div className='flex flex-col gap-3'>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              placeholder='Name'
              className='p-2 border'
            />
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              placeholder='Description'
              className='p-2 border'
            />
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              placeholder='Price'
              className='p-2 border'
            />
            <input
              type="number"
              value={editProduct.actualPrice}
              onChange={(e) => setEditProduct({ ...editProduct, actualPrice: e.target.value })}
              placeholder='Actual Price'
              className='p-2 border'
            />

            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={editProduct.isPreOrder || false}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, isPreOrder: e.target.checked })
                }
              />
              Enable Pre-Order
            </label>

            {editProduct.isPreOrder && (
              <>
                <label>
                  Pre-Order Available Date:
                  <input
                    type="date"
                    value={editProduct.preOrderAvailableDate?.slice(0, 10) || ""}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, preOrderAvailableDate: e.target.value })
                    }
                    className='p-2 border w-full'
                  />
                </label>
                <input
                  type="number"
                  value={editProduct.maxPreOrderQty || ""}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, maxPreOrderQty: e.target.value })
                  }
                  placeholder="Max Pre-Order Quantity"
                  className='p-2 border'
                />
              </>
            )}

            <div className='flex gap-3 mt-2'>
              <button type="submit" className='bg-green-600 text-white px-4 py-2 rounded'>Save</button>
              <button type="button" className='bg-gray-300 px-4 py-2 rounded' onClick={() => setEditProduct(null)}>Cancel</button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default List

