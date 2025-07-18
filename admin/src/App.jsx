import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';




export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹ "


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
      localStorage.setItem('token',token)
  },[token])



  return (
    <div className='bg-gray-50 min-h-screen'>
        
        <ToastContainer/>
      

      {
        token === "" ? <Login setToken={setToken} />
         :

          <>

            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>

              <Sidebar />

              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base '>

                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token}/>} />
                </Routes>

              </div>

            </div>

          </>
      }



    </div>
  )
}

export default App






// import React from 'react';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// import { Routes, Route } from 'react-router-dom';
// import Add from './pages/Add';
// import List from './pages/List';
// import Orders from './pages/Orders';
// import { ToastContainer } from 'react-toastify';
// import AdminCouponPanel from './pages/AdminCoupon';




// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const currency = "₹ "


// const App = () => {

//   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

//   useEffect(()=>{
//       localStorage.setItem('token',token)
//   },[token])



//   return (
//     <div className='bg-gray-50 min-h-screen'>
        
//         <ToastContainer/>
      

//       {
//         token === "" ? <Login setToken={setToken} />
//          :

//           <>

//             <Navbar setToken={setToken} />
//             <hr />
//             <div className='flex w-full'>

//               <Sidebar />

//               <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base '>

//                 <Routes>
//                   <Route path='/add' element={<Add token={token} />} />
//                   <Route path='/list' element={<List token={token} />} />
//                   <Route path='/orders' element={<Orders token={token}/>} />
//                   <Route path='/coupon' element={<AdminCouponPanel  token={token}/>} />

//                 </Routes>

//               </div>

//             </div>

//           </>
//       }



//     </div>
//   )
// }

// export default App


// import React from 'react';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// import { Routes, Route } from 'react-router-dom';
// import Add from './pages/Add';
// import List from './pages/List';
// import Orders from './pages/Orders';
// import { ToastContainer } from 'react-toastify';
// import AdminCouponPanel from './pages/AdminCoupon';

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// export const currency = "₹ ";

// const App = () => {
//         const [token, setToken] = useState(localStorage.getItem('token') || '');

//        useEffect(() => {
//             localStorage.setItem('token', token);
//         }, [token]);
//   return (
//     <div className='bg-gray-50 min-h-screen'>
//       <ToastContainer />

//       <Navbar setToken={() => {}} /> {/* No login, so dummy function */}
//       <hr />
//       <div className='flex w-full'>
//         <Sidebar />

//         <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base '>
//           <Routes>
//             <Route path='/add' element={<Add />} />
//             <Route path='/list' element={<List />} />
//             <Route path='/orders' element={<Orders />} />
//             <Route path='/coupon' element={<AdminCouponPanel />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
