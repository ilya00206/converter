import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NBPTableResponse } from '../../pages/currencies-page/rate.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-rates-list',
  standalone: true,
  templateUrl: './rates-list.component.html',
  styleUrl: './rates-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, CardComponent],
})
export class ExchangeRatesListComponent {
  readonly response = input<NBPTableResponse>();

  get caption() {
    return `Tabela kursów średnich NBP nr ${this.response()?.no} z dnia ${this.response()?.effectiveDate}`;
  }
}
