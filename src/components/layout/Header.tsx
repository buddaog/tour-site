import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Landmark, Menu, X } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import CurrencySwitcher from '../ui/CurrencySwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-primary-900 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white hover:text-secondary-500 transition-colors duration-200"
        >
          <Landmark size={32} className="text-secondary-500" />
          <span className="text-xl font-heading font-bold hidden sm:inline">{t('app.name')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-white hover:text-secondary-500 transition-colors duration-200 ${
              location.pathname === '/' ? 'border-b-2 border-secondary-500' : ''
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/tours" 
            className={`text-white hover:text-secondary-500 transition-colors duration-200 ${
              location.pathname.startsWith('/tours') ? 'border-b-2 border-secondary-500' : ''
            }`}
          >
            {t('nav.tours')}
          </Link>
          <Link 
            to="/about" 
            className={`text-white hover:text-secondary-500 transition-colors duration-200 ${
              location.pathname === '/about' ? 'border-b-2 border-secondary-500' : ''
            }`}
          >
            {t('nav.about')}
          </Link>
          <Link 
            to="/contact" 
            className={`text-white hover:text-secondary-500 transition-colors duration-200 ${
              location.pathname === '/contact' ? 'border-b-2 border-secondary-500' : ''
            }`}
          >
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <CurrencySwitcher />
          
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-900 absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link 
              to="/" 
              className={`text-white hover:text-secondary-500 py-3 border-b border-primary-800 ${
                location.pathname === '/' ? 'text-secondary-500' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/tours" 
              className={`text-white hover:text-secondary-500 py-3 border-b border-primary-800 ${
                location.pathname.startsWith('/tours') ? 'text-secondary-500' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.tours')}
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-secondary-500 py-3 border-b border-primary-800 ${
                location.pathname === '/about' ? 'text-secondary-500' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/contact" 
              className={`text-white hover:text-secondary-500 py-3 border-b border-primary-800 ${
                location.pathname === '/contact' ? 'text-secondary-500' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            
            <div className="flex items-center justify-between py-3 border-b border-primary-800">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;