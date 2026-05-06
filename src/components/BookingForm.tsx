import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, FileText, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Simple utility for merging tailwind classes safely
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
};

export default function BookingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingFormData>();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: BookingFormData) => {
    try {
      setServerError('');
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        setServerError(result.error || 'Failed to submit booking. Please try again.');
      }
    } catch (err) {
      setServerError('A network error occurred. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-sage-900 fade-in">
        <CheckCircle className="w-16 h-16 text-sage-500 mb-6" />
        <h3 className="font-serif text-3xl mb-4">Your Retreat Awaits</h3>
        <p className="text-lg text-tamarind-700 max-w-md mx-auto mb-8">
          Thank you for choosing Ukwaju Spa. A gentle reminder of your reservation has been sent to your email. We look forward to welcoming you into our sanctuary.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="border-b border-tamarind-500 pb-1 text-sm uppercase tracking-widest hover:text-sage-700 transition-colors"
        >
          Book Another Experience
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 fade-in text-left">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl text-sm mb-6">
          {serverError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Full Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={cn(
              "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
              errors.name && "border-red-300 focus:border-red-500"
            )}
            placeholder="Jane Doe"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Email Address</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
               errors.email && "border-red-300 focus:border-red-500"
            )}
            placeholder="jane@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Phone</label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
               errors.phone && "border-red-300 focus:border-red-500"
            )}
            placeholder="+254 700 000000"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Guests */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Number of Guests</label>
          <select
            {...register('guests', { required: 'Please select number of guests', valueAsNumber: true })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent appearance-none",
               errors.guests && "border-red-300 focus:border-red-500"
            )}
          >
            <option value="">Select guests</option>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
          {errors.guests && <p className="text-xs text-red-500 mt-1">{errors.guests.message}</p>}
        </div>

        {/* Date */}
        <div className="space-y-1 relative">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
               errors.date && "border-red-300 focus:border-red-500"
            )}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className="space-y-1 relative">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Time Preference</label>
          <input
            type="time"
            {...register('time', { required: 'Time preference is required' })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
               errors.time && "border-red-300 focus:border-red-500"
            )}
            min="09:00"
            max="20:00"
          />
          {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Any Special Intentions?</label>
        <textarea
          {...register('specialRequests')}
          rows={3}
          className="w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent resize-none"
          placeholder="Are there specific areas of tension, or are you celebrating an occasion?"
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sage-900 text-warm-white py-4 px-8 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-sage-700 disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </div>
    </form>
  );
}
