import type { Currency } from '../../models/currency';

import styles from './CurrencyRow.module.scss';

type CurrencyRowProps = {
  amount: string | number;
  currencies: Currency[];
  selectedCurrencyCode: string;
  onCurrencyChange: (currencyCode: string) => void;
  onAmountChange?: (amount: string) => void
};

export const CurrencyRow = ({ amount, currencies, selectedCurrencyCode, onCurrencyChange, onAmountChange }: CurrencyRowProps) => {
  return (
    <div className={styles.currencyRow}>
      <input aria-label="Currency amount" className={styles.input} disabled={!onAmountChange} type="text" value={amount} onChange={(e) => onAmountChange?.(e.target.value)} />

      <div className={styles.divider} />

      <select className={styles.select} value={selectedCurrencyCode} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
}
