import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export type VoucherFormData = {
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  presetAmount: string;
  customAmount?: number;
  message: string;
};

export default function VoucherForm({ initialValues }: { initialValues?: Partial<VoucherFormData> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<VoucherFormData>({
    defaultValues: initialValues
  });
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const inputClass = "w-full border-b border-tamarind-200 py-3 px-3 text-tamarind-900 placeholder:text-tamarind-100/40 focus:outline-none focus:border-brand-500 focus:bg-brand-50/50 transition-all bg-transparent hover:border-tamarind-300 rounded-t-sm";

  const watchAmount = watch('presetAmount');

  const onSubmit = async (data: VoucherFormData) => {
    try {
      setServerError('');
      
      const finalAmount = data.presetAmount === 'custom' ? data.customAmount : parseInt(data.presetAmount, 10);
      
      const payload = {
        ...data,
        amount: finalAmount
      };

      const response = await fetch('/api/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      <div className="flex flex-col items-center justify-center py-12 text-center text-brand-900 fade-in">
        <CheckCircle className="w-16 h-16 text-brand-500 mb-6" />
        <h3 className="font-serif text-3xl mb-4">The Gift of Peace</h3>
        <p className="text-lg text-tamarind-700 max-w-md mx-auto mb-8">
          Your thoughtful gift voucher has been successfully delivered. Thank you for sharing the Ukwaju experience.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="border-b border-tamarind-500 pb-1 text-sm uppercase tracking-widest hover:text-brand-700 transition-colors"
        >
          Send Another Gift
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
        {/* Sender Name */}
        <div className="space-y-1">
          <label htmlFor="voucher-sender" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Your Name</label>
          <input
            id="voucher-sender"
            {...register('senderName', { 
              required: 'Your name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className={cn(inputClass, errors.senderName && "border-red-300 focus:border-red-500")}
            placeholder="Jane Doe"
            aria-invalid={errors.senderName ? "true" : "false"}
            aria-describedby={errors.senderName ? "voucher-sender-error" : undefined}
          />
          {errors.senderName && <p id="voucher-sender-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.senderName.message}</p>}
        </div>

        {/* Recipient Name */}
        <div className="space-y-1">
          <label htmlFor="voucher-recipient-name" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Recipient's Name</label>
          <input
            id="voucher-recipient-name"
            {...register('recipientName', { 
              required: 'Recipient name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className={cn(inputClass, errors.recipientName && "border-red-300 focus:border-red-500")}
            placeholder="John Smith"
            aria-invalid={errors.recipientName ? "true" : "false"}
            aria-describedby={errors.recipientName ? "voucher-recipient-name-error" : undefined}
          />
          {errors.recipientName && <p id="voucher-recipient-name-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.recipientName.message}</p>}
        </div>

        {/* Recipient Email */}
        <div className="space-y-1">
          <label htmlFor="voucher-recipient-email" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Recipient's Email</label>
          <input
            id="voucher-recipient-email"
            type="email"
            {...register('recipientEmail', { 
              required: 'Recipient email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
            className={cn(inputClass, errors.recipientEmail && "border-red-300 focus:border-brand-500")}
            placeholder="john@example.com"
            aria-invalid={errors.recipientEmail ? "true" : "false"}
            aria-describedby={errors.recipientEmail ? "voucher-recipient-email-error" : undefined}
          />
          {errors.recipientEmail && <p id="voucher-recipient-email-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.recipientEmail.message}</p>}
        </div>

        {/* Recipient Phone */}
        <div className="space-y-1">
          <label htmlFor="voucher-recipient-phone" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Recipient's Phone (Optional)</label>
          <input
            id="voucher-recipient-phone"
            type="tel"
            {...register('recipientPhone', {
              pattern: {
                value: /^\+?[\d\s\-().]{7,20}$/,
                message: 'Please enter a valid phone number'
              }
            })}
            className={cn(inputClass, errors.recipientPhone && "border-red-300 focus:border-red-500")}
            placeholder="+254 700 000000"
            aria-invalid={errors.recipientPhone ? "true" : "false"}
            aria-describedby={errors.recipientPhone ? "voucher-recipient-phone-error" : undefined}
          />
          {errors.recipientPhone && <p id="voucher-recipient-phone-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.recipientPhone.message}</p>}
        </div>

        {/* Amount */}
        <div className="space-y-1 md:col-span-2 group">
          <label htmlFor="voucher-preset-amount" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">Gift Amount (KES)</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full">
              <select
                id="voucher-preset-amount"
                {...register('presetAmount', { required: 'Please select an amount' })}
                className={cn(inputClass, "appearance-none pr-10 cursor-pointer", errors.presetAmount && "border-red-300 focus:border-red-500")}
                aria-invalid={errors.presetAmount ? "true" : "false"}
                aria-describedby={errors.presetAmount ? "voucher-preset-amount-error" : undefined}
              >
                <option value="">Select an amount</option>
                <option value="5000">KES 5,000</option>
                <option value="10000">KES 10,000</option>
                <option value="15000">KES 15,000</option>
                <option value="20000">KES 20,000 (Ultimate Experience)</option>
                <option value="custom">Custom Amount</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tamarind-700/50 pointer-events-none group-hover:text-tamarind-900 transition-colors" aria-hidden="true" />
            </div>
            
            {watchAmount === 'custom' && (
              <div className="w-full relative fade-in">
                <label htmlFor="voucher-custom-amount" className="sr-only">Custom Amount</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tamarind-700 opacity-60 z-10 pointer-events-none text-sm">KES</span>
                <input
                  id="voucher-custom-amount"
                  type="number"
                  {...register('customAmount', { 
                    validate: (value) => {
                      if (watchAmount === 'custom') {
                        if (!value) return 'Please enter a custom amount';
                        if (Number(value) < 1000) return 'Minimum amount is KES 1,000';
                      }
                      return true;
                    }
                  })}
                  placeholder="0"
                  className={cn(inputClass, "pl-12", errors.customAmount && "border-red-300 focus:border-red-500")}
                  aria-invalid={errors.customAmount ? "true" : "false"}
                  aria-describedby={errors.customAmount ? "voucher-custom-amount-error" : undefined}
                />
              </div>
            )}
          </div>
          {errors.presetAmount && <p id="voucher-preset-amount-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.presetAmount.message}</p>}
          {errors.customAmount && <p id="voucher-custom-amount-error" className="text-xs text-red-500 mt-1 pl-3" role="alert">{errors.customAmount.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="voucher-message" className="text-xs uppercase tracking-widest text-tamarind-700 font-medium pl-3">A Personal Message (Optional)</label>
        <textarea
          id="voucher-message"
          {...register('message')}
          rows={3}
          className={cn(inputClass, "resize-none")}
          placeholder="Wishing you a moment of pure tranquility..."
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-tamarind-900 text-warm-white py-4 px-8 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-tamarind-700 disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? 'Processing...' : 'Purchase Gift Voucher'}
        </button>
      </div>
    </form>
  );
}
