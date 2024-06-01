import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { NBPTableResponse } from './rate.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.nbp.pl/api/exchangerates';

  getLatestExchangeRates() {
    const url = `${this.apiUrl}/tables/A/`;
    return this.getRates$(url);
  }

  getExchangeRatesFromDate(date: string) {
    const url = `${this.apiUrl}/tables/A/${date}`;
    return this.getRates$(url);
  }

  private getRates$(url: string): Observable<NBPTableResponse | undefined> {
    return this.http.get<NBPTableResponse[]>(url).pipe(
      map((resp) => resp[0]),
      catchError(() => of(undefined))
    );
  }
}
