import type { Currency } from "../../data/currencies"
import styles from "./CurrencyDetails.module.scss"

export function CurrencyDetails({ currency }: {currency: Currency}) {
return(
      <article className={styles['currency-info']}>
        <h2 className={styles['currency-title']}>
          {currency.name} - {currency.code} - {currency.symbol}
        </h2>
        <p className={styles['currency-description']}>{currency.description}</p>
      </article>
  );
}