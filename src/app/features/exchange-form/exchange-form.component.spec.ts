import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLN_CURRENCY } from '@data/pln-currency';
import { ConversionResult } from '@models/converion-result';
import { ExchangeRate } from '@models/exchange-rate';
import { ExchangeFormComponent } from './exchange-form.component';
import { DEFAULT_EXCHANGE_FORM_VALUE } from './default-exchange-form-value';


describe('ExchangeFormComponent', () => {
  let component: ExchangeFormComponent;
  let fixture: ComponentFixture<ExchangeFormComponent>;

  const inputMockExchangeRates: ExchangeRate[] = [
    { currency: 'USD', mid: 1.2, code: 'USD' },
    { currency: 'EUR', mid: 1.1, code: 'EUR' },
  ];

  const mockExchangeRates = [PLN_CURRENCY, ...inputMockExchangeRates];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangeFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('exchangeRates', inputMockExchangeRates);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual(DEFAULT_EXCHANGE_FORM_VALUE);
  });

  it('should call convertCurrency and set the result on form submit', () => {
    spyOn(component, 'convertCurrency').and.callFake(() => {
      return { result: 100 } as ConversionResult;
    });
    component.onConvert();
    expect(component.convertCurrency).toHaveBeenCalledWith(mockExchangeRates, {
      amount: 1,
      fromCurrency: 'PLN',
      toCurrency: 'EUR',
    });
    expect(component.result()).toEqual({ result: 100 } as ConversionResult);
  });

  it('should switch currencies when onSwitchCurrencies is called', () => {
    component.form.patchValue({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
    });
    component.onSwitchCurrencies();
    expect(component.form.value).toEqual({
      amount: 1,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
    });
  });
});
