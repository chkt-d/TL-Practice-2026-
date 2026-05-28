import { ConverterCard } from '../../components/ConverterCard/ConverterCard';
import { currencies } from '../../mocks/currencies';

import styles from './Main.module.scss';

  const fromCurrency = currencies.find((currency) => currency.code === 'JPY');
  const toCurrency = currencies.find((currency) => currency.code === 'PLN');

export const Main = () => {  
  

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  return (
    <main className={styles.main}>
      <ConverterCard fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </main>
  );
};
