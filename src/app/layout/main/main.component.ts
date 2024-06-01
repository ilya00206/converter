import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CONTENT_SKIP_LINK } from '@ui/skip-link/skip-links';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly contentSkipLinkId = CONTENT_SKIP_LINK.id;
}
