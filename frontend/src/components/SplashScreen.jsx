// 

import React from 'react';
import './SplashScreen.css';
import logo from '../assets/logo.png'; // Replace with your logo image path

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="logo-animate" />
    </div>
  );
};

export default SplashScreen;
