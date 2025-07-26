// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast, ToastContainer } from 'react-toastify'

// const Add = ({token}) => {

//    const [image1,setImage1] = useState(false)
//    const [image2,setImage2] = useState(false)
//    const [image3,setImage3] = useState(false)
//    const [image4,setImage4] = useState(false)


//    const [name,setName] = useState("");
//    const [description,setDescription] = useState("");
//    const [type,setType] = useState("");
//    const [features,setFeatures] = useState("");
//    const [quality , setQuality] = useState("")

//   const [actualPrice, setactualPrice] = useState('');

//    const [price,setPrice] = useState("");
//    const [category,setCategory] = useState("Men");
//    const [subCategory,setSubCategory] = useState("Topwear");
//    const [bestseller,setBestseller] = useState(false);
//    const [sizes,setSizes] = useState([]);


//    const onSubmitHandler = async  (e)=>{
//             e.preventDefault();

//             try {
//               const formData = new FormData()

//               formData.append("name",name)
//               formData.append("description",description)
//               formData.append("actualPrice",actualPrice)
//               formData.append("type",type)
//               formData.append("features",features)
//               formData.append("quality",quality)
//               formData.append("price",price)
//               formData.append("category",category)
//               formData.append("subCategory",subCategory)
//               formData.append("bestseller",bestseller)
//               formData.append("sizes",JSON.stringify(sizes))


//              image1 && formData.append("image1",image1)
//              image2 && formData.append("image2",image2)
//              image3 && formData.append("image3",image3)
//              image4 && formData.append("image4",image4)

//              const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

//             if(response.data.success){

//               toast.success(response.data.message)
//               setName('')
//               setDescription('')
//               setImage1(false)
//               setImage2(false)
//               setImage3(false)
//               setImage4(false)
//               setactualPrice('')
//               setPrice('')
//               setType('')
//               setQuality('')
//               setFeatures('')
//               setactualPrice('')

//             }else{
//               toast.error(response.data.message)
//               }
//           } catch (error) {
//               console.log(error);
//               toast.error(error.message)
              
//             }
//    }



//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'> Upload Image</p>
//         <div className='flex gap-2'>
//           <label htmlFor="image1">
//             <img  className='w-20' src={!image1 ? assets.upload_area:URL.createObjectURL(image1)} alt="" />
//             <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
//           </label>
//           <label htmlFor="image2">
//             <img className='w-20'  src={!image2 ? assets.upload_area:URL.createObjectURL(image2)} alt="" />
//             <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
//           </label>
//           <label htmlFor="image3">
//             <img className='w-20'  src={!image3 ? assets.upload_area:URL.createObjectURL(image3)} alt="" />
//             <input  onChange={(e)=>setImage3(e.target.files[0])}type="file" id='image3' hidden />
//           </label>
//           <label htmlFor="image4">
//             <img  className='w-20' src={!image4 ? assets.upload_area:URL.createObjectURL(image4)} alt="" />
//             <input  onChange={(e)=>setImage4(e.target.files[0])}type="file" id='image4' hidden />
//           </label>
//         </div>
//       </div>
//       <div className='w-full'>
//         <p className='mb-2'>Product Name</p>
//         <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//       </div>


//       <div className='w-full'>
//         <p className='mb-2'>Product Description</p>
//         <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
//       </div>
//        <div className='w-full'>
//         <p className='mb-2'>Product Type</p>
//         <textarea onChange={(e)=>setType(e.target.value)} value={type} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
//       </div>
//        <div className='w-full'>
//         <p className='mb-2'>Product Features</p>
//         <textarea onChange={(e)=>setFeatures(e.target.value)} value={features} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
//       </div>
//        <div className='w-full'>
//         <p className='mb-2'>Product Fabric</p>
//         <textarea onChange={(e)=>setQuality(e.target.value)} value={quality} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
//       </div>

//       <div className='flex flex-col sm:flex-row  gap-2 w-full sm:gap-8 '>
//         <div>
//             <p  className='mb-2'>Product Category</p>
//             <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2' >
//               <option value="Men">Men</option>
//               <option value="Unisex">Unisex</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//               <option value="Footwear">Foot Wear</option>

//             </select>
//         </div>

//         <div>
//             <p className='mb-2'> Sub Category</p>
//             <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2' >
//               <option value="Topwear">Top Wear</option>
//               <option value="Bottomwear">Bottom Wear</option>
//               <option value="Winterwear">Winter Wear</option>
//               <option value="Footwear">Foot Wear</option>

//             </select>
//         </div>
//          <div>
          
//           <p className='mb-2'>Actual Price</p>
//           <input onChange={(e)=>setactualPrice(e.target.value)} value={actualPrice} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Price in INR' />
//         </div>
//          <div>
//           <p className='mb-2'>Selling Price</p>
//           <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Price in INR' />
//         </div>
//       </div>


//       <div>
//         <p className='mb-2'> Product Sizes</p>
//         <div className='flex gap-3'>
//           <div  onClick={()=>setSizes(prev=>prev.includes("S")? prev.filter(item => item !== "S") : [...prev,"S"])}>
//             <p className={`${sizes.includes("S") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>S</p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("M")? prev.filter(item => item !== "M") : [...prev,"M"])}>
//             <p className={`${sizes.includes("M") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>M</p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("L")? prev.filter(item => item !== "L") : [...prev,"L"])}>
//             <p className={`${sizes.includes("L") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>L</p>
//           </div>

//           <div onClick={()=>setSizes(prev=>prev.includes("XL")? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
//             <p className={`${sizes.includes("XL") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>XL</p>
//           </div>
//           <div onClick={()=>setSizes(prev=>prev.includes("XXL")? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
//             <p className={`${sizes.includes("XXL") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>XXL</p>
//           </div>

//         </div>
//       </div>
//       <div className='flex gap-2 mt-2 '>
//         <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer ' htmlFor="bestseller">Add to Bestseller</label>
//       </div>

//       <button type='submit' className='w-28 py-3 mt-4 bg-yellow-700 text-black'> ADD</button>
//     </form>
//   )
// }

// export default Add


import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [features, setFeatures] = useState('');
  const [quality, setQuality] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // 🆕 Pre-order fields
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [preOrderAvailableDate, setPreOrderAvailableDate] = useState('');
  const [maxPreOrderQty, setMaxPreOrderQty] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('actualPrice', actualPrice);
      formData.append('type', type);
      formData.append('features', features);
      formData.append('quality', quality);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      // Append pre-order fields
      formData.append('isPreOrder', isPreOrder);
      if (isPreOrder) {
        formData.append('preOrderAvailableDate', preOrderAvailableDate);
        formData.append('maxPreOrderQty', maxPreOrderQty);
      }

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setActualPrice('');
        setPrice('');
        setType('');
        setQuality('');
        setFeatures('');
        setSizes([]);
        setBestseller(false);
        setIsPreOrder(false);
        setPreOrderAvailableDate('');
        setMaxPreOrderQty('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      <div>
        <p className='mb-2'> Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img  className='w-20' src={!image1 ? assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20'  src={!image2 ? assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20'  src={!image3 ? assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input  onChange={(e)=>setImage3(e.target.files[0])}type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img  className='w-20' src={!image4 ? assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input  onChange={(e)=>setImage4(e.target.files[0])}type="file" id='image4' hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>


      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
      </div>
       <div className='w-full'>
        <p className='mb-2'>Product Type</p>
        <textarea onChange={(e)=>setType(e.target.value)} value={type} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
      </div>
       <div className='w-full'>
        <p className='mb-2'>Product Features</p>
        <textarea onChange={(e)=>setFeatures(e.target.value)} value={features} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
      </div>
       <div className='w-full'>
        <p className='mb-2'>Product Fabric</p>
        <textarea onChange={(e)=>setQuality(e.target.value)} value={quality} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content' required />
      </div>

      <div className='flex flex-col sm:flex-row  gap-2 w-full sm:gap-8 '>
        <div>
            <p  className='mb-2'>Product Category</p>
            <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2' >
              <option value="Men">Men</option>
              <option value="Unisex">Unisex</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Footwear">Foot Wear</option>

            </select>
        </div>

        <div>
            <p className='mb-2'> Sub Category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2' >
              <option value="Topwear">Top Wear</option>
              <option value="Bottomwear">Bottom Wear</option>
              <option value="Winterwear">Winter Wear</option>
              <option value="Footwear">Foot Wear</option>

            </select>
        </div>
         <div>
          
          <p className='mb-2'>Actual Price</p>
          <input onChange={(e)=>setActualPrice(e.target.value)} value={actualPrice} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Price in INR' />
        </div>
         <div>
          <p className='mb-2'>Selling Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Price in INR' />
        </div>
      </div>


      <div>
        <p className='mb-2'> Product Sizes</p>
        <div className='flex gap-3'>
          <div  onClick={()=>setSizes(prev=>prev.includes("S")? prev.filter(item => item !== "S") : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("M")? prev.filter(item => item !== "M") : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("L")? prev.filter(item => item !== "L") : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("XL")? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("XXL")? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-black text-white": "bg-yellow-700"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>

        </div>
      </div>
      
      <div className='flex gap-2 mt-2 '>
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to Bestseller</label>
      </div>

      {/* 🆕 Pre-order Section */}
      <div className='w-full flex flex-col sm:flex-row gap-4'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='isPreOrder'
            checked={isPreOrder}
            onChange={() => setIsPreOrder((prev) => !prev)}
          />
          <label htmlFor='isPreOrder' className='cursor-pointer font-medium'>
            Enable Pre-Order
          </label>
        </div>

        {isPreOrder && (
          <>
            <div className='flex flex-col'>
              <label htmlFor='preOrderDate' className='mb-1'>Shipping Date</label>
              <input
                type='date'
                id='preOrderDate'
                className='px-3 py-2 w-full sm:w-[200px]'
                value={preOrderAvailableDate}
                onChange={(e) => setPreOrderAvailableDate(e.target.value)}
                required={isPreOrder}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='maxQty' className='mb-1'>Max Pre-Orders</label>
              <input
                type='number'
                id='maxQty'
                className='px-3 py-2 w-full sm:w-[150px]'
                value={maxPreOrderQty}
                onChange={(e) => setMaxPreOrderQty(e.target.value)}
                required={isPreOrder}
              />
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <button type='submit' className='w-28 py-3 mt-4 bg-yellow-700 text-black'>
        ADD
      </button>
    </form>
  );
};

export default Add;

