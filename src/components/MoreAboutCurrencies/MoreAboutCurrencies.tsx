import { useState } from 'react';
import type { Currency } from '../../models/currency';
import { CurrencyDetails } from '../CurrencyDetails/CurrencyDetails';
import styles from './MoreAboutCurrencies.module.scss';
import { ArrowIcon } from '../ConverterArrowIcon/ConverterArrowIcon';

type MoreAboutProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const MoreAboutCurrencies = ({ fromCurrency, toCurrency }: MoreAboutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.divider}>
        <button className={styles.toggle} type="button" onClick={() => setIsOpen(!isOpen)}>
          <span>
            {fromCurrency.code}/{toCurrency.code}: about
          </span>
          <ArrowIcon direction={isOpen ? 'up' : 'down'} />
        </button>
      </div>
      {isOpen && (
        <section className={styles.moreAbout}>
          <CurrencyDetails currency={fromCurrency} />
          <CurrencyDetails currency={toCurrency} />
        </section>
      )}
    </>
  );
};
