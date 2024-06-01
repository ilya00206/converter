import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRate } from '../../pages/currencies-page/rate.model';
import { CardComponent } from '../../ui/card/card.component';
import { ConversionResult } from '../conversion-result/converion-result.model';
import { ConversionResultComponent } from '../conversion-result/conversion-result.component';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';
import { PLN_CURRENCY } from './pln-currency';
import { SwitchButtonComponent } from '../switch-button/switch-button.component';

interface ConverterData {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CurrencySelectComponent,
    SwitchButtonComponent,
    ConversionResultComponent,
  ],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly exchangeRates = input([], {
    transform: (v: ExchangeRate[]) => [PLN_CURRENCY, ...v],
  });

  readonly form = this.fb.nonNullable.group({
    amount: 1,
    fromCurrency: 'PLN',
    toCurrency: 'EUR',
  });

  readonly result = signal<ConversionResult | undefined>(undefined);

  constructor() {
    effect(
      () => this.result.set(this.convertCurrency(this.exchangeRates(), this.form.getRawValue())),
      { allowSignalWrites: true }
    );
  }

  private convertCurrency(
    exchangeRates: ExchangeRate[],
    converterData: ConverterData
  ): ConversionResult {
    const { toCurrency, fromCurrency } = converterData;
    const amount = converterData.amount ?? 0;
    const fromRate = exchangeRates.find((rate) => rate.code === fromCurrency)?.mid!;
    const toRate = exchangeRates.find((rate) => rate.code === toCurrency)?.mid!;
    const result = +((fromRate / toRate) * amount).toFixed(2);
    return { toCurrency, fromCurrency, amount, result };
  }

  onConvert() {
    this.result.set(this.convertCurrency(this.exchangeRates(), this.form.getRawValue()));
  }

  switchCurrencies(): void {
    const { toCurrency, fromCurrency } = this.form.getRawValue();

    this.form.patchValue({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    });
  }
}
