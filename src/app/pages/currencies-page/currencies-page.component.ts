import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ExchangeFormComponent } from '@features/exchange-form/exchange-form.component';
import { NoDataFoundComponent } from '@features/no-data-found/no-data-found.component';
import { RatesListComponent } from '@features/rates-list/rates-list.component';
import { NBPTableResponse } from '@models/index';
import { DateStore } from '@store/date.service';
import { Observable, startWith, pairwise, switchMap, tap, of } from 'rxjs';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currencies-page',
  standalone: true,
  imports: [ExchangeFormComponent, RatesListComponent, NoDataFoundComponent],
  templateUrl: './currencies-page.component.html',
  styleUrl: './currencies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesPageComponent {
  private readonly currencyService = inject(CurrencyService);
  private readonly store = inject(DateStore);

  /**
   * Najperw pobierz aktualne dane, po zmianie w kalendarzu pobierz dane z wybranego dnia
   */
  readonly fetchRatesOnDateChange$: Observable<NBPTableResponse | undefined> = toObservable(
    this.store.date
  ).pipe(
    startWith(undefined),
    pairwise(),
    switchMap(([prevDate, currDate]) => {
      if (!currDate) {
        return this.currencyService
          .getLatestExchangeRates()
          .pipe(tap((resp) => this.store.setDate(resp?.effectiveDate)));
      }

      if (currDate && !prevDate) {
        return of(this.response());
      }

      return this.currencyService.getExchangeRatesFromDate(currDate);
    })
  );

  readonly response = toSignal(this.fetchRatesOnDateChange$);
  readonly exchangeRates = computed(() => this.response()?.rates ?? []);
}
