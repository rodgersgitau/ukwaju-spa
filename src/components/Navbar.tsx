import React from 'react';

type NavbarProps = {
  setActiveForm: (form: 'booking' | 'voucher') => void;
};

export default function Navbar({ setActiveForm }: NavbarProps) {
  return (
    <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center transition-all bg-warm-white/80 backdrop-blur-md border-b border-tamarind-100/50">
      <div className="text-xl font-serif tracking-widest text-tamarind-900 flex flex-col">
        <span className="text-brand-500 font-bold">UKWAJU SPA</span>
        <span className="text-[0.45rem] tracking-[0.3em] font-sans opacity-70">AT TAMARIND TREE HOTEL</span>
      </div>
      <div className="hidden md:flex space-x-8 text-xs tracking-widest uppercase font-medium">
        <a href="#philosophy" className="hover:text-brand-700 transition-colors">Philosophy</a>
        <a href="#booking" onClick={() => setActiveForm('booking')} className="hover:text-brand-700 transition-colors">Reservations</a>
        <a href="#gifting" onClick={() => setActiveForm('voucher')} className="hover:text-brand-700 transition-colors">Gifting</a>
      </div>
      <a 
        href="https://wa.me/254709240000?text=Hello%2C%20I%20would%20like%20to%20make%20a%20booking%20at%20Ukwaju%20Spa"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs tracking-widest uppercase border border-tamarind-700 text-tamarind-900 px-6 py-2 rounded-full hover:bg-tamarind-700 hover:text-warm-white transition-all font-medium flex items-center space-x-2"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>Book via WhatsApp</span>
      </a>
    </nav>
  );
}
