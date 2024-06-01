import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  private readonly _date = signal<string | undefined>(undefined);

  get date() {
    return this._date.asReadonly();
  }

  setDate(newDate: string | undefined) {
    this._date.set(newDate);
  }
}
