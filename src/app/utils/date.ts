import { formatDate } from '@angular/common';

export function getFormattedDate(date: Date): string {
  return formatDate(date, 'yyyy-MM-dd', 'pl');
}
