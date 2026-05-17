import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
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
  );
}
