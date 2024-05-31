import { Component, inject, signal } from '@angular/core';
import { ExchangeFormComponent } from '../../features/exchange-form/exchange-form.component';
import { ExchangeRatesListComponent } from '../../features/rates-list/rates-list.component';
import { formatDate } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { skip, startWith, switchMap, map } from 'rxjs';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currencies-page',
  standalone: true,
  imports: [ExchangeFormComponent, ExchangeRatesListComponent],
  templateUrl: './currencies-page.component.html',
  styleUrl: './currencies-page.component.scss',
})
export class CurrenciesPageComponent {
  private readonly currencyService = inject(CurrencyService);

  readonly formattedTodayDate = formatDate(new Date(), 'yyyy-MM-dd', 'pl');
  readonly date = signal(this.formattedTodayDate);

  readonly fetchRatesOnDateChange$ = toObservable(this.date).pipe(
    skip(1),
    startWith(undefined),
    switchMap((date) => this.currencyService.getExchangeRates(date).pipe(map((resp) => resp.rates)))
  );

  readonly exchangeRates = toSignal(this.fetchRatesOnDateChange$, {
    initialValue: [],
  });
}
