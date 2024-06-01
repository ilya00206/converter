import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DateStore } from '../../store/date.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataFoundComponent {
  private readonly store = inject(DateStore);
  readonly date = this.store.date;

  readonly dateLabel = computed(() => (this.date() ? ` z dnia ${this.date()}` : ''));

  onGetLatestData(): void {
    this.store.setDate(undefined);
  }
}
