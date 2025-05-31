import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import testimonials from '../../data/testimonials';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-slide functionality
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div 
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-primary-800 rounded-lg p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.photoUrl} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-secondary-500"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                        <p className="text-primary-300">{testimonial.location}</p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                              className={i < testimonial.rating ? 'text-secondary-500' : 'text-primary-600'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-lg italic text-primary-200 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 bg-secondary-500 text-primary-900 rounded-full p-2 shadow-lg focus:outline-none hover:bg-secondary-600 transition-colors duration-200"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 bg-secondary-500 text-primary-900 rounded-full p-2 shadow-lg focus:outline-none hover:bg-secondary-600 transition-colors duration-200"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-200 ${
                  index === currentIndex ? 'bg-secondary-500' : 'bg-primary-700 hover:bg-primary-600'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;