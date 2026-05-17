import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function BrochureCTA() {
  return (
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
  );
}
