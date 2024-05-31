import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { ConversionResult } from './converion-result.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-conversion-result',
  standalone: true,
  imports: [CardComponent, DecimalPipe],
  templateUrl: './conversion-result.component.html',
  styleUrl: './conversion-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionResultComponent {
  readonly result = input.required<ConversionResult>();
}
