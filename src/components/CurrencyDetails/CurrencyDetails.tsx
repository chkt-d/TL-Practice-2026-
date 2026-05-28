import type { Currency } from '../../models/currency';
import styles from './CurrencyDetails.module.scss';

export const CurrencyDetails = ({ currency }: { currency: Currency }) => {
  return (
    <article className={styles.currencyInfo}>
      <h2 className={styles.currencyTitle}>
        {currency.name} - {currency.code} - {currency.symbol}
      </h2>
      <p className={styles.currencyDescription}>{currency.description}</p>
    </article>
  );
}
