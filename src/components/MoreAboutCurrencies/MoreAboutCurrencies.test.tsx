import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Currency } from '../../models/currency';
import { MoreAboutCurrencies } from './MoreAboutCurrencies';

const fromCurrency: Currency = {
  code: 'USD',
  description: 'The United States dollar is the official currency of the United States.',
  name: 'US dollar',
  symbol: '$'
};

const toCurrency: Currency = {
  code: 'EUR',
  description: 'The euro is used by many countries in the European Union.',
  name: 'Euro',
  symbol: 'E'
};

describe('MoreAboutCurrencies', () => {
  it('renders a More about button for the selected pair', () => {
    render(<MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />);

    const button = screen.getByRole('button', { name: 'USD/EUR: about' });

    expect(button).toBeInTheDocument();
  });

  it('shows selected currency names and descriptions after click', async () => {
    const user = userEvent.setup();

    render(<MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />);

    await user.click(screen.getByRole('button', { name: 'USD/EUR: about' }));

    expect(screen.getByRole('heading', { name: 'US dollar - USD - $' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Euro - EUR - E' })).toBeInTheDocument();
    expect(screen.getByText(fromCurrency.description)).toBeInTheDocument();
    expect(screen.getByText(toCurrency.description)).toBeInTheDocument();
  });

  it('shows a fallback text when a currency description is empty', async () => {
    const user = userEvent.setup();
    const currencyWithoutDescription: Currency = {
      ...fromCurrency,
      description: ''
    };

    render(<MoreAboutCurrencies fromCurrency={currencyWithoutDescription} toCurrency={toCurrency} />);

    await user.click(screen.getByRole('button', { name: 'USD/EUR: about' }));

    expect(screen.getByText('Description will be available soon')).toBeInTheDocument();
  });
});
