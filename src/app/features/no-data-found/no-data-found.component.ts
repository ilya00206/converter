import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DateStore } from '@store/date.service';
import { CardComponent } from '@ui/card/card.component';

@Component({
    selector: 'app-no-data-found',
    imports: [CardComponent],
    templateUrl: './no-data-found.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataFoundComponent {
  private readonly store = inject(DateStore);
  readonly date = this.store.date;

  readonly dateLabel = computed(() => (this.date() ? ` z dnia ${this.date()}` : ''));

  onGetLatestData(): void {
    this.store.setDate(undefined);
  }
}
