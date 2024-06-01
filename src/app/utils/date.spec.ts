import { getFormattedDate } from './date';

describe('getFormattedDate', () => {
  it('should format the date correctly in "yyyy-MM-dd" format', () => {
    const date = new Date('2024-06-01T00:00:00Z');
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).toBe('2024-06-01');
  });

  it('should format the date correctly with a time', () => {
    const date = new Date('2024-06-01T03:24:00');
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).toBe('2024-06-01');
  });
});
