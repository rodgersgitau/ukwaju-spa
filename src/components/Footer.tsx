import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-tamarind-900 text-warm-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-b border-white/10 pb-16">
        <div className="col-span-1">
           <div className="text-2xl font-serif tracking-widest mb-2 flex flex-col">
            <span className="text-white font-bold">UKWAJU SPA</span>
            <span className="text-[0.5rem] tracking-[0.3em] font-sans opacity-70 border-tamarind-100">AT TAMARIND TREE HOTEL</span>
          </div>
          <p className="text-warm-white/60 text-sm font-light mt-6 leading-relaxed">
            At Ukwaju, we draw inspiration from the earth. Our signature experiences are infused with local botanical elements, cultivating a profound sense of inner well-being and inviting you to release, rebalance, and rejuvenate.
          </p>
        </div>
        
        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Connect & Visit</h4>
          <div className="space-y-4 text-sm font-light text-warm-white/70">
             <div className="flex items-start space-x-4">
               <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
               <span className="leading-relaxed truncate">Langata Link Road, Nairobi, Kenya</span>
             </div>
             
             <div className="flex items-center space-x-4">
               <Mail className="w-5 h-5 flex-shrink-0 text-white" />
               <a href="mailto:info@tamarindtree-hotels.com" className="hover:text-white transition-colors">info@tamarindtree-hotels.com</a>
             </div>
             
             <div className="flex items-center space-x-4">
               <Phone className="w-5 h-5 flex-shrink-0 text-white" />
               <a href="tel:+254709240000" className="hover:text-white transition-colors">+254 (0) 709 240 000</a>
             </div>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Hours</h4>
          <div className="space-y-3 text-sm font-light text-warm-white/70 pr-4">
             <div className="flex justify-between border-b border-white/10 pb-3">
               <span>Monday - Friday</span>
               <span className="font-medium text-warm-white">9:00 AM - 8:00 PM</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-3 pt-1">
               <span>Saturday</span>
               <span className="font-medium text-warm-white">8:00 AM - 9:00 PM</span>
             </div>
             <div className="flex justify-between pt-1">
               <span>Sunday</span>
               <span className="font-medium text-warm-white">9:00 AM - 7:00 PM</span>
             </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-warm-white/40 font-light gap-4 md:gap-0">
         <div className="flex-1 order-2 md:order-1 text-center md:text-left">
           <p>&copy; {new Date().getFullYear()} Tamarind Tree Hotel. All rights reserved.</p>
         </div>
         <div className="flex-1 order-1 md:order-2 flex justify-center space-x-6 items-center">
            <a href="#" className="hover:text-warm-white transition-colors text-white">
              <Instagram className="w-4 h-4"/> 
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-warm-white transition-colors text-white">
              <Facebook className="w-4 h-4"/> 
              <span className="sr-only">Facebook</span>
            </a>
         </div>
         <div className="flex-1 order-3 flex justify-center md:justify-end space-x-6 items-center">
           <a href="#" className="hover:text-warm-white transition-colors">Privacy Policy</a>
           <span className="w-1 h-1 rounded-full bg-warm-white/20"></span>
           <a href="#" className="hover:text-warm-white transition-colors">Terms of Service</a>
         </div>
      </div>
    </footer>
  );
}
