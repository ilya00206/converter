import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { skip, startWith, switchMap } from 'rxjs';
import { ExchangeFormComponent } from '../../features/exchange-form/exchange-form.component';
import { ExchangeRatesListComponent } from '../../features/rates-list/rates-list.component';
import { DateStore } from '../../store/date.service';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currencies-page',
  standalone: true,
  imports: [ExchangeFormComponent, ExchangeRatesListComponent],
  templateUrl: './currencies-page.component.html',
  styleUrl: './currencies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesPageComponent {
  private readonly currencyService = inject(CurrencyService);
  readonly date = inject(DateStore).date;

  private readonly fetchRatesOnDateChange$ = toObservable(this.date).pipe(
    skip(1),
    startWith(undefined),
    switchMap((date) => this.currencyService.getExchangeRates(date))
  );

  readonly response = toSignal(this.fetchRatesOnDateChange$);

  readonly exchangeRates = computed(() => this.response()?.rates ?? []);
}
