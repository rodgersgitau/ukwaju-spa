import React from 'react';
import BookingForm from './BookingForm';
import VoucherForm from './VoucherForm';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type ReservationsProps = {
  activeForm: 'booking' | 'voucher';
  setActiveForm: (form: 'booking' | 'voucher') => void;
  voucherInitialData: any;
  setVoucherInitialData: (data: any) => void;
};

export default function Reservations({ activeForm, setActiveForm, voucherInitialData, setVoucherInitialData }: ReservationsProps) {
  return (
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
                  ? "bg-brand-700 text-warm-white" 
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
          {activeForm === 'booking' ? (
            <BookingForm 
              key="booking" 
              onGiftSelect={(data) => {
                setVoucherInitialData({
                  senderName: data.name,
                  recipientPhone: data.phone,
                  recipientEmail: data.email
                });
                setActiveForm('voucher');
                
                // Scroll slightly down to ensure form is fully visible
                document.getElementById('gifting')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }} 
            />
          ) : (
            <VoucherForm key="voucher" initialValues={voucherInitialData} />
          )}
        </div>
      </div>
    </section>
  );
}
