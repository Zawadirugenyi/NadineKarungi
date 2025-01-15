import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Main_Layout';
import Home from './pages/home';
import AboutUs from './pages/about_us';
import ContactUs from './pages/contact_us';
import HeroSection from './pages/heroSection';
import ServicesSection from './pages/services';
import PromotionsSection from './pages/promotions';
import ActivitiesSection from './pages/activities';
import JobsSection from './pages/jobs';
import TestimonialsSection from './pages/testimonials';
import FAQSection from './pages/faq';
import TeamSection from './pages/teams';
import ContactSection from './pages/contact_us';
import SubServicesSection from './pages/epargne';
import CreditSection from './pages/credit';
import ApplicationForm from './pages/application';
import './i18n';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout>< HeroSection /></MainLayout>} />
        <Route path="/home" element={<MainLayout>< Home /></MainLayout>} />
        <Route path="/about_us" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/services" element={<MainLayout><ServicesSection /></MainLayout>} />
        <Route path="/promotions" element={<MainLayout><PromotionsSection /></MainLayout>} />
        <Route path="/activities" element={<MainLayout><ActivitiesSection /></MainLayout>} />
        <Route path="/jobs" element={<MainLayout><JobsSection /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQSection /></MainLayout>} />
        <Route path="/contact_us" element={<MainLayout><ContactSection /></MainLayout>} />
        <Route path="/teams" element={<MainLayout><TeamSection /></MainLayout>} />
        <Route path="/application" element={<MainLayout><ApplicationForm /></MainLayout>} />
        <Route path="/credit" element={<MainLayout><CreditSection /></MainLayout>} />
        <Route path="/epargne" element={<MainLayout><SubServicesSection /></MainLayout>} />
        <Route path="/testimonials" element={<MainLayout><TestimonialsSection /></MainLayout>} />
        <Route path="/contact_us" element={<MainLayout><ContactUs /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
