import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NBPTableResponse } from '@models/index';
import { Observable, map, of, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.nbp.pl/api/exchangerates/tables/A/';

  private readonly cache = new Map<string, NBPTableResponse | undefined>();

  getLatestExchangeRates(): Observable<NBPTableResponse | undefined> {
    return this.http.get<NBPTableResponse[]>(this.apiUrl).pipe(map(this.mapResponse));
  }

  getExchangeRatesFromDate(date: string): Observable<NBPTableResponse | undefined> {
    const url = `${this.apiUrl}${date}`;

    const cached = this.cache.has(date);
    const cache = this.cache.get(date);

    if (cached) {
      return of(cache);
    }

    return this.http.get<NBPTableResponse[]>(url).pipe(
      map(this.mapResponse),
      tap({
        next: (resp) => this.cache.set(date, resp),
        error: () => this.cache.set(date, undefined),
      }),
      catchError(() => of(undefined))
    );
  }

  private mapResponse(resp: NBPTableResponse[]): NBPTableResponse {
    return resp[0];
  }
}
