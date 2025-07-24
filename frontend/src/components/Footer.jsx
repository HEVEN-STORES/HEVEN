import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'


   
const Footer = () => {
  function btnClick() {
        window.open("https://www.instagram.com/heven_designs/?hl=en");
    }
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
             <div>
                <img src={assets.logo} className='mb-5 w-32 ' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>At <b>HEVEN</b>, we redefine fashion with a perfect blend of 
                trend and comfort. Our collections embrace bold prints, timeless elegance, and sustainable fabrics, ensuring 
                you look and feel your best. From casual wear to statement pieces, we craft styles that empower confidence 
                and individuality. Join us in celebrating fashion that speaks to you!</p>
             </div>

             <div>
                <p className='text-xl font-medium mb-5 '>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='font-bold hover:text-yellow-600'><Link to='/' >Home</Link></li>
                    <li className='font-bold hover:text-yellow-600'> <Link to='/contact'>About Us</Link></li>
                    <li className='font-bold hover:text-yellow-600'><Link to='/orders'>Delivery</Link></li>
                    <li className='font-bold hover:text-yellow-600'><Link to='/about'>Privacy Policy</Link></li>
 <li className='font-bold hover:text-yellow-600'> <a href="https://www.instagram.com/heven_designs/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
             </div>
             <div>
                <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 6281874010</li>
                    <li>heven.storess@gmail.com</li>

                </ul>
             </div>
      </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center '>Copyright 2025 © heven.in.net - All Rights reserved</p>
        </div>

    </div>
  )
}

export default Footer
