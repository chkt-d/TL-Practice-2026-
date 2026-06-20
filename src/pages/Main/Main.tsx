import { useState } from 'react';

import { ConverterHeader } from '../../components/ConverterHeader/ConverterHeader';
import { CurrencyRow } from '../../components/CurrencyRow/CurrencyRow';
import { MoreAboutCurrencies } from '../../components/MoreAboutCurrencies/MoreAboutCurrencies';
import { SwapButton } from '../../components/ConverterSwapButton/ConverterSwapButton';
import { currencies } from '../../mocks/currencies';
import { getExchangeRate } from '../../utils/getExchangeRate';

import styles from './Main.module.scss';

const initialFromCurrency = currencies.find((currency) => currency.code === 'PLN') ?? currencies[0];
const initialToCurrency = currencies.find((currency) => currency.code === 'JPY') ?? currencies[1];

export const Main = () => {
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [amount, setAmount] = useState(1);

  const { price, dateTime } = getExchangeRate(fromCurrency.code, toCurrency.code);
  const result = price * amount;

  const handleFromChange = (newFromCode: string) => {
    const newFromCurrency = currencies.find((currency) => currency.code === newFromCode);

    if (!newFromCurrency) {
      return;
    }

    setFromCurrency(newFromCurrency);

    if (newFromCurrency.code === toCurrency.code) {
      const fallbackToCurrency = currencies.find((currency) => currency.code !== newFromCurrency.code);

      if (fallbackToCurrency) {
        setToCurrency(fallbackToCurrency);
      }
    }
  };

  const handleToChange = (newToCode: string) => {
    const newToCurrency = currencies.find((currency) => currency.code === newToCode);

    if (!newToCurrency) {
      return;
    }

    setToCurrency(newToCurrency);

    if (newToCurrency.code === fromCurrency.code) {
      const fallbackFromCurrency = currencies.find((currency) => currency.code !== newToCurrency.code);

      if (fallbackFromCurrency) {
        setFromCurrency(fallbackFromCurrency);
      }
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <ConverterHeader
          fromAmount={amount}
          fromCurrencyName={fromCurrency.name}
          resultAmount={result}
          toCurrencyName={toCurrency.name}
          updatedAt={dateTime}
        />

        <div className={styles.form}>
          <CurrencyRow
            amount={amount}
            currencies={currencies}
            selectedCurrencyCode={fromCurrency.code}
            onCurrencyChange={handleFromChange}
            onAmountChange={setAmount}
          />

          <SwapButton onCurrencySwap={handleSwap} />

          <CurrencyRow
            amount={result}
            currencies={currencies}
            selectedCurrencyCode={toCurrency.code}
            onCurrencyChange={handleToChange}
          />
        </div>

        {/* Key меняется при смене валютной пары, чтобы React пересоздал компонент и сбросил его локальное состояние open/closed */}
        <MoreAboutCurrencies
          key={`${fromCurrency.code}-${toCurrency.code}`}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </section>
    </main>
  );
};
