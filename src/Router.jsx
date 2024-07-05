import React from 'react';
import { BrowserRouter as Router,Route, } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Home from './pages/home';




function App() {
  return (
    <Router>
      <Navbar />
   
      <Footer/>
    </Router>
  );
}

export default App;



