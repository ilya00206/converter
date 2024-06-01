import { ConversionResult, ExchangeForm, ExchangeRate } from '@models/index';
import { convertCurrency } from './convert-currency';

describe('convertCurrency', () => {
  const mockExchangeRates: ExchangeRate[] = [
    { code: 'PLN', mid: 1.0, currency: 'PLN' },
    { code: 'EUR', mid: 2.1, currency: 'EUR' },
  ];

  it('should convert currency correctly', () => {
    const exchangeForm: ExchangeForm = { fromCurrency: 'PLN', toCurrency: 'EUR', amount: 100 };
    const result: ConversionResult = convertCurrency(mockExchangeRates, exchangeForm);
    expect(result).toEqual({
      fromCurrency: 'PLN',
      toCurrency: 'EUR',
      amount: 100,
      result: 47.62,
    });
  });

  it('should return 0 result for zero amount', () => {
    const exchangeForm: ExchangeForm = { fromCurrency: 'USD', toCurrency: 'EUR', amount: 0 };
    const result: ConversionResult = convertCurrency(mockExchangeRates, exchangeForm);
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 0,
      result: 0,
    });
  });

  it('should return 0 result if fromCurrency rate is missing', () => {
    const exchangeForm: ExchangeForm = { fromCurrency: 'USD', toCurrency: 'EUR', amount: 100 };
    const result: ConversionResult = convertCurrency(mockExchangeRates, exchangeForm);
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      result: 0,
    });
  });

  it('should return 0 result if toCurrency rate is missing', () => {
    const exchangeForm: ExchangeForm = { fromCurrency: 'USD', toCurrency: 'EUR', amount: 100 };
    const result: ConversionResult = convertCurrency(mockExchangeRates, exchangeForm);
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      result: 0,
    });
  });

  it('should handle undefined amount gracefully', () => {
    const exchangeForm: ExchangeForm = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: undefined,
    };
    const result: ConversionResult = convertCurrency(mockExchangeRates, exchangeForm);
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 0,
      result: 0,
    });
  });
});
