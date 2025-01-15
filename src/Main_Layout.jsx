// src/Main_Layout.js
import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Footer1 from './Components/footer1';
import LanguageSelector from './Components/LanguageSelector'; // Import the language selector

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      
      {/* Language Selector */}
      <LanguageSelector /> 

      <main>{children}</main>
      
      <Footer1/>
      <Footer />
    </>
  );
};

export default MainLayout;
