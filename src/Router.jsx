import React from 'react';
import { BrowserRouter as Router,Route, } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Filter from './Components/filter';




function App() {
  return (
    <Router>
      <Navbar />
      <Filter/>
   
      <Footer/>
    </Router>
  );
}

export default App;



