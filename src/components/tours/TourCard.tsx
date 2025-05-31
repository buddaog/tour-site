import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import { Tour } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface TourCardProps {
  tour: Tour;
  index: number;
  inView: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, index, inView }) => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{ 
        opacity: 0,
        animation: inView ? 'fadeIn 0.5s ease-out forwards' : 'none',
        animationDelay: inView ? `${index * 150}ms` : '0ms'
      }}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={tour.imageUrls[0]} 
          alt={t(tour.titleKey)} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-secondary-500 text-primary-900 font-semibold px-3 py-1 rounded-full text-sm">
          {formatPrice(tour.price.usd, tour.price.azn)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-primary-900">
          {t(tour.titleKey)}
        </h3>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center text-secondary-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(tour.rating) ? 'currentColor' : 'none'} 
                className={i < Math.floor(tour.rating) ? 'text-secondary-500' : 'text-neutral-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-neutral-500">
            {tour.rating.toFixed(1)}
          </span>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {t(tour.descriptionKey)}
        </p>
        
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{tour.duration} {t('tour.days')}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>2-12</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{tour.availableDates.length}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            to={`/tours/${tour.id}`}
            className="flex-1 bg-primary-900 hover:bg-primary-800 text-white text-center py-3 rounded transition-colors duration-200"
          >
            {t('view.details')}
          </Link>
          <Link
            to={`/booking/${tour.id}`}
            className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-semibold text-center py-3 rounded transition-colors duration-200"
          >
            {t('book.now')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;