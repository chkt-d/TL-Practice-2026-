import type { Currency } from '../../models/currency';
import styles from './CurrencyDetails.module.scss';

type CurrencyDetailsProps = { currency: Currency };

export const CurrencyDetails = ({ currency }: CurrencyDetailsProps) => {
  return (
    <article className={styles.currencyInfo}>
      <h2 className={styles.currencyTitle}>
        {currency.name} - {currency.code} - {currency.symbol}
      </h2>
      <p className={styles.currencyDescription}>{currency.description}</p>
    </article>
  );
};
