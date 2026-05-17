import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronRight, Leaf, Waves, Sun, MapPin } from 'lucide-react';
import BookingForm from './components/BookingForm';
import VoucherForm from './components/VoucherForm';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const HERO_IMAGES = [
  "https://image-tc.galaxy.tf/wijpeg-8mx0qxzmskyrv4d9a43zr7eqa/spa-placeholder-1.jpg?width=1920",
  "https://image-tc.galaxy.tf/wijpeg-b7czd6xsrtr7oj2etekjx2ng3/spa-placeholder-2.jpg?width=1920",
  "https://image-tc.galaxy.tf/wipng-8n7ec8ahgihj6l2klxne0zcme/spa-placeholder-3.png?width=1920",
  "https://image-tc.galaxy.tf/wijpeg-bfh15frdhalfrvay9a68tvk6r/spa-placeholder-4.jpg?width=1920"
];

export default function App() {
  const [activeForm, setActiveForm] = useState<'booking' | 'voucher'>('booking');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-warm-white text-tamarind-900 font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center transition-all bg-warm-white/80 backdrop-blur-md border-b border-tamarind-100/50">
        <div className="text-xl font-serif tracking-widest text-tamarind-900 flex flex-col">
          <span className="text-brand-500 font-bold">UKWAJU SPA</span>
          <span className="text-[0.45rem] tracking-[0.3em] font-sans opacity-70">AT TAMARIND TREE HOTEL</span>
        </div>
        <div className="hidden md:flex space-x-8 text-xs tracking-widest uppercase font-medium">
          <a href="#philosophy" className="hover:text-brand-700 transition-colors">Philosophy</a>
          <a href="#booking" className="hover:text-brand-700 transition-colors">Reservations</a>
          <a href="#gifting" className="hover:text-brand-700 transition-colors">Gifting</a>
        </div>
        <a 
          href="#booking" 
          className="text-xs tracking-widest uppercase border border-tamarind-700 px-6 py-2 rounded-full hover:bg-tamarind-700 hover:text-warm-white transition-all"
        >
          Book Now
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-tamarind-900 group">
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              src={HERO_IMAGES[currentImageIndex]} 
              alt="Ukwaju Spa" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-tamarind-900/40 mix-blend-multiply z-10 pointer-events-none" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-warm-white/80 text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            A Sanctuary of Stillness
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-serif text-warm-white mb-8 text-balance font-light"
          >
            Reconnect with Your Vitality
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-warm-paper text-lg font-light max-w-xl mx-auto"
          >
            Step into Ukwaju, where time slows, the mind clears, and nature's restorative touch awakens the senses.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-warm-white/60 z-20 pointer-events-none"
        >
          <span className="text-[0.65rem] tracking-widest uppercase mb-4">Discover More</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
             <motion.div 
               animate={{ y: [0, 48] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
               className="w-full h-1/2 bg-white absolute top-0"
             />
          </div>
        </motion.div>

        {/* Carousel Indicators / Thumbnails */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 flex space-x-3 pointer-events-auto">
          {HERO_IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={cn(
                "relative overflow-hidden w-20 h-14 md:w-28 md:h-20 transition-all duration-500 cursor-pointer rounded overflow-hidden",
                currentImageIndex === idx 
                  ? "border-[1.5px] border-warm-white shadow-lg shadow-black/30" 
                  : "border border-transparent opacity-60 hover:opacity-100"
              )}
            >
              {/* Overlay for inactive thumbnails */}
              <div 
                className={cn(
                  "absolute inset-0 transition-colors duration-500 z-10 pointer-events-none",
                  currentImageIndex !== idx && "bg-tamarind-900/40"
                )} 
              />
              <motion.img 
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.4 }}
                src={img} 
                alt={`Spa view ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-2 md:order-1 relative"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
              <img 
                src="https://image-tc.galaxy.tf/wijpeg-9oxfokbmqw2qzgbbacmtassnf/swimming-pool2.jpg?width=1200" 
                alt="Natural Spa Ingredients" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-tamarind-500 rounded-[2rem] -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-100 rounded-full -z-10" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 md:order-2 space-y-8"
          >
            <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-2 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif text-tamarind-900 leading-tight">
              Rooted in Nature,<br />Crafted for You.
            </h2>
            <p className="text-tamarind-700 leading-relaxed font-light text-lg">
              At Ukwaju, we draw inspiration from the earth. Our signature experiences are infused with local botanical elements—rich tamarind extracts, healing earth clays, and native botanical oils. 
            </p>
            <p className="text-tamarind-700 leading-relaxed font-light text-lg">
              We focus not just on the body, but on cultivating a profound sense of inner well-being. Every journey with us is an invitation to release, rebalance, and rejuvenate.
            </p>
            
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div className="space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-xl">Local Wisdom</h4>
                <p className="text-sm font-light text-tamarind-700">Therapies honoring ancient coastal traditions and native ingredients.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                  <Waves className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-xl">Deep Serenity</h4>
                <p className="text-sm font-light text-tamarind-700">Designed to guide the mind away from noise and toward absolute quiet.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brochure CTA Section */}
      <section className="relative py-32 bg-tamarind-900 text-warm-white overflow-hidden">
        <div className="absolute inset-0">
           <img 
              src="https://image-tc.galaxy.tf/wijpeg-fz79olm11325tcd55lqd0hwm/outside-view-1-tamarind-tree.jpg?width=1920" 
              className="w-full h-full object-cover" 
              alt="Ukwaju Spa View" 
           />
           <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-tamarind-900/90 via-tamarind-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Explore the Ukwaju Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-warm-paper/80 max-w-xl mx-auto mb-10 font-light text-lg"
          >
            Discover our full spectrum of wellness rituals. Download our brochure to explore the subtle nuances of our mindful offerings.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
          >
            <a 
              href="/Ukwaju_Spa_Brochure.pdf" 
              download
              className="inline-flex items-center space-x-3 bg-warm-white text-tamarind-900 px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-brand-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking / Gifting Section */}
      <section id="booking" className="py-32 px-6 bg-warm-paper">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-tamarind-900 mb-6">Begin Your Retreat</h2>
            <div className="flex justify-center space-x-2">
              <button 
                onClick={() => setActiveForm('booking')}
                className={cn(
                  "px-8 py-3 text-xs tracking-widest uppercase transition-all rounded-full",
                  activeForm === 'booking' 
                    ? "bg-tamarind-900 text-warm-white" 
                    : "bg-transparent text-tamarind-700 hover:bg-tamarind-100"
                )}
              >
                Reserve a Time
              </button>
              <button 
                id="gifting"
                onClick={() => setActiveForm('voucher')}
                className={cn(
                  "px-8 py-3 text-xs tracking-widest uppercase transition-all rounded-full",
                  activeForm === 'voucher' 
                    ? "bg-brand-700 text-warm-white" 
                    : "bg-transparent text-tamarind-700 hover:bg-tamarind-100"
                )}
              >
                Gift a Voucher
              </button>
            </div>
          </div>

          <div className="bg-warm-white p-8 md:p-16 rounded-[2rem] shadow-xl shadow-tamarind-900/5 max-w-4xl mx-auto border border-white">
            {activeForm === 'booking' ? <BookingForm key="booking" /> : <VoucherForm key="voucher" />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tamarind-900 text-warm-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="text-2xl font-serif tracking-widest mb-2 flex flex-col">
              <span className="text-brand-500 font-bold">UKWAJU SPA</span>
              <span className="text-[0.5rem] tracking-[0.3em] font-sans opacity-70 border-tamarind-100">AT TAMARIND TREE HOTEL</span>
            </div>
            <p className="text-warm-white/60 text-sm font-light mt-6">
              A haven of peace inspired by the rich coastal heritage and the therapeutic power of nature.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Visit Us</h4>
            <div className="space-y-4 text-sm font-light text-warm-white/70">
               <p className="flex items-start space-x-3">
                 <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                 <span>Tamarind Tree Hotel<br/>Langata Road, Nairobi<br/>Kenya</span>
               </p>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Hours</h4>
            <div className="space-y-2 text-sm font-light text-warm-white/70">
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span>Monday - Friday</span>
                 <span>9:00 AM - 8:00 PM</span>
               </div>
               <div className="flex justify-between border-b border-white/10 pb-2 pt-2">
                 <span>Saturday</span>
                 <span>8:00 AM - 9:00 PM</span>
               </div>
               <div className="flex justify-between pt-2">
                 <span>Sunday</span>
                 <span>9:00 AM - 7:00 PM</span>
               </div>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Connect</h4>
            <div className="space-y-2 text-sm font-light text-warm-white/70">
              <a href="#" className="block hover:text-white transition-colors">info@tamarindtree-hotels.com</a>
              <a href="#" className="block hover:text-white transition-colors">+254 (0) 709 240 000</a>
              <div className="pt-4 space-x-4">
                 <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Instagram</a>
                 <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-warm-white/40 font-light space-y-4 md:space-y-0">
           <p>&copy; {new Date().getFullYear()} Ukwaju Spa by Tamarind Tree Hotel. All rights reserved.</p>
           <div className="space-x-6">
             <a href="#" className="hover:text-warm-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-warm-white transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
