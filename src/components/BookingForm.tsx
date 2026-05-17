import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, ChevronDown, Feather, Sparkles, HeartPulse, Flower2, MessageCircle, Gift } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Simple utility for merging tailwind classes safely
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  duration: number;
  specialRequests: string;
};

const SERVICES = [
  { value: "Relaxation Journey", icon: Feather, description: "A calming experience focusing on gentle techniques to melt away stress." },
  { value: "Rejuvenation Therapy", icon: Sparkles, description: "An invigorating treatment using coastal ingredients to refresh body and mind." },
  { value: "Restorative Body Treatment", icon: HeartPulse, description: "Deeply relaxing therapy aimed at releasing tension and restoring balance." },
  { value: "Holistic Wellness Package", icon: Flower2, description: "A comprehensive package combining our best therapies for complete renewal." },
  { value: "Consultation / Undecided", icon: MessageCircle, description: "Not sure? Speak with our therapists to tailor a treatment just for you." },
  { value: "Book as Gift", icon: Gift, description: "Treat someone special to an unforgettable Ukwaju Spa experience." }
];

const getTodayDateString = () => {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

const getDefaultDateString = () => {
  const now = new Date();
  const day = now.getDay();
  let endHour = 20;
  if (day === 6) {
    endHour = 21;
  } else if (day === 0) {
    endHour = 19;
  }

  // If current time + 60 mins is past the closing hour (no slots left today), use tomorrow
  if (now.getHours() * 60 + now.getMinutes() + 60 > endHour * 60) {
    now.setDate(now.getDate() + 1);
  }
  
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

export default function BookingForm({ onGiftSelect }: { onGiftSelect?: (data: Partial<BookingFormData>) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue, getValues } = useForm<BookingFormData>({
    defaultValues: {
      duration: 60,
      date: getDefaultDateString(),
    }
  });
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingFormData | null>(null);
  const [serverError, setServerError] = useState('');
  
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClass = "w-full border-b border-tamarind-200 py-3 px-3 text-tamarind-900 placeholder:text-tamarind-900/40 focus:outline-none focus:border-brand-500 focus:bg-brand-50/50 transition-all bg-transparent hover:border-tamarind-300 rounded-t-sm";

  const selectedService = watch('service');
  const selectedServiceDescription = SERVICES.find(s => s.value === selectedService)?.description;

  const selectedDuration = watch('duration');
  const durationValue = parseInt(selectedDuration as any, 10) || 60;
  const selectedTime = watch('time');
  const selectedDate = watch('date');

  const { startHour, endHour, hoursString } = React.useMemo(() => {
    let start = 9;
    let end = 20;
    let str = "9 AM to 8 PM";

    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      if (!isNaN(dateObj.getTime())) {
        const day = dateObj.getUTCDay();
        if (day === 6) { // Saturday
          start = 8;
          end = 21;
          str = "8 AM to 9 PM";
        } else if (day === 0) { // Sunday
          start = 9;
          end = 19;
          str = "9 AM to 7 PM";
        }
      }
    }
    return { startHour: start, endHour: end, hoursString: str };
  }, [selectedDate]);

  const timeSlots = React.useMemo(() => {
    const slots = [];
    let currentStart = startHour * 60;
    const endLimit = endHour * 60;
    const interval = durationValue || 60;

    let minMinutesToday = 0;
    if (selectedDate === getTodayDateString()) {
      const today = new Date();
      minMinutesToday = today.getHours() * 60 + today.getMinutes();
    }

    while (currentStart + (durationValue || 60) <= endLimit) {
      const hours = Math.floor(currentStart / 60);
      const mins = currentStart % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      
      const displayHours = hours === 12 ? 12 : hours % 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayString = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;

      const isDisabled = currentStart < minMinutesToday;

      slots.push({ value: timeString, label: displayString, disabled: isDisabled });
      currentStart += interval;
    }
    return slots;
  }, [durationValue, startHour, endHour, selectedDate]);

  React.useEffect(() => {
    if (selectedTime && !timeSlots.find(s => s.value === selectedTime && !s.disabled)) {
      setValue('time', '', { shouldValidate: true });
    }
  }, [timeSlots, selectedTime, setValue]);

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
        setBookingDetails(data);
        setSuccess(true);
      } else {
        setServerError(result.error || 'Failed to submit booking. Please try again.');
      }
    } catch (err) {
      setServerError('A network error occurred. Please try again.');
    }
  };

  return (
    <>
      {success && bookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-tamarind-900/40 backdrop-blur-sm">
          <div className="bg-warm-white p-8 max-w-md w-full rounded-[2rem] shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center justify-center text-center text-brand-900">
              <CheckCircle className="w-16 h-16 text-brand-500 mb-6" />
              <h3 className="font-serif text-3xl mb-3">Your Retreat Awaits</h3>
              <p className="text-sm text-tamarind-700 mx-auto mb-8 font-light">
                Thank you, <strong className="font-medium text-tamarind-900">{bookingDetails.name}</strong>. A gentle reminder has been sent to your email.
              </p>
              
              <div className="w-full bg-warm-paper p-5 rounded-2xl mb-8 text-left space-y-4 text-sm text-tamarind-900 border border-tamarind-100">
                <div className="flex justify-between border-b border-tamarind-100 pb-3">
                  <span className="text-tamarind-700 font-medium text-xs uppercase tracking-widest">Service</span>
                  <span className="font-medium text-right max-w-[60%]">{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between border-b border-tamarind-100 pb-3">
                  <span className="text-tamarind-700 font-medium text-xs uppercase tracking-widest">Date</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between border-b border-tamarind-100 pb-3">
                  <span className="text-tamarind-700 font-medium text-xs uppercase tracking-widest">Time</span>
                  <span className="font-medium">
                    {(() => {
                      const timeStr = bookingDetails.time;
                      if (!timeStr) return '';
                      const [h, m] = timeStr.split(':');
                      if (!h || !m) return timeStr;
                      const hourNum = parseInt(h, 10);
                      const ampm = hourNum >= 12 ? 'PM' : 'AM';
                      const displayH = hourNum === 12 ? 12 : hourNum % 12;
                      return `${displayH}:${m} ${ampm}`;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tamarind-700 font-medium text-xs uppercase tracking-widest">Duration</span>
                  <span className="font-medium">{bookingDetails.duration} Minutes</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSuccess(false);
                  setBookingDetails(null);
                  reset();
                }}
                className="w-full bg-tamarind-900 text-warm-white py-3 px-6 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-tamarind-700 transition-colors"
                type="button"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

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

        {/* Service */}
        <div className="space-y-1 md:col-span-1 group">
          <label htmlFor="booking-service" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Desired Service</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="booking-service"
              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              className={cn(inputClass, "flex items-center justify-between cursor-pointer w-full text-left", errors.service && "border-red-300 focus:border-red-500")}
              aria-invalid={errors.service ? "true" : "false"}
              aria-describedby={
                errors.service 
                  ? "booking-service-error" 
                  : selectedServiceDescription 
                    ? "booking-service-description" 
                    : undefined
              }
            >
              <div className="flex items-center text-sm">
                {selectedService ? (
                  <>
                    {(() => {
                      const Icon = SERVICES.find(s => s.value === selectedService)?.icon || Feather;
                      return <Icon className="w-4 h-4 mr-2 text-tamarind-700/70" />;
                    })()}
                    <span>{selectedService}</span>
                  </>
                ) : (
                  <span className="text-tamarind-900/40">Select a service</span>
                )}
              </div>
              <ChevronDown className={cn("w-4 h-4 text-tamarind-700/50 transition-transform flex-shrink-0 ml-2", isServiceDropdownOpen && "rotate-180")} aria-hidden="true" />
            </button>
            
            {isServiceDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-warm-white border border-tamarind-100 rounded-sm shadow-lg max-h-60 overflow-auto">
                <ul className="py-1">
                  {SERVICES.map(s => (
                    <li key={s.value}>
                      <button
                        type="button"
                        onClick={() => {
                          if (s.value === "Book as Gift") {
                            onGiftSelect?.(getValues());
                            setIsServiceDropdownOpen(false);
                            return;
                          }
                          setValue('service', s.value, { shouldValidate: true });
                          setIsServiceDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2.5 text-left hover:bg-brand-50 transition-colors flex items-center",
                          selectedService === s.value ? "bg-brand-50/50 text-brand-900" : "text-tamarind-900"
                        )}
                        title={s.description}
                      >
                        <s.icon className="w-4 h-4 mr-3 text-tamarind-700/70 flex-shrink-0" />
                        <span className="text-sm">{s.value}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Hidden native input for react-hook-form */}
            <input type="hidden" {...register('service', { required: 'Please select a service' })} />
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
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
              <option value={120}>120 Minutes</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tamarind-700/50 pointer-events-none group-hover:text-tamarind-900 transition-colors" aria-hidden="true" />
          </div>
          {errors.duration && <p id="booking-duration-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.duration.message}</p>}
        </div>

        {/* Time */}
        <div className="space-y-3 relative md:col-span-2 mt-2">
          <div className="flex justify-between items-center pr-3">
             <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Time Preference</label>
             <span className="text-[10px] text-tamarind-600/70">Based on {durationValue || 60} mins duration</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 px-3">
            {timeSlots.map(slot => (
              <button
                key={slot.value}
                type="button"
                disabled={slot.disabled}
                onClick={() => setValue('time', slot.value, { shouldValidate: true })}
                className={cn(
                  "py-2.5 px-2 text-sm border rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
                  slot.disabled
                    ? "opacity-40 cursor-not-allowed bg-tamarind-50 text-tamarind-500 border-tamarind-100"
                    : selectedTime === slot.value 
                      ? "bg-brand-900 border-brand-900 text-warm-white shadow-sm" 
                      : "border-tamarind-200 text-tamarind-900 hover:bg-brand-50 hover:border-brand-300 bg-transparent"
                )}
                aria-pressed={selectedTime === slot.value}
              >
                {slot.label}
              </button>
            ))}
          </div>
          
          <input 
            type="hidden" 
            {...register('time', { required: 'Please select a time' })} 
          />
          <div className="flex justify-between items-center pl-3 pr-3 pt-1">
             <p id="booking-time-note" className="text-[10px] text-tamarind-600/70">Available slots: {hoursString}</p>
             {errors.time && <p id="booking-time-error" className="text-xs text-red-500" role="alert">{errors.time.message}</p>}
          </div>
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
          className="w-full bg-tamarind-900 text-warm-white py-4 px-8 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-tamarind-700 disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </div>
      </form>
    </>
  );
}
