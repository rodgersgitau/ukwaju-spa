import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Gift } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type VoucherFormData = {
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  message: string;
};

export default function VoucherForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<VoucherFormData>();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: VoucherFormData) => {
    try {
      setServerError('');
      const response = await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        setServerError(result.error || 'Failed to send voucher. Please try again.');
      }
    } catch (err) {
      setServerError('A network error occurred. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-sage-900 fade-in">
        <CheckCircle className="w-16 h-16 text-sage-500 mb-6" />
        <h3 className="font-serif text-3xl mb-4">The Gift of Peace</h3>
        <p className="text-lg text-tamarind-700 max-w-md mx-auto mb-8">
          Your thoughtful gift voucher has been successfully delivered. Thank you for sharing the Ukwaju experience.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="border-b border-tamarind-500 pb-1 text-sm uppercase tracking-widest hover:text-sage-700 transition-colors"
        >
          Send Another Gift
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
        {/* Sender Name */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Your Name</label>
          <input
            {...register('senderName', { required: 'Your name is required' })}
            className={cn(
              "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
              errors.senderName && "border-red-300 focus:border-red-500"
            )}
            placeholder="Jane Doe"
          />
          {errors.senderName && <p className="text-xs text-red-500 mt-1">{errors.senderName.message}</p>}
        </div>

        {/* Recipient Name */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Recipient's Name</label>
          <input
            {...register('recipientName', { required: 'Recipient name is required' })}
            className={cn(
              "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
              errors.recipientName && "border-red-300 focus:border-red-500"
            )}
            placeholder="John Smith"
          />
          {errors.recipientName && <p className="text-xs text-red-500 mt-1">{errors.recipientName.message}</p>}
        </div>

        {/* Recipient Email */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Recipient's Email</label>
          <input
            type="email"
            {...register('recipientEmail', { 
              required: 'Recipient email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent",
               errors.recipientEmail && "border-red-300 focus:border-red-500"
            )}
            placeholder="john@example.com"
          />
          {errors.recipientEmail && <p className="text-xs text-red-500 mt-1">{errors.recipientEmail.message}</p>}
        </div>

        {/* Amount */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">Gift Amount (KES)</label>
          <select
            {...register('amount', { required: 'Please select an amount', valueAsNumber: true })}
            className={cn(
               "w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent appearance-none",
               errors.amount && "border-red-300 focus:border-red-500"
            )}
          >
            <option value="">Select an amount</option>
            <option value="5000">KES 5,000</option>
            <option value="10000">KES 10,000</option>
            <option value="15000">KES 15,000</option>
            <option value="20000">KES 20,000(Ultimate Experience)</option>
          </select>
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-tamarind-700 font-medium">A Personal Message (Optional)</label>
        <textarea
          {...register('message')}
          rows={3}
          className="w-full bg-warm-white border-b border-tamarind-100 py-3 px-0 focus:outline-none focus:border-sage-500 transition-colors bg-transparent resize-none"
          placeholder="Wishing you a moment of pure tranquility..."
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-tamarind-700 text-warm-white py-4 px-8 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-tamarind-900 disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? 'Processing...' : 'Purchase Gift Voucher'}
        </button>
      </div>
    </form>
  );
}
