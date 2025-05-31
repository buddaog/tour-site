import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import TourCard from '../components/tours/TourCard';
import tours from '../data/tours';

const ToursPage: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-24 pb-16">
      <div className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {t('tours.title')}
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            {t('tours.subtitle')}
          </p>
        </div>
      </div>

      <div 
        ref={ref}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;