import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, ChevronDown } from 'lucide-react';
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
  service: string;
  duration: number;
  specialRequests: string;
};

const SERVICES = [
  { value: "Relaxation Journey", description: "A calming experience focusing on gentle techniques to melt away stress." },
  { value: "Rejuvenation Therapy", description: "An invigorating treatment using coastal ingredients to refresh body and mind." },
  { value: "Restorative Body Treatment", description: "Deeply relaxing therapy aimed at releasing tension and restoring balance." },
  { value: "Holistic Wellness Package", description: "A comprehensive package combining our best therapies for complete renewal." },
  { value: "Consultation / Undecided", description: "Not sure? Speak with our therapists to tailor a treatment just for you." }
];

export default function BookingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<BookingFormData>();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const inputClass = "w-full border-b border-tamarind-200 py-3 px-3 text-tamarind-900 placeholder:text-tamarind-900/40 focus:outline-none focus:border-brand-500 focus:bg-brand-50/50 transition-all bg-transparent hover:border-tamarind-300 rounded-t-sm";

  const selectedService = watch('service');
  const selectedServiceDescription = SERVICES.find(s => s.value === selectedService)?.description;

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
      <div className="flex flex-col items-center justify-center py-12 text-center text-brand-900 fade-in">
        <CheckCircle className="w-16 h-16 text-brand-500 mb-6" />
        <h3 className="font-serif text-3xl mb-4">Your Retreat Awaits</h3>
        <p className="text-lg text-tamarind-700 max-w-md mx-auto mb-8">
          Thank you for choosing Ukwaju Spa. A gentle reminder of your reservation has been sent to your email. We look forward to welcoming you into our sanctuary.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="border-b border-tamarind-500 pb-1 text-sm uppercase tracking-widest hover:text-brand-700 transition-colors"
        >
          Book Another Experience
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 fade-in text-left" noValidate>
      {serverError && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl text-sm mb-6">
          {serverError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="booking-name" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Full Name</label>
          <input
            id="booking-name"
            {...register('name', { required: 'Name is required' })}
            className={cn(inputClass, errors.name && "border-red-300 focus:border-red-500")}
            placeholder="Jane Doe"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
          />
          {errors.name && <p id="booking-name-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="booking-email" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Email Address</label>
          <input
            id="booking-email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
            className={cn(inputClass, errors.email && "border-red-300 focus:border-red-500")}
            placeholder="jane@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
          />
          {errors.email && <p id="booking-email-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label htmlFor="booking-phone" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Phone</label>
          <input
            id="booking-phone"
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className={cn(inputClass, errors.phone && "border-red-300 focus:border-red-500")}
            placeholder="+254 700 000000"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
          />
          {errors.phone && <p id="booking-phone-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.phone.message}</p>}
        </div>

        {/* Guests */}
        <div className="space-y-1 relative group">
          <label htmlFor="booking-guests" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Number of Guests</label>
          <div className="relative">
            <select
              id="booking-guests"
              {...register('guests', { required: 'Please select number of guests', valueAsNumber: true })}
              className={cn(inputClass, "appearance-none pr-10 cursor-pointer", errors.guests && "border-red-300 focus:border-red-500")}
              aria-invalid={errors.guests ? "true" : "false"}
              aria-describedby={errors.guests ? "booking-guests-error" : undefined}
            >
              <option value="">Select guests</option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tamarind-700/50 pointer-events-none group-hover:text-tamarind-900 transition-colors" aria-hidden="true" />
          </div>
          {errors.guests && <p id="booking-guests-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.guests.message}</p>}
        </div>

        {/* Date */}
        <div className="space-y-1 relative">
          <label htmlFor="booking-date" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Date</label>
          <input
            id="booking-date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            className={cn(inputClass, "cursor-pointer", errors.date && "border-red-300 focus:border-red-500")}
            min={new Date().toISOString().split('T')[0]}
            aria-invalid={errors.date ? "true" : "false"}
            aria-describedby={errors.date ? "booking-date-error" : undefined}
          />
          {errors.date && <p id="booking-date-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className="space-y-1 relative">
          <label htmlFor="booking-time" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Time Preference</label>
          <input
            id="booking-time"
            type="time"
            {...register('time', { required: 'Time preference is required' })}
            className={cn(inputClass, "cursor-pointer", errors.time && "border-red-300 focus:border-red-500")}
            min="09:00"
            max="20:00"
            aria-invalid={errors.time ? "true" : "false"}
            aria-describedby={errors.time ? "booking-time-error" : undefined}
          />
          {errors.time && <p id="booking-time-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.time.message}</p>}
        </div>

        {/* Service */}
        <div className="space-y-1 md:col-span-1 group">
          <label htmlFor="booking-service" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Desired Service</label>
          <div className="relative">
            <select
              id="booking-service"
              {...register('service', { required: 'Please select a service' })}
              className={cn(inputClass, "appearance-none pr-10 cursor-pointer", errors.service && "border-red-300 focus:border-red-500")}
              aria-invalid={errors.service ? "true" : "false"}
              aria-describedby={
                errors.service 
                  ? "booking-service-error" 
                  : selectedServiceDescription 
                    ? "booking-service-description" 
                    : undefined
              }
            >
              <option value="">Select a service</option>
              {SERVICES.map(s => (
                <option key={s.value} value={s.value} title={s.description}>{s.value}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tamarind-700/50 pointer-events-none group-hover:text-tamarind-900 transition-colors" aria-hidden="true" />
          </div>
          {selectedServiceDescription && !errors.service && (
            <p id="booking-service-description" className="text-xs text-brand-700 mt-2 pl-3 italic fade-in">{selectedServiceDescription}</p>
          )}
          {errors.service && <p id="booking-service-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.service.message}</p>}
        </div>

        {/* Duration */}
        <div className="space-y-1 md:col-span-1 group">
          <label htmlFor="booking-duration" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Duration</label>
          <div className="relative">
            <select
              id="booking-duration"
              {...register('duration', { 
                required: 'Please select a duration', 
                valueAsNumber: true,
                min: { value: 60, message: 'Minimum duration is 60 minutes' }
              })}
              className={cn(inputClass, "appearance-none pr-10 cursor-pointer", errors.duration && "border-red-300 focus:border-red-500")}
              aria-invalid={errors.duration ? "true" : "false"}
              aria-describedby={errors.duration ? "booking-duration-error" : undefined}
            >
              <option value="">Select duration</option>
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
              <option value={120}>120 Minutes</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tamarind-700/50 pointer-events-none group-hover:text-tamarind-900 transition-colors" aria-hidden="true" />
          </div>
          {errors.duration && <p id="booking-duration-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.duration.message}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1">
        <label htmlFor="booking-special" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Any Special Intentions?</label>
        <textarea
          id="booking-special"
          {...register('specialRequests')}
          rows={3}
          className={cn(inputClass, "resize-none")}
          placeholder="Are there specific areas of tension, or are you celebrating an occasion?"
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-900 text-warm-white py-4 px-8 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-brand-700 disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </div>
    </form>
  );
}
