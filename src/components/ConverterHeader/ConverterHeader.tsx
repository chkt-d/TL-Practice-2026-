import styles from './ConverterHeader.module.scss';

type ConverterHeaderProps = {
  fromAmount: string;
  fromCurrencyName: string;
  resultAmount: string;
  toCurrencyName: string;
  updatedAt: string;
};

export function ConverterHeader({
  fromAmount,
  fromCurrencyName,
  resultAmount,
  toCurrencyName,
  updatedAt
}: ConverterHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.subtitle}>
        {fromAmount} {fromCurrencyName} is
      </p>

      <h1 className={styles.result}>
        {resultAmount} {toCurrencyName}
      </h1>

      <p className={styles.date}>{updatedAt}</p>
    </header>
  );
}
