import { Injectable, signal } from '@angular/core';
import { getFormattedDate } from '../utils/date';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  private readonly _date = signal(getFormattedDate(new Date()));

  get date() {
    return this._date.asReadonly();
  }

  setDate(newDate: string) {
    this._date.set(newDate);
  }
}
