import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Waves } from 'lucide-react';

const AMENITIES_IMAGES = [
  "https://image-tc.galaxy.tf/wijpeg-9oxfokbmqw2qzgbbacmtassnf/swimming-pool2.jpg?width=1200",
  "https://image-tc.galaxy.tf/wijpeg-9lopu84bwdic9z3vq3iys9gqh/swimming-pool1.jpg?width=1200",
  "https://image-tc.galaxy.tf/wijpeg-8iysbhrknrfay2ocnq3pwnpg4/amenities-gym-tamarind-tree-2-43.jpg?width=1200",
  "https://image-tc.galaxy.tf/wijpeg-7r31ez0o4e331bcx7bhuef062/gym3.jpg?width=1200",
  "https://image-tc.galaxy.tf/wijpeg-9stejm233thsk0c580hpba3tv/gym5.jpg?width=1200"
];

export default function Philosophy() {
  const [currentAmenitiesIndex, setCurrentAmenitiesIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAmenitiesIndex((prev) => (prev + 1) % AMENITIES_IMAGES.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="philosophy" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="order-2 md:order-1 relative"
        >
          <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative bg-tamarind-100">
            <AnimatePresence>
              <motion.img 
                key={currentAmenitiesIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                src={AMENITIES_IMAGES[currentAmenitiesIndex]} 
                alt="Tamarind Tree Amenities" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
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
  );
}
