import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRate } from '../../pages/currencies-page/rate.model';
import { CardComponent } from '../../ui/card/card.component';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, CurrencySelectComponent],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly exchangeRates = input<ExchangeRate[]>([]);

  readonly conversionForm = this.fb.nonNullable.group({
    amount: 1,
    fromCurrency: 'PLN',
    toCurrency: 'EUR',
  });
  constructor() {
    this.conversionForm.valueChanges.subscribe(console.log);
  }
  convertCurrency(): number {
    const amount = this.conversionForm.controls.amount.getRawValue();
    const fromCurrency = this.conversionForm.controls.fromCurrency.getRawValue();
    const toCurrency = this.conversionForm.controls.toCurrency.getRawValue();

    const fromRate = this.exchangeRates().find((rate) => rate.code === fromCurrency)?.mid!;
    const toRate = this.exchangeRates().find((rate) => rate.code === toCurrency)?.mid!;

    return (amount / fromRate) * toRate;
  }
}
