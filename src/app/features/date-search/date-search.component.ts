import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateStore } from '../../store/date.service';
import { getFormattedDate } from '../../utils/date';

@Component({
  selector: 'app-date-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-search.component.html',
  styleUrl: './date-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSearchComponent {
  private readonly store = inject(DateStore);

  readonly form = inject(NonNullableFormBuilder).group({ date: this.store.date() });
  readonly maxDate = getFormattedDate(new Date());

  onSubmit(): void {
    this.store.setDate(this.form.controls.date.getRawValue());
  }
}
