import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MoreAboutCurrencies } from './MoreAboutCurrencies';
import type { Currency } from '../../models/currency';

const fromCurrency: Currency = {
  code: 'PLN',
  name: 'Polish zloty',
  symbol: 'zł',
  description: 'Polish zloty description for test.'
};

const toCurrency: Currency = {
  code: 'JPY',
  name: 'Japanese yen',
  symbol: '¥',
  description: 'Japanese yen description for test.'
};

describe('MoreAboutCurrencies', () => {
  it('renders more about block', () => {
    render(<MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />);

    expect(screen.getByTestId('more-about')).toBeInTheDocument();
  });

  it('shows descriptions for selected currency pair', () => {
    render(<MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />);

    const moreAbout = screen.getByTestId('more-about');

    expect(moreAbout).toHaveTextContent('Polish zloty');
    expect(moreAbout).toHaveTextContent('Polish zloty description for test.');
    expect(moreAbout).toHaveTextContent('Japanese yen');
    expect(moreAbout).toHaveTextContent('Japanese yen description for test.');
  });
});
