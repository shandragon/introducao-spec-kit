import { describe, it, expect } from 'vitest';

describe('Task Validation', () => {
  it('should validate time format (HH:MM)', () => {
    const isValid = (time: string) => /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(time);
    
    expect(isValid('14:00')).toBe(true);
    expect(isValid('09:30')).toBe(true);
    expect(isValid('23:59')).toBe(true);
    expect(isValid('24:00')).toBe(false);
    expect(isValid('14:60')).toBe(false);
    expect(isValid('abc')).toBe(false);
  });

  it('should validate duration is a positive number', () => {
    const isValidDuration = (d: any) => typeof d === 'number' && d > 0;
    
    expect(isValidDuration(30)).toBe(true);
    expect(isValidDuration(0)).toBe(false);
    expect(isValidDuration(-10)).toBe(false);
    expect(isValidDuration('30')).toBe(false);
  });
});
