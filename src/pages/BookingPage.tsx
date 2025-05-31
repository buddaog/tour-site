import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import tours from '../data/tours';
import BookingForm from '../components/booking/BookingForm';
import { useCurrency } from '../context/CurrencyContext';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return <Navigate to="/tours\" replace />;
  }

  const handleBookingSuccess = () => {
    setIsBookingComplete(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24 pb-16 bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4">
        <Link 
          to={`/tours/${tour.id}`} 
          className="inline-flex items-center text-primary-900 hover:text-primary-700 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('tour.backToTour')}
        </Link>

        <h1 className="text-3xl font-bold mb-2 font-heading text-primary-900">
          {t('booking.title')}
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          {t('booking.subtitle')}
        </p>

        {isBookingComplete ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary-900">
              {t('booking.success')}
            </h2>
            <p className="text-neutral-600 mb-6">
              We've sent you a confirmation email with all the details of your booking. Our team will contact you shortly to finalize your reservation.
            </p>
            <Link
              to="/"
              className="inline-block bg-primary-900 hover:bg-primary-800 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200"
            >
              {t('nav.home')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BookingForm tour={tour} onSubmitSuccess={handleBookingSuccess} />
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4 text-primary-900">
                  {t(tour.titleKey)}
                </h3>
                
                <div className="aspect-w-16 aspect-h-9 mb-4 rounded-md overflow-hidden">
                  <img 
                    src={tour.imageUrls[0]} 
                    alt={t(tour.titleKey)} 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-600">{t('tour.duration')}</span>
                    <span className="font-semibold">{tour.duration} {t('tour.days')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-600">{t('tour.price')}</span>
                    <span className="font-semibold">{formatPrice(tour.price.usd, tour.price.azn)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-600">{t('tour.rating')}</span>
                    <div className="flex items-center">
                      <span className="text-secondary-500 mr-1">★</span>
                      <span className="font-semibold">{tour.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">{t('booking.total')}</span>
                    <span className="text-xl font-bold text-primary-900">{formatPrice(tour.price.usd, tour.price.azn)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    By proceeding with this booking, you agree to our terms and conditions and cancellation policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;