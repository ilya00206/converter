import { ChangeDetectionStrategy, Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ExchangeRate } from '../../pages/currencies-page/rate.model';
import { PLN_CURRENCY } from './pln-currency';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySelectComponent implements ControlValueAccessor {
  readonly options = input.required<ExchangeRate[]>();
  readonly id = input.required<string>();

  readonly allOptions = computed(() => [PLN_CURRENCY, ...this.options()]);

  disabled = false;
  value!: string;
  onChange: any;
  onTouched!: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur(): void {
    this.onTouched();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  valueChanged(value: string) {
    this.onChange(value);
    this.writeValue(value);
  }
}
