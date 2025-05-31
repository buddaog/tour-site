import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronRight, ChevronLeft, CheckCircle, Calendar, Users, AlertCircle } from 'lucide-react';
import { Tour, BookingFormData } from '../../types';

interface BookingFormProps {
  tour: Tour;
  onSubmitSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ tour, onSubmitSuccess }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors } 
  } = useForm<BookingFormData>({
    defaultValues: {
      tourId: tour.id,
      fullName: '',
      email: '',
      phone: '',
      guests: 2,
      startDate: null,
      endDate: null,
      requirements: '',
      consent: false,
    }
  });

  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');
  
  const steps = [
    { key: 'booking.step1', icon: Calendar },
    { key: 'booking.step2', icon: Users },
    { key: 'booking.step3', icon: CheckCircle },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    setIsSubmitting(true);
    setFormError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        console.log('Booking submitted:', data);
        onSubmitSuccess();
      } catch (error) {
        setFormError(t('booking.error'));
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Parse available dates from strings to Date objects
  const availableDates = tour.availableDates.map(dateStr => new Date(dateStr));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index < currentStep
                    ? 'bg-success-500 text-white'
                    : index === currentStep
                    ? 'bg-primary-900 text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              <span className="text-sm text-neutral-600">{t(step.key)}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 -translate-y-1/2"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary-900 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Error */}
      {formError && (
        <div className="bg-error-100 text-error-900 p-4 rounded-md mb-6 flex items-center">
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{formError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Tour Details */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">{t('booking.step1')}</h3>
            
            <div>
              <label className="block text-neutral-700 mb-2">{t('form.dates')}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">{t('form.startDate')}</label>
                  <DatePicker
                    selected={watchStartDate}
                    onChange={(date) => setValue('startDate', date)}
                    selectsStart
                    startDate={watchStartDate}
                    endDate={watchEndDate}
                    includeDates={availableDates}
                    minDate={new Date()}
                    placeholderText="Select start date"
                    className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.startDate && (
                    <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">{t('form.endDate')}</label>
                  <DatePicker
                    selected={watchEndDate}
                    onChange={(date) => setValue('endDate', date)}
                    selectsEnd
                    startDate={watchStartDate}
                    endDate={watchEndDate}
                    minDate={watchStartDate || new Date()}
                    placeholderText="Select end date"
                    className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!watchStartDate}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="guests">
                {t('form.guests')}
              </label>
              <input
                id="guests"
                type="number"
                min="1"
                max="20"
                {...register('guests', { required: true, min: 1, max: 20 })}
                className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.guests && (
                <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
              )}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="requirements">
                {t('form.requirements')}
              </label>
              <textarea
                id="requirements"
                rows={4}
                {...register('requirements')}
                className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">{t('booking.step2')}</h3>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="fullName">
                {t('form.fullName')} *
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName', { required: true })}
                className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.fullName && (
                <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
              )}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="email">
                {t('form.email')} *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.email?.type === 'required' && (
                <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="text-error-500 text-sm mt-1">{t('form.invalidEmail')}</p>
              )}
            </div>
            
            <div>
              <label className="block text-neutral-700 mb-2" htmlFor="phone">
                {t('form.phone')} *
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone', { 
                  required: true,
                  pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
                })}
                className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.phone?.type === 'required' && (
                <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
              )}
              {errors.phone?.type === 'pattern' && (
                <p className="text-error-500 text-sm mt-1">{t('form.invalidPhone')}</p>
              )}
            </div>
            
            <div className="flex items-start">
              <input
                id="consent"
                type="checkbox"
                {...register('consent', { required: true })}
                className="mt-1 mr-2"
              />
              <label htmlFor="consent" className="text-sm text-neutral-600">
                {t('form.consent')} *
              </label>
            </div>
            {errors.consent && (
              <p className="text-error-500 text-sm mt-1">{t('form.required')}</p>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">{t('booking.step3')}</h3>
            
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-primary-900 mb-2">{t('booking.summary')}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t(tour.titleKey)}</span>
                  <span className="font-semibold">{watch('guests')} {t('form.guests')}</span>
                </div>
                {watchStartDate && watchEndDate && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('form.dates')}</span>
                    <span className="font-semibold">
                      {watchStartDate.toLocaleDateString()} - {watchEndDate.toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-neutral-200 mt-2 pt-2 flex justify-between">
                  <span className="font-semibold">{t('booking.total')}</span>
                  <span className="font-bold text-primary-900">${tour.price.usd * watch('guests')}</span>
                </div>
              </div>
            </div>
            
            {/* Payment method selection would go here in a real implementation */}
            <div className="bg-warning-100 text-warning-900 p-4 rounded-md">
              <p className="text-sm">
                This is a demo booking form. In a production environment, this step would include payment processing.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-6 py-3 border border-primary-900 text-primary-900 rounded-md hover:bg-primary-50 transition-colors duration-200"
            >
              <ChevronLeft size={18} className="mr-1" />
              {t('booking.back')}
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto flex items-center px-6 py-3 bg-primary-900 text-white rounded-md hover:bg-primary-800 transition-colors duration-200"
            >
              {t('booking.next')}
              <ChevronRight size={18} className="ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-semibold rounded-md transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? `${t('booking.processing')}...` : t('booking.submit')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;