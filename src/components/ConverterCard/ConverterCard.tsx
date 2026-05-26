import type { Currency } from '../../data/currencies';

import { currencies } from '../../data/currencies';
import { ConverterHeader } from '../ConverterHeader/ConverterHeader';
import { CurrencyRow } from '../CurrencyRow/CurrencyRow';
import { MoreAboutCurrencies } from '../MoreAboutCurrencies/MoreAboutCurrencies';

import styles from './ConverterCard.module.scss';

type ConverterCardProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export function ConverterCard({ fromCurrency, toCurrency }: ConverterCardProps) {
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

      <div className={styles.divider}>
        <button className={styles.toggle} type="button">
          <span>{fromCurrency.code}/{toCurrency.code}: about</span>
          <svg className={styles.arrow} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.36377 15C6.36377 15.5523 6.81148 16 7.36377 16C7.91605 16 8.36377 15.5523 8.36377 15H7.36377H6.36377ZM8.07088 0.292893C7.68035 -0.0976315 7.04719 -0.0976315 6.65666 0.292893L0.292702 6.65685C-0.0978227 7.04738 -0.0978227 7.68054 0.292702 8.07107C0.683226 8.46159 1.31639 8.46159 1.70692 8.07107L7.36377 2.41421L13.0206 8.07107C13.4111 8.46159 14.0443 8.46159 14.4348 8.07107C14.8254 7.68054 14.8254 7.04738 14.4348 6.65685L8.07088 0.292893ZM7.36377 15H8.36377L8.36377 1H7.36377H6.36377L6.36377 15H7.36377Z" fill="black"/>
          </svg>
        </button>
      </div>

      <MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </section>
  );
}
