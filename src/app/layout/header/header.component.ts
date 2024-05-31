import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkipLinkComponent } from '../../ui/skip-link/skip-link.component';
import { SKIP_LINKS } from '../../ui/skip-link/skip-links';
import { DateSearchComponent } from '../../features/date-search/date-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SkipLinkComponent, DateSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly skipLinks = SKIP_LINKS;
}
