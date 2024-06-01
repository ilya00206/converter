import { Component, ChangeDetectionStrategy, input, inject, signal, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PLN_CURRENCY } from '@data/pln-currency';
import { ConversionResultComponent } from '@features/conversion-result/conversion-result.component';
import { CurrencySelectComponent } from '@features/currency-select/currency-select.component';
import { SwitchButtonComponent } from '@features/switch-button/switch-button.component';
import { ConversionResult, ExchangeForm, ExchangeRate } from '@models/index';
import { CardComponent } from '@ui/card/card.component';
import { FormControlComponent } from '@ui/form-control/form-control.component';
import { convertCurrency } from '@utils/convert-currency';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CurrencySelectComponent,
    SwitchButtonComponent,
    ConversionResultComponent,
    FormControlComponent,
  ],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeFormComponent {
  readonly exchangeRates = input([], {
    transform: (v: ExchangeRate[]) => [PLN_CURRENCY, ...v],
  });

  readonly form = inject(FormBuilder).nonNullable.group({
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
    exchangeForm: ExchangeForm
  ): ConversionResult {
    return convertCurrency(exchangeRates, exchangeForm);
  }

  onConvert(): void {
    this.result.set(this.convertCurrency(this.exchangeRates(), this.form.getRawValue()));
  }

  onSwitchCurrencies(): void {
    const { toCurrency, fromCurrency } = this.form.getRawValue();

    this.form.patchValue({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    });
  }
}
