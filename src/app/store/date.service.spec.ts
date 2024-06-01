import { TestBed } from '@angular/core/testing';
import { DateStore } from './date.service';

describe('DateStore', () => {
  let service: DateStore;

  beforeEach(() => {
    service = TestBed.inject(DateStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with undefined date', () => {
    expect(service.date()).toBeUndefined();
  });

  it('should set and get the date correctly', () => {
    const testDate = '2024-01-01';
    service.setDate(testDate);
    expect(service.date()).toBe(testDate);
  });

  it('should allow setting the date to undefined', () => {
    service.setDate('2024-01-01');
    expect(service.date()).toBe('2024-01-01');

    service.setDate(undefined);
    expect(service.date()).toBeUndefined();
  });
});
