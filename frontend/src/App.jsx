// import React from 'react'
// import { Routes,Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Collections from './pages/Collections'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Cart from './pages/Cart'
// import Login from './pages/Login'
// import Orders from './pages/Orders'
// import PlaceOrder from './pages/PlaceOrder'
// import Product from './pages/Product'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import SearchBar from './components/SearchBar'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const App = () => {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px[7vw] lg:px-[9vw]'>
//       <ToastContainer/>
//       <Navbar/>
//       <SearchBar/>



//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/collections' element={<Collections/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/cart' element={<Cart/>} />
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/orders' element={<Orders/>}/>
//         <Route path='/placeorder' element={<PlaceOrder/>}/>
//         <Route path='/product/:productId' element={<Product/>}/>

//       </Routes>
//       <Footer/>
//     </div>
//   )
// }

// export default App




import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import SplashScreen from './components/SplashScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <div className='px-4 sm:px-[5vw] md:px[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

