import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { NBPTableResponse } from './rate.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly apiUrl = 'https://api.nbp.pl/api/exchangerates/tables/A/';
  private readonly http = inject(HttpClient);

  getExchangeRates(date?: string): Observable<NBPTableResponse> {
    const url = date ? `${this.apiUrl}${date}` : this.apiUrl;
    return this.http.get<NBPTableResponse[]>(url).pipe(
      map((resp) => resp[0]),
      catchError(() => of())
    );
  }
}
