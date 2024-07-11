import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Filter from './Components/filter';
import Home from './pages/home';
import RoomPage from './pages/room';
import Signup from './pages/signup';
import Login from './pages/login';
import RoomDetails from './pages/roomDescription.jsx';




function App() {
  return (
    <Router>
      <Navbar />
      <Filter />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:hostelId" element={<RoomPage />} />
        <Route path="room/" element={<RoomPage />} />
        <Route path="signup/" element={<Signup />} />
        <Route path='login/' element={ <Login/>}/>
        <Route path="roomDescription/" element={ <RoomDetails/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

