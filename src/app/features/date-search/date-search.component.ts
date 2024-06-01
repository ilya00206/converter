import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateStore } from '../../store/date.service';
import { getFormattedDate } from '../../utils/date';

@Component({
  selector: 'app-date-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-search.component.html',
  styleUrl: './date-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSearchComponent {
  private readonly store = inject(DateStore);

  readonly maxDate = getFormattedDate(new Date());
  readonly date = this.store.date;

  calendarDate: string | undefined;

  onSubmit(): void {
    this.store.setDate(this.calendarDate);
  }

  onDateChange(newDate: string): void {
    this.calendarDate = newDate;
  }
}
