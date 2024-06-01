import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExchangeFormComponent } from '@features/exchange-form/exchange-form.component';
import { NoDataFoundComponent } from '@features/no-data-found/no-data-found.component';
import { RatesListComponent } from '@features/rates-list/rates-list.component';

import { DateStore } from '@store/date.service';
import { of } from 'rxjs';
import { CurrenciesPageComponent } from './currencies-page.component';
import { CurrencyService } from './currency.service';
import { NBPTableResponse } from '@models/index';

xdescribe('CurrenciesPageComponent', () => {
  let component: CurrenciesPageComponent;
  let fixture: ComponentFixture<CurrenciesPageComponent>;
  let currencyServiceMock: any;
  let dateStoreMock: any;

  const mockResponse: NBPTableResponse = {
    table: 'A',
    no: '123/A/NBP/2023',
    effectiveDate: '2023-01-01',
    rates: [
      { currency: 'Dollar', code: 'USD', mid: 3.8 },
      { currency: 'Euro', code: 'EUR', mid: 4.5 },
    ],
  };

  beforeEach(async () => {
    currencyServiceMock = {
      getLatestExchangeRates: jasmine
        .createSpy('getLatestExchangeRates')
        .and.returnValue(of(mockResponse)),
      getExchangeRatesFromDate: jasmine
        .createSpy('getExchangeRatesFromDate')
        .and.returnValue(of(mockResponse)),
    };

    dateStoreMock = {
      date: of('2023-01-01'),
      setDate: jasmine.createSpy('setDate'),
    };

    await TestBed.configureTestingModule({
      imports: [
        CurrenciesPageComponent,
        ExchangeFormComponent,
        RatesListComponent,
        NoDataFoundComponent,
      ],
      providers: [
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: DateStore, useValue: dateStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLatestExchangeRates on initialization', () => {
    expect(currencyServiceMock.getLatestExchangeRates).toHaveBeenCalled();
  });

  it('should render ExchangeFormComponent and RatesListComponent when response is available', () => {
    const exchangeFormElement = fixture.debugElement.query(By.css('app-exchange-form'));
    const ratesListElement = fixture.debugElement.query(By.css('app-rates-list'));
    const noDataFoundElement = fixture.debugElement.query(By.css('app-no-data-found'));

    expect(exchangeFormElement).toBeTruthy();
    expect(ratesListElement).toBeTruthy();
    expect(noDataFoundElement).toBeNull();
  });

  it('should render NoDataFoundComponent when no response is available', () => {
    // Mock response to return undefined
    currencyServiceMock.getLatestExchangeRates.and.returnValue(of(undefined));
    fixture.detectChanges();

    const exchangeFormElement = fixture.debugElement.query(By.css('app-exchange-form'));
    const ratesListElement = fixture.debugElement.query(By.css('app-rates-list'));
    const noDataFoundElement = fixture.debugElement.query(By.css('app-no-data-found'));

    expect(exchangeFormElement).toBeNull();
    expect(ratesListElement).toBeNull();
    expect(noDataFoundElement).toBeTruthy();
  });
});
