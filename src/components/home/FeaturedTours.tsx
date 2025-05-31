
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import tours from '../../data/tours';
import { useCurrency } from '../../context/CurrencyContext';

const FeaturedTours: React.FC = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedTour, setSelectedTour] = useState(null);

  const featuredTours = tours.filter(tour => tour.featured);

  return (
    <section className="py-20 bg-neutral-50">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-primary-900">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour, index) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{
                animation: inView ? 'fadeIn 0.5s ease-out forwards' : 'none',
                animationDelay: inView ? \`\${index * 150}ms\` : '0ms'
              }}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={tour.imageUrls[0]}
                  alt={t(tour.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary-500 text-primary-900 font-semibold px-3 py-1 rounded-full text-sm">
                  {formatPrice(tour.price.usd, tour.price.azn)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary-900">
                  {t(tour.titleKey)}
                </h3>
                <p className="text-neutral-700 mb-4 line-clamp-3">{t(tour.descriptionKey)}</p>
                <button
                  onClick={() => setSelectedTour(tour)}
                  className="text-sm text-secondary-600 font-medium hover:underline"
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary-900">{t(selectedTour.titleKey)}</h2>
            <p className="text-neutral-700 whitespace-pre-line">{t(selectedTour.longDescriptionKey || selectedTour.descriptionKey)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedTours;
