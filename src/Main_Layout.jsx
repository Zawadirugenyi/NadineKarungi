import React from 'react';
import Navbar from './Components/navbar';

import Footer1 from './Components/footer1';
import Chatbot from './Components/chatbot';


const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer1/>
   
      {/* Language Selector at the bottom of the page */}
     
      <Chatbot/>
    </>
  );
};

export default MainLayout;
