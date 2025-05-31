import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';

const CurrencySwitcher: React.FC = () => {
  const { currency, changeCurrency } = useCurrency();
  const { t } = useTranslation();

  return (
    <div className="relative group">
      <button 
        className="flex items-center text-white hover:text-secondary-500 transition-colors duration-200"
        aria-label={t('currency')}
      >
        <DollarSign size={20} className="mr-1" />
        <span>{currency}</span>
      </button>
      <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={() => changeCurrency('USD')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currency === 'USD' ? 'bg-primary-100 text-primary-900' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            role="menuitem"
          >
            USD ($)
          </button>
          <button
            onClick={() => changeCurrency('AZN')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currency === 'AZN' ? 'bg-primary-100 text-primary-900' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            role="menuitem"
          >
            AZN (₼)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwitcher;