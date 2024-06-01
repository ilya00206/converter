import { DecimalPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { NBPTableResponse } from '@models/index';
import { CardComponent } from '@ui/card/card.component';

@Component({
  selector: 'app-rates-list',
  standalone: true,
  imports: [DecimalPipe, CardComponent],
  templateUrl: './rates-list.component.html',
  styleUrl: './rates-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesListComponent {
  readonly response = input.required<NBPTableResponse>();

  readonly caption = computed(
    () =>
      `Tabela kursów średnich NBP nr ${this.response()?.no} z dnia ${this.response()?.effectiveDate}`
  );
}
