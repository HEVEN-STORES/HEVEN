import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setVisible(false); // Close mobile menu on logout
  };

  return (
    <div className='flex items-center justify-between py-5 px-4 sm:px-10 font-medium relative z-50 bg-white'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/collections', '/about', '/contact'].map((path, i) => {
          const labels = ['Home', 'Collection', 'About', 'Contact'];
          return (
            <NavLink key={path} to={path} className="flex flex-col items-center gap-1">
              <p className='font-bold hover:text-yellow-600'>{labels[i]}</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collections');
          }}
          src={assets.search_icon}
          alt="search"
          className='w-5 cursor-pointer'
        />

        <div className='group relative'>
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            alt="profile"
            className='w-5 cursor-pointer'
          />
          {token &&
            <div className='group-hover:block hidden absolute right-0 top-full pt-2'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
        </div>

        <Link to='/Cart' className='relative'>
          <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white overflow-hidden transition-all duration-300 ease-in-out ${visible ? 'w-3/4 shadow-lg' : 'w-0'} sm:hidden`}>
        <div className='flex flex-col text-gray-600 h-full px-6 pt-6'>
          {/* Back button */}
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 mb-6 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="back" className='h-4 rotate-180' />
            <p className='text-base'>Back</p>
          </div>

          {/* Mobile Nav Links */}
          {[
            { label: 'Home', to: '/' },
            { label: 'Collections', to: '/collections' },
            { label: 'Orders', to: '/orders' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' }
          ].map(({ label, to }) => (
            <NavLink key={to} onClick={() => setVisible(false)} className='py-4 border-b text-lg font-medium' to={to}>
              {label}
            </NavLink>
          ))}

          {token &&
            <p onClick={logout} className='mt-6 text-lg font-bold cursor-pointer text-red-600 hover:text-red-800'>
              Logout
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
