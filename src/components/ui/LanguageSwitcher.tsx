import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="relative group">
      <button 
        className="flex items-center text-white hover:text-secondary-500 transition-colors duration-200"
        aria-label={t('language')}
      >
        <Globe size={20} className="mr-1" />
        <span className="uppercase">{language}</span>
      </button>
      <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={() => changeLanguage('en')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              language === 'en' ? 'bg-primary-100 text-primary-900' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('az')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              language === 'az' ? 'bg-primary-100 text-primary-900' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            role="menuitem"
          >
            Azərbaycan
          </button>
          <button
            onClick={() => changeLanguage('ru')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              language === 'ru' ? 'bg-primary-100 text-primary-900' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            role="menuitem"
          >
            Русский
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;