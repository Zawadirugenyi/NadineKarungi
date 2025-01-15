import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Footer1 from './Components/footer1';
import Chatbot from './Components/chatbot';
import LanguageSelector from './Components/LanguageSelector'; // Import the language selector

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer1/>
      <Footer />
      {/* Language Selector at the bottom of the page */}
      <LanguageSelector />
      <Chatbot/>
    </>
  );
};

export default MainLayout;
