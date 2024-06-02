import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NBPTableResponse } from '@models/nbp-table-response';
import { DateStore } from '@store/date.service';
import { of } from 'rxjs';
import { CurrenciesPageComponent } from './currencies-page.component';
import { CurrencyService } from './currency.service';

describe('CurrenciesPageComponent', () => {
  let component: CurrenciesPageComponent;
  let fixture: ComponentFixture<CurrenciesPageComponent>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;
  let dateStore: DateStore;

  const mockRates = [{ currency: 'USD', mid: 3.8, code: 'USD' }];
  const mockResponse: NBPTableResponse = {
    effectiveDate: '2024-06-01',
    rates: mockRates,
    table: '',
    no: '',
  };

  beforeEach(async () => {
    const currencyServiceMock = jasmine.createSpyObj('CurrencyService', [
      'getLatestExchangeRates',
      'getExchangeRatesFromDate',
    ]);

    TestBed.configureTestingModule({
      imports: [CurrenciesPageComponent],
      providers: [{ provide: CurrencyService, useValue: currencyServiceMock }],
    }).compileComponents();

    currencyServiceSpy = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;

    dateStore = TestBed.inject(DateStore);
    fixture = TestBed.createComponent(CurrenciesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch only the latest exchange rates if no date is selected', (done) => {
    currencyServiceSpy.getLatestExchangeRates.and.returnValue(of(mockResponse));
    currencyServiceSpy.getExchangeRatesFromDate.and.returnValue(of(mockResponse));

    component.fetchRatesOnDateChange$.subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(currencyServiceSpy.getLatestExchangeRates).toHaveBeenCalled();
      expect(currencyServiceSpy.getExchangeRatesFromDate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should fetch only exchange rates from date if date exists', (done) => {
    const selectedDate = '2024-05-29';
    dateStore.setDate(selectedDate);

    currencyServiceSpy.getLatestExchangeRates.and.returnValue(of(mockResponse));
    currencyServiceSpy.getExchangeRatesFromDate.and.returnValue(of(mockResponse));

    component.fetchRatesOnDateChange$.subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(currencyServiceSpy.getLatestExchangeRates).not.toHaveBeenCalled();
      expect(currencyServiceSpy.getExchangeRatesFromDate).toHaveBeenCalledWith(selectedDate);
      done();
    });
  });

  it('should update exchangeRates correctly if response exists', (done) => {
    currencyServiceSpy.getLatestExchangeRates.and.returnValue(of(mockResponse));

    component.fetchRatesOnDateChange$.subscribe(() => {
      expect(component.exchangeRates()).toEqual(mockRates);
      done();
    });
  });
  it('should update exchangeRates correctly if response not exists', (done) => {
    currencyServiceSpy.getLatestExchangeRates.and.returnValue(of(undefined));

    component.fetchRatesOnDateChange$.subscribe(() => {
      expect(component.exchangeRates()).toEqual([]);
      done();
    });
  });
});
