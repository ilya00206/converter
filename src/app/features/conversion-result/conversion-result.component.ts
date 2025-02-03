import { DecimalPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ConversionResult } from '@models/index';
import { CardComponent } from '@ui/card/card.component';

@Component({
    selector: 'app-conversion-result',
    imports: [CardComponent, DecimalPipe],
    templateUrl: './conversion-result.component.html',
    styleUrl: './conversion-result.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionResultComponent {
  readonly result = input.required<ConversionResult>();
}
