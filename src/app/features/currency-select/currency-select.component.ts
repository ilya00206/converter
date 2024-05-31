import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ExchangeRate } from '../../pages/currencies-page/rate.model';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySelectComponent),
      multi: true,
    },
  ],
})
export class CurrencySelectComponent implements ControlValueAccessor {
  readonly options = input.required<ExchangeRate[]>();
  readonly id = input.required<string>();

  readonly value = signal('');

  onChange!: OnChangeFn;
  onTouched!: OnTouchedFn;

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(obj: string): void {
    this.value.set(obj);
  }

  valueChanged(value: string): void {
    this.onChange(value);
    this.writeValue(value);
  }
}
