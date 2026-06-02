import { priceChanges } from '../mocks/priceChanges';

export const getExchangeRate = (fromCurrencyCode: string, toCurrencyCode: string) => {
  if (!priceChanges[fromCurrencyCode] || !priceChanges[fromCurrencyCode][toCurrencyCode]) {
    return { price: 0, dateTime: 'not found' };
  }
  return {
    price: priceChanges[fromCurrencyCode][toCurrencyCode].price,
    dateTime: priceChanges[fromCurrencyCode][toCurrencyCode].dateTime
  };
};
