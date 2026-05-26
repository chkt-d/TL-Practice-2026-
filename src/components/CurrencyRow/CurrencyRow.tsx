import type { Currency, CurrencyCode } from '../../data/currencies';

import styles from './CurrencyRow.module.scss';

type CurrencyRowProps = {
  amount: string;
  currencies: Currency[];
  selectedCurrencyCode: CurrencyCode;
};

export function CurrencyRow({ amount, currencies, selectedCurrencyCode }: CurrencyRowProps) {
  return (
    <div className={styles['currency-row']}>
      <input aria-label="Currency amount" className={styles.input} readOnly type="text" value={amount} />
      
      <div className={styles.divider} />
      
      <select className={styles.select} value={selectedCurrencyCode}>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
}
