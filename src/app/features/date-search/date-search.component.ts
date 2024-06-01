import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
  readonly selectedDate = signal<string | undefined>(undefined);

  constructor() {
    effect(() => this.selectedDate.set(this.store.date()), { allowSignalWrites: true });
  }

  onSubmit(): void {
    this.store.setDate(this.selectedDate());
  }
}
