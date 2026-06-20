import type { Currency } from '../../models/currency';
import { CurrencyDetails } from '../CurrencyDetails/CurrencyDetails';
import styles from './MoreAboutCurrencies.module.scss';
import { ArrowIcon } from '../ConverterArrowIcon/ConverterArrowIcon';

type MoreAboutProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const MoreAboutCurrencies = ({ fromCurrency, toCurrency }: MoreAboutProps) => {
  return (
    <>
      <div className={styles.divider}>
        <button className={styles.toggle} type="button">
          <span>
            {fromCurrency.code}/{toCurrency.code}: about
          </span>
          <ArrowIcon />
        </button>
      </div>
      <section className={styles.moreAbout} data-testid="more-about">
        <CurrencyDetails currency={fromCurrency} />
        <CurrencyDetails currency={toCurrency} />
      </section>
    </>
  );
};
