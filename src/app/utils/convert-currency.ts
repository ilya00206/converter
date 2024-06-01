import { ConversionResult, ExchangeForm, ExchangeRate } from '@models/index';
export function convertCurrency(
  exchangeRates: ExchangeRate[],
  exchangeForm: ExchangeForm
): ConversionResult {
  const { toCurrency, fromCurrency } = exchangeForm;

  let amount = (exchangeForm.amount ?? 0) as number | string;
  if (typeof amount === 'string' && amount.includes(',')) {
    amount = amount.replace(',', '.');
  }
  amount = Number(amount);

  const fromRate = exchangeRates.find((rate) => rate.code === fromCurrency)?.mid;
  const toRate = exchangeRates.find((rate) => rate.code === toCurrency)?.mid;

  let result = 0;
  if (fromRate && toRate) {
    result = Number(((fromRate / toRate) * amount).toFixed(2));
  }
  return { toCurrency, fromCurrency, amount, result };
}
