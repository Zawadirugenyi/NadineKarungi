import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Main_Layout';
import Home from './pages/home';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout>< Home/></MainLayout>} />
  
      </Routes>
    </Router>
  );
}

export default App;
