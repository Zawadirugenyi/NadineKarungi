import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Home from './pages/home';
import RoomPage from './pages/room';
import Signup from './pages/signup';
import Login from './pages/login';
import RoomDescription from './pages/room_detail';
import Tenant from './pages/tenant';
import Booking from './pages/booking';
import Payment from './pages/payment';
import AboutUs from './pages/about_us'
import ContactUs from './pages/contact_us';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:hostelName" element={<RoomPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room_detail/:roomNumber/:hostelName" element={<RoomDescription />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/contact_us" element={<ContactUs />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
