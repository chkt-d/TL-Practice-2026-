export type CurrencyCode = 'CAD' | 'PLN' | 'AUD' | 'JPY' | 'ZAR';

export type Currency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  description: string;
};

export const currencies: Currency[] = [
  {
    code: 'CAD',
    name: 'Canadian dollar',
    symbol: '$',
    description:
      'The Canadian dollar is the official currency of Canada. It is commonly abbreviated with the dollar sign $, or sometimes CA$ to distinguish it from other dollar-denominated currencies.'
  },
  {
    code: 'PLN',
    name: 'Polish zloty',
    symbol: 'zł',
    description:
      'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.'
  },
  {
    code: 'AUD',
    name: 'Australian dollar',
    symbol: '$',
    description:
      'The Australian dollar is the official currency of Australia and several external territories. It is one of the most traded currencies in the world.'
  },
  {
    code: 'JPY',
    name: 'Japanese yen',
    symbol: '¥',
    description:
      'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.'
  },
  {
    code: 'ZAR',
    name: 'South African rand',
    symbol: 'R',
    description:
      'The South African rand is the official currency of South Africa. It is also used in the Common Monetary Area between South Africa, Namibia, Lesotho and Eswatini.'
  }
];
