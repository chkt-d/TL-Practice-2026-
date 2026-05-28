import type { Currency } from '../../models/currency';
import { CurrencyDetails } from '../CurrencyDetails/CurrencyDetails';
import styles from './MoreAboutCurrencies.module.scss';

type MoreAboutProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const MoreAboutCurrencies = ({ fromCurrency, toCurrency }: MoreAboutProps) => {
  return (
    <section className={styles.moreAbout}>
      <CurrencyDetails currency={fromCurrency} />
      <CurrencyDetails currency={toCurrency} />
    </section>
  );
}
