import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-switch-icon',
  standalone: true,
  templateUrl: './switch-icon.component.html',
  styleUrl: './switch-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchIconComponent {}
