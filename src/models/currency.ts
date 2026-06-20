export type CurrencyCode = 'CAD' | 'PLN' | 'AUD' | 'JPY' | 'ZAR';

export type Currency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  description: string;
};
