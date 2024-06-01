import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  private readonly _date = signal<string | undefined>(undefined);

  get date(): Signal<string | undefined> {
    return this._date.asReadonly();
  }

  setDate(newDate: string | undefined): void {
    this._date.set(newDate);
  }
}
