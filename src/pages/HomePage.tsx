import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedTours from '../components/home/FeaturedTours';
import Testimonials from '../components/home/Testimonials';
import TourRegistrationForm from '../components/home/TourRegistrationForm';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TourRegistrationForm />
      <FeaturedTours />
      <Testimonials />
    </div>
  );
};

export default HomePage;