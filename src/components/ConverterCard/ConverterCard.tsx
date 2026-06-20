import type { Currency } from '../../models/currency';

import { currencies } from '../../data/currencies';
import { ConverterHeader } from '../ConverterHeader/ConverterHeader';
import { CurrencyRow } from '../CurrencyRow/CurrencyRow';
import { MoreAboutCurrencies } from '../MoreAboutCurrencies/MoreAboutCurrencies';

import styles from './ConverterCard.module.scss';

type ConverterCardProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const ConverterCard = ({ fromCurrency, toCurrency }: ConverterCardProps) => {
  return (
    <section className={styles.card}>
      <ConverterHeader
        fromAmount="1"
        fromCurrencyName={fromCurrency.name}
        resultAmount="0.99"
        toCurrencyName={toCurrency.name}
        updatedAt="Fri, 05 Apr 2024 10:34 UTC"
      />

      <div className={styles.form}>
        <CurrencyRow amount="1" currencies={currencies} selectedCurrencyCode={fromCurrency.code} />

        <CurrencyRow amount="0,99" currencies={currencies} selectedCurrencyCode={toCurrency.code} />
      </div>

      <MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </section>
  );
};
