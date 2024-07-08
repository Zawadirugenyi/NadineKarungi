import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Filter from './Components/filter';
import Home from './pages/home';
import RoomPage from './pages/room';

function App() {
  return (
    <Router>
      <Navbar />
      <Filter />
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/rooms/:hostelId" element={<RoomPage />} />
        <Route path="room/" element={<RoomPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

