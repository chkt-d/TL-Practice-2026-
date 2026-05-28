import { ConverterCard } from './components/ConverterCard/ConverterCard';
import { currencies } from './data/currencies';

import styles from './App.module.scss';

const fromCurrency = currencies.find((currency) => currency.code === 'PLN');
const toCurrency = currencies.find((currency) => currency.code === 'JPY');

export const App = () => {
  if (!fromCurrency || !toCurrency) {
    return null;
  }

  return (
    <main className={styles.app}>
      <ConverterCard fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </main>
  );
}
