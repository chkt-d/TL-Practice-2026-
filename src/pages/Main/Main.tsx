import { useState } from 'react';
import { currencies } from '../../mocks/currencies';
import { ConverterHeader } from '../../components/ConverterHeader/ConverterHeader';
import { CurrencyRow } from '../../components/CurrencyRow/CurrencyRow';
import { MoreAboutCurrencies } from '../../components/MoreAboutCurrencies/MoreAboutCurrencies';
import styles from './Main.module.scss';
import { priceChanges } from '../../mocks/priceChanges';

const getExchangeRate = (fromCurrencyCode: string, toCurrencyCode: string) => {
    if (!priceChanges[fromCurrencyCode] || !priceChanges[fromCurrencyCode][toCurrencyCode]) {
        return { price: 0, dateTime: "not found" }
    }
    return {
        price: priceChanges[fromCurrencyCode][toCurrencyCode].price,
        dateTime: priceChanges[fromCurrencyCode][toCurrencyCode].dateTime
    }
}

export const Main = () => {
    const [from, setFrom] = useState('PLN');
    const [to, setTo] = useState('JPY');
    const [amount, setAmount] = useState('1');
    const amountNumeric = Number(amount);
    const fromCurrency = currencies.find((currency) => currency.code === from);
    const toCurrency = currencies.find((currency) => currency.code === to);

    if (!fromCurrency || !toCurrency) {
        return null;
    }

    const { price, dateTime } = getExchangeRate(fromCurrency.code, toCurrency.code);
    const result = amount === '' ? 0 : price * amountNumeric;

    const handleFromChange = (newFrom: string) => {
        setFrom(newFrom);
        if (newFrom === to) {
            const fallbackToCurrency  = currencies.find((currency) => currency.code !== newFrom);

            if (fallbackToCurrency ) {
                setTo(fallbackToCurrency.code)
            }
        }
    }

    const handleToChange = (newTo: string) => {
        setTo(newTo);
        if (newTo === from) {
            const fallbackFromCurrency = currencies.find((currency) => currency.code !== newTo);

            if (fallbackFromCurrency) {
                setFrom(fallbackFromCurrency.code)
            }
        }
    }

    return (
        <main className={styles.main}>
            <section className={styles.card}>
                <ConverterHeader
                    fromAmount={amountNumeric}
                    fromCurrencyName={fromCurrency.name}
                    resultAmount={result}
                    toCurrencyName={toCurrency.name}
                    updatedAt={dateTime}
                />

                <div className={styles.form}>
                    <CurrencyRow amount={amount} currencies={currencies} selectedCurrencyCode={fromCurrency.code} onCurrencyChange={handleFromChange} onAmountChange={setAmount}/>

                    <CurrencyRow amount={result} currencies={currencies} selectedCurrencyCode={toCurrency.code} onCurrencyChange={handleToChange} />
                </div>

                {/* Меняем key при смене валютной пары, для того чтобы Reakt пересоздал компонент и сбросил его локальное сотояние open/closed */}
                <MoreAboutCurrencies fromCurrency={fromCurrency} toCurrency={toCurrency} key={`${from}-${to}`} /> 
            </section>
        </main>
    );
};
