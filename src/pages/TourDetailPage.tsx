import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Download, MapPin, Star, User, Users } from 'lucide-react';
import tours from '../data/tours';
import TourGallery from '../components/tours/TourGallery';
import { useCurrency } from '../context/CurrencyContext';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('details');

  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('tour.notFound')}</h2>
        <Link to="/tours" className="text-primary-600 hover:text-primary-800 underline">
          {t('tour.backToTours')}
        </Link>
      </div>
    );
  }

  // Find related tours (same categories, excluding current tour)
  const relatedTours = tours
    .filter(t => 
      t.id !== tour.id && 
      t.categories.some(cat => tour.categories.includes(cat))
    )
    .slice(0, 3);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {t(tour.titleKey)}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-200">
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{tour.duration} {t('tour.days')}</span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              <span>2-12 {t('form.guests')}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>Azerbaijan</span>
            </div>
            <div className="flex items-center">
              <Star size={18} className="mr-2 text-secondary-500" />
              <span>{tour.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <TourGallery images={tour.imageUrls} tourName={t(tour.titleKey)} />
            
            {/* Tabs */}
            <div className="mt-8 border-b border-neutral-200">
              <div className="flex flex-wrap -mb-px">
                <button
                  className={`mr-4 py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-secondary-500 text-secondary-500'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  {t('tour.details')}
                </button>
                <button
                  className={`mr-4 py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'itinerary'
                      ? 'border-secondary-500 text-secondary-500'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  {t('tour.itinerary')}
                </button>
                <button
                  className={`mr-4 py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'included'
                      ? 'border-secondary-500 text-secondary-500'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                  onClick={() => setActiveTab('included')}
                >
                  {t('tour.included')}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-6">
              {activeTab === 'details' && (
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{t(tour.descriptionKey)}</p>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Proin eget mauris a ligula rutrum maximus eu non urna. Curabitur in augue sit amet libero feugiat laoreet. Duis ut augue maximus, hendrerit lectus a, faucibus libero.
                  </p>
                  <p>
                    Mauris molestie neque nec arcu volutpat, nec porttitor libero tincidunt. Phasellus non diam eu tortor mollis mollis vel vel urna. Morbi dapibus tellus a odio fermentum, a blandit turpis maximus. Sed hendrerit magna non elementum tristique.
                  </p>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  {Array.from({ length: tour.duration }).map((_, index) => (
                    <div key={index} className="border-l-4 border-primary-900 pl-4 pb-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">Day {index + 1}</h3>
                      <p className="text-neutral-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Proin eget mauris a ligula rutrum maximus eu non urna.
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'included' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">{t('tour.included')}</h3>
                    <ul className="space-y-2 text-neutral-600">
                      <li className="flex items-center">
                        <span className="text-success-500 mr-2">✓</span>
                        Professional local guide
                      </li>
                      <li className="flex items-center">
                        <span className="text-success-500 mr-2">✓</span>
                        Transportation
                      </li>
                      <li className="flex items-center">
                        <span className="text-success-500 mr-2">✓</span>
                        Accommodation ({tour.duration - 1} nights)
                      </li>
                      <li className="flex items-center">
                        <span className="text-success-500 mr-2">✓</span>
                        Meals as per itinerary
                      </li>
                      <li className="flex items-center">
                        <span className="text-success-500 mr-2">✓</span>
                        Entrance fees
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">{t('tour.notIncluded')}</h3>
                    <ul className="space-y-2 text-neutral-600">
                      <li className="flex items-center">
                        <span className="text-error-500 mr-2">✕</span>
                        International flights
                      </li>
                      <li className="flex items-center">
                        <span className="text-error-500 mr-2">✕</span>
                        Travel insurance
                      </li>
                      <li className="flex items-center">
                        <span className="text-error-500 mr-2">✕</span>
                        Personal expenses
                      </li>
                      <li className="flex items-center">
                        <span className="text-error-500 mr-2">✕</span>
                        Optional activities
                      </li>
                      <li className="flex items-center">
                        <span className="text-error-500 mr-2">✕</span>
                        Tips and gratuities
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-sm text-neutral-500">{t('tour.price')}</span>
                <div className="text-3xl font-bold text-primary-900">
                  {formatPrice(tour.price.usd, tour.price.azn)}
                  <span className="text-sm font-normal text-neutral-500 ml-1">/ {t('form.person')}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">{t('form.dates')}</h3>
                <div className="space-y-2">
                  {tour.availableDates.map((date, index) => (
                    <div key={index} className="flex items-center">
                      <Calendar size={18} className="mr-2 text-primary-900" />
                      <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/booking/${tour.id}`)}
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-semibold py-3 rounded transition-colors duration-200"
                >
                  {t('tour.bookNow')}
                </button>
                
                <button className="w-full flex items-center justify-center bg-transparent border border-primary-900 text-primary-900 hover:bg-primary-50 py-3 rounded transition-colors duration-200">
                  <Download size={18} className="mr-2" />
                  {t('tour.downloadPdf')}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-semibold mb-4">{t('booking.needHelp')}</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Have questions about this tour? Our travel experts are ready to help.
                </p>
                <a
                  href="tel:+994123456789"
                  className="flex items-center text-primary-900 font-medium hover:text-primary-700"
                >
                  <Phone size={18} className="mr-2" />
                  +994 12 345 67 89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-primary-900">{t('tour.relatedTours')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map(relatedTour => (
                <div key={relatedTour.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Link to={`/tours/${relatedTour.id}`} className="block relative h-48 overflow-hidden">
                    <img 
                      src={relatedTour.imageUrls[0]} 
                      alt={t(relatedTour.titleKey)} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-secondary-500 text-primary-900 font-semibold px-3 py-1 rounded-full text-sm">
                      {formatPrice(relatedTour.price.usd, relatedTour.price.azn)}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/tours/${relatedTour.id}`} className="block">
                      <h3 className="text-lg font-semibold mb-2 text-primary-900 hover:text-primary-700 transition-colors duration-200">
                        {t(relatedTour.titleKey)}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{relatedTour.duration} {t('tour.days')}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} fill="currentColor" className="mr-1 text-secondary-500" />
                        <span>{relatedTour.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetailPage;