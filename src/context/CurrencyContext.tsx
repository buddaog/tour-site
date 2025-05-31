import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Currency } from '../types';

interface CurrencyContextType {
  currency: Currency;
  changeCurrency: (curr: Currency) => void;
  formatPrice: (usd: number, azn: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  changeCurrency: () => {},
  formatPrice: () => '',
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(
    (localStorage.getItem('currency') as Currency) || 'USD'
  );

  const changeCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('currency', curr);
  };

  const formatPrice = (usd: number, azn: number): string => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString()}`;
    } else {
      return `₼${azn.toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};