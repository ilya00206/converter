import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NBPTableResponse } from '@models/index';
import { CurrencyService } from './currency.service';

xdescribe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTestingController: HttpTestingController;

  const mockResponse: NBPTableResponse[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService, provideHttpClientTesting(), provideHttpClient()],
    });

    service = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch latest exchange rates', () => {
    service.getLatestExchangeRates().subscribe((data) => {
      expect(data).toEqual(mockResponse[0]);
    });

    const req = httpTestingController.expectOne('https://api.nbp.pl/api/exchangerates/tables/A/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should fetch exchange rates from a specific date and cache the response', () => {
    const date = '2023-01-01';

    service.getExchangeRatesFromDate(date).subscribe((data) => {
      expect(data).toEqual(mockResponse[0]);
    });

    const req = httpTestingController.expectOne(
      `https://api.nbp.pl/api/exchangerates/tables/A/${date}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    service.getExchangeRatesFromDate(date).subscribe((data) => {
      expect(data).toEqual(mockResponse[0]);
    });

    httpTestingController.expectNone(`https://api.nbp.pl/api/exchangerates/tables/A/${date}`);
  });

  it('should handle HTTP errors and return undefined', () => {
    const date = '2023-01-01';

    service.getExchangeRatesFromDate(date).subscribe((data) => {
      expect(data).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      `https://api.nbp.pl/api/exchangerates/tables/A/${date}`
    );
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });
});
