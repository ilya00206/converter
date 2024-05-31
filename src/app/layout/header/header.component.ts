import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkipLinkComponent } from '../../ui/skip-link/skip-link.component';
import { SKIP_LINKS } from '../../ui/skip-link/skip-links';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, SkipLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly formattedTodayDate = formatDate(new Date(), 'yyyy-MM-dd', 'pl');
  readonly date = signal(this.formattedTodayDate);
  readonly skipLinks = SKIP_LINKS;
}
