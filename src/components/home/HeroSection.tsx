import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat relative flex items-center"
      style={{ backgroundAttachment: 'fixed' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-900 bg-opacity-60"></div>
      
      <div 
        ref={ref}
        className={`container mx-auto px-4 z-10 text-white pt-20 transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-neutral-100 max-w-2xl">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/tours"
              className="bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-semibold px-8 py-3 rounded-md transition-colors duration-200 text-center"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white border border-white px-8 py-3 rounded-md transition-colors duration-200 text-center"
            >
              {t('learn.more')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;