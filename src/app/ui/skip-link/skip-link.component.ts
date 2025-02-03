import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SkipLink } from './skip-links';

@Component({
  selector: 'app-skip-link',
  templateUrl: './skip-link.component.html',
  styleUrl: './skip-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLinkComponent {
  private readonly document = inject(DOCUMENT);

  readonly skipLink = input.required<SkipLink>();

  scrollAuto(e: Event, elementId: string): void {
    e.preventDefault();
    const item: HTMLElement | null = this.document.querySelector('#' + elementId);
    if (item) {
      item.setAttribute('tabindex', '-1');
      item.focus();
    }
  }
}
