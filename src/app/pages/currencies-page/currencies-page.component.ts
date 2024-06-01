import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, of, pairwise, startWith, switchMap, tap } from 'rxjs';
import { ExchangeFormComponent } from '../../features/exchange-form/exchange-form.component';
import { ExchangeRatesListComponent } from '../../features/rates-list/rates-list.component';
import { DateStore } from '../../store/date.service';
import { CurrencyService } from './currency.service';
import { NBPTableResponse } from './rate.model';
import { NoDataFoundComponent } from '../../features/no-data-found/no-data-found.component';

@Component({
  selector: 'app-currencies-page',
  standalone: true,
  imports: [ExchangeFormComponent, ExchangeRatesListComponent, NoDataFoundComponent],
  templateUrl: './currencies-page.component.html',
  styleUrl: './currencies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesPageComponent {
  private readonly currencyService = inject(CurrencyService);
  private readonly store = inject(DateStore);

  readonly date = this.store.date;

  readonly fetchRatesOnDateChange$: Observable<NBPTableResponse | undefined> = toObservable(
    this.date
  ).pipe(
    startWith('2024-06-01'),
    pairwise(),
    switchMap(([prevDate, currDate]) => {
      console.log(prevDate, currDate);
      if (!currDate) {
        return this.currencyService
          .getLatestExchangeRates()
          .pipe(tap((resp) => this.store.setDate(resp?.effectiveDate)));
      }

      const response = this.response();
      if (currDate && !prevDate && response) {
        return of(response);
      }

      // if (prevDate && !currDate) {
      //   return this.currencyService
      //     .getExchangeRatesFromDate(prevDate)
      //     .pipe(tap((resp) => this.store.setDate(resp?.effectiveDate)));
      // }

      return this.currencyService.getExchangeRatesFromDate(currDate!);
    })
  );

  readonly response = toSignal(this.fetchRatesOnDateChange$);

  readonly exchangeRates = computed(() => {
    return this.response()?.rates ?? [];
  });
}
