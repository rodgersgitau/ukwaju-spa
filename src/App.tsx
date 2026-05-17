import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import BrochureCTA from './components/BrochureCTA';
import Reservations from './components/Reservations';
import Footer from './components/Footer';

export default function App() {
  const [activeForm, setActiveForm] = useState<'booking' | 'voucher'>('booking');
  const [voucherInitialData, setVoucherInitialData] = useState<any>({});

  return (
    <div className="min-h-screen bg-warm-white text-tamarind-900 font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Navbar setActiveForm={setActiveForm} />
      <Hero />
      <Philosophy />
      <BrochureCTA />
      <Reservations 
        activeForm={activeForm} 
        setActiveForm={setActiveForm} 
        voucherInitialData={voucherInitialData}
        setVoucherInitialData={setVoucherInitialData}
      />
      <Footer />
    </div>
  );
}
