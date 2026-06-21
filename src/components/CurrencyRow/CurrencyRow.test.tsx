import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { Currency } from '../../models/currency';
import { CurrencyRow } from './CurrencyRow';

const testCurrencies: Currency[] = [
  {
    code: 'USD',
    description: 'United States dollar',
    name: 'US dollar',
    symbol: '$'
  },
  {
    code: 'EUR',
    description: 'Euro',
    name: 'Euro',
    symbol: 'E'
  }
];

const nextAmount = 25;

type CurrencyRowWithStateProps = {
  onAmountChange: (amount: number) => void;
};

const CurrencyRowWithState = ({ onAmountChange }: CurrencyRowWithStateProps) => {
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    onAmountChange(newAmount);
  };

  return (
    <CurrencyRow
      amount={amount}
      currencies={testCurrencies}
      selectedCurrencyCode="USD"
      onCurrencyChange={vi.fn()}
      onAmountChange={handleAmountChange}
    />
  );
};

describe('CurrencyRow', () => {
  it('renders an input and a select with currencies from props', () => {
    render(
      <CurrencyRow
        amount={1}
        currencies={testCurrencies}
        selectedCurrencyCode="USD"
        onCurrencyChange={vi.fn()}
        onAmountChange={vi.fn()}
      />
    );

    const select = screen.getByRole('combobox');

    expect(screen.getByLabelText('Currency amount')).toBeInTheDocument();
    expect(select).toHaveValue('USD');
    testCurrencies.forEach(({ code }) => {
      expect(within(select).getByRole('option', { name: code })).toBeInTheDocument();
    });
  });

  it('calls onCurrencyChange with the selected currency code', async () => {
    const user = userEvent.setup();
    const onCurrencyChange = vi.fn();

    render(
      <CurrencyRow
        amount={1}
        currencies={testCurrencies}
        selectedCurrencyCode="USD"
        onCurrencyChange={onCurrencyChange}
        onAmountChange={vi.fn()}
      />
    );

    await user.selectOptions(screen.getByRole('combobox'), 'EUR');

    expect(onCurrencyChange).toHaveBeenCalledWith('EUR');
  });

  it('calls onAmountChange when the amount changes', async () => {
    const user = userEvent.setup();
    const onAmountChange = vi.fn();

    render(<CurrencyRowWithState onAmountChange={onAmountChange} />);

    await user.clear(screen.getByLabelText('Currency amount'));
    await user.type(screen.getByLabelText('Currency amount'), String(nextAmount));

    expect(onAmountChange).toHaveBeenLastCalledWith(nextAmount);
  });

  it('disables the amount input when onAmountChange is not provided', () => {
    render(
      <CurrencyRow amount={1} currencies={testCurrencies} selectedCurrencyCode="USD" onCurrencyChange={vi.fn()} />
    );

    const amountInput = screen.getByLabelText('Currency amount');

    expect(amountInput).toBeDisabled();
  });
});
