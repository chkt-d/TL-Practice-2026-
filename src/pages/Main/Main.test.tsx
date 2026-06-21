import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { currencies } from '../../mocks/currencies';
import { priceChanges } from '../../mocks/priceChanges';
import { Main } from './Main';

const initialFromCode = 'PLN';
const initialToCode = 'JPY';

const findCurrency = (currencyCode: string) => {
  const currency = currencies.find(({ code }) => code === currencyCode);

  if (!currency) {
    throw new Error(`Currency ${currencyCode} was not found in test mocks`);
  }

  return currency;
};

const findDifferentCurrency = (...currencyCodes: string[]) => {
  const currency = currencies.find(({ code }) => !currencyCodes.includes(code));

  if (!currency) {
    throw new Error('Different currency was not found in test mocks');
  }

  return currency;
};

const getSelects = () => {
  const [fromSelect, toSelect] = screen.getAllByRole<HTMLSelectElement>('combobox');

  return { fromSelect, toSelect };
};

const getAmountInput = () => {
  const amountInput = screen.getAllByLabelText<HTMLInputElement>('Currency amount').find((input) => !input.disabled);

  if (!amountInput) {
    throw new Error('Enabled amount input was not found');
  }

  return amountInput;
};

const getSwapButton = () => {
  const [swapButton] = screen.getAllByRole('button');

  return swapButton;
};

const formatResult = (fromCurrencyCode: string, toCurrencyCode: string, amount = 1) => {
  const price = priceChanges[fromCurrencyCode][toCurrencyCode].price;

  return Number((price * amount).toFixed(2));
};

const expectResult = (fromCurrencyCode: string, toCurrencyCode: string, amount = 1) => {
  const toCurrency = findCurrency(toCurrencyCode);
  const expectedResult = formatResult(fromCurrencyCode, toCurrencyCode, amount);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: `${expectedResult} ${toCurrency.name}`
    })
  ).toBeInTheDocument();
};

describe('Main', () => {
  it('renders the amount field and two currency selects with mock currencies', () => {
    render(<Main />);

    const selects = screen.getAllByRole('combobox');

    expect(getAmountInput()).toBeInTheDocument();
    expect(selects).toHaveLength(2);

    selects.forEach((select) => {
      currencies.forEach(({ code }) => {
        expect(within(select).getByRole('option', { name: code })).toBeInTheDocument();
      });
    });
  });

  it('recalculates the result when the amount changes', async () => {
    const user = userEvent.setup();
    const amount = 3;

    render(<Main />);

    await user.clear(getAmountInput());
    await user.type(getAmountInput(), String(amount));

    expectResult(initialFromCode, initialToCode, amount);
  });

  it('recalculates the result when the currency pair changes', async () => {
    const user = userEvent.setup();
    const nextToCurrency = findDifferentCurrency(initialFromCode, initialToCode);

    render(<Main />);

    await user.selectOptions(getSelects().toSelect, nextToCurrency.code);

    expectResult(initialFromCode, nextToCurrency.code);
  });

  it('does not allow the same currency in both selects', async () => {
    const user = userEvent.setup();
    const fallbackToCurrency = findDifferentCurrency(initialToCode);

    render(<Main />);

    await user.selectOptions(getSelects().fromSelect, initialToCode);

    const { fromSelect, toSelect } = getSelects();

    expect(fromSelect).toHaveValue(initialToCode);
    expect(toSelect).toHaveValue(fallbackToCurrency.code);
    expect(fromSelect.value).not.toBe(toSelect.value);
  });

  it('swaps currencies and recalculates the result for the new pair', async () => {
    const user = userEvent.setup();

    render(<Main />);

    await user.click(getSwapButton());

    const { fromSelect, toSelect } = getSelects();

    expect(fromSelect).toHaveValue(initialToCode);
    expect(toSelect).toHaveValue(initialFromCode);
    expectResult(initialToCode, initialFromCode);
  });

  it('resets the More about state after the currency pair changes', async () => {
    const user = userEvent.setup();
    const fromCurrency = findCurrency(initialFromCode);
    const nextToCurrency = findDifferentCurrency(initialFromCode, initialToCode);

    render(<Main />);

    await user.click(screen.getByRole('button', { name: `${initialFromCode}/${initialToCode}: about` }));

    expect(screen.getByText(fromCurrency.description)).toBeInTheDocument();

    await user.selectOptions(getSelects().toSelect, nextToCurrency.code);

    expect(
      screen.getByRole('button', { name: `${initialFromCode}/${nextToCurrency.code}: about` })
    ).toBeInTheDocument();
    expect(screen.queryByText(fromCurrency.description)).not.toBeInTheDocument();
  });
});
