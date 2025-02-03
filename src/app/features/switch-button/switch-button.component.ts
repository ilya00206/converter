import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { SwitchIconComponent } from '@ui/icons/switch-icon/switch-icon.component';

@Component({
    selector: 'app-switch-button',
    imports: [SwitchIconComponent],
    templateUrl: './switch-button.component.html',
    styleUrl: './switch-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchButtonComponent {
  readonly clicked = output();
}
