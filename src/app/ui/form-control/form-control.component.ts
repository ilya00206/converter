import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-control',
  standalone: true,
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
}
