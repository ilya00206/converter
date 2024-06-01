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

  private readonly cache = new Map<string, NBPTableResponse | undefined>();

  getLatestExchangeRates(): Observable<NBPTableResponse | undefined> {
    console.log("LATEST DATA")
    const url = `${this.apiUrl}/tables/A/`;
    return this.http.get<NBPTableResponse[]>(url).pipe(map(this.mapResponse));
  }

  getExchangeRatesFromDate(date: string): Observable<NBPTableResponse | undefined> {

    console.log("ARCHIVE DATA")
    const url = `${this.apiUrl}/tables/A/${date}`;

    const cached = this.cache.has(date);
    const cache = this.cache.get(date);

    return cached
      ? of(cache)
      : this.http.get<NBPTableResponse[]>(url).pipe(
          map(this.mapResponse),
          catchError(() => {
            this.cache.set(date, undefined);
            return of(undefined);
          })
        );
  }

  private mapResponse(resp: NBPTableResponse[]): NBPTableResponse {
    return resp[0];
  }
}
