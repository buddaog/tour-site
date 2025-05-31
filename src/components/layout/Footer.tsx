import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Landmark size={32} className="text-secondary-500" />
              <span className="text-xl font-heading font-bold">{t('app.name')}</span>
            </Link>
            <p className="mb-6 text-neutral-300">{t('app.tagline')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.tours')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-secondary-500 flex-shrink-0 mt-1" />
                <span className="text-neutral-300">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-secondary-500 flex-shrink-0" />
                <a href="tel:+994123456789" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-secondary-500 flex-shrink-0" />
                <a href="mailto:info@maidentowertravel.com" className="text-neutral-300 hover:text-secondary-500 transition-colors duration-200">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">{t('newsletter.title')}</h3>
            <p className="mb-4 text-neutral-300">{t('newsletter.subtitle')}</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="px-4 py-2 rounded-md bg-primary-800 text-white border border-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
              <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 text-primary-900 font-semibold px-4 py-2 rounded transition-colors duration-200"
              >
                {t('newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8 text-center text-neutral-400">
          <p>{t('footer.copyright').replace('2025', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;