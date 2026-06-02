import styles from './ConverterHeader.module.scss';
import { formatDateTime } from '../../utils/formatDateTime';

type ConverterHeaderProps = {
  fromAmount: number;
  fromCurrencyName: string;
  resultAmount: number;
  toCurrencyName: string;
  updatedAt: string;
};

export const ConverterHeader = ({
  fromAmount,
  fromCurrencyName,
  resultAmount,
  toCurrencyName,
  updatedAt
}: ConverterHeaderProps) => {
  return (
    <header className={styles.header}>
      <p className={styles.subtitle}>
        {fromAmount} {fromCurrencyName} is
      </p>

      <h1 className={styles.result}>
        {Number(resultAmount.toFixed(2))} {toCurrencyName}
      </h1>

      <p className={styles.date}>{formatDateTime(updatedAt)}</p>
    </header>
  );
};
