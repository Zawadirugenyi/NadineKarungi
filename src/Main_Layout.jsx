import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Footer1 from './Components/footer1';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer1/>
      <Footer />
    </>
  );
};

export default MainLayout; // Default export
