import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExchangeRate } from '../../pages/currencies-page/rate.model';
import { DecimalPipe } from '@angular/common';
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
  readonly exchangeRates = input<ExchangeRate[]>([]);
}
