// src/MainLayout.jsx
import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
