import {
  formatDate,
  formatTime,
  formatDateTime,
  formatDistance,
  formatRating,
  truncateText
} from '../formatters';

describe('formatters', () => {
  describe('formatDistance', () => {
    it('should format meters for distances under 1000m', () => {
      expect(formatDistance(50)).toBe('50m');
      expect(formatDistance(500)).toBe('500m');
      expect(formatDistance(999)).toBe('999m');
    });

    it('should format kilometers for distances over 1000m', () => {
      expect(formatDistance(1000)).toBe('1.0km');
      expect(formatDistance(1500)).toBe('1.5km');
      expect(formatDistance(2500)).toBe('2.5km');
      expect(formatDistance(10000)).toBe('10.0km');
    });

    it('should round meters properly', () => {
      expect(formatDistance(50.4)).toBe('50m');
      expect(formatDistance(50.6)).toBe('51m');
    });
  });

  describe('formatRating', () => {
    it('should format rating to one decimal place', () => {
      expect(formatRating(4)).toBe('4.0/5.0');
      expect(formatRating(4.5)).toBe('4.5/5.0');
      expect(formatRating(3.7)).toBe('3.7/5.0');
    });

    it('should handle decimal ratings', () => {
      expect(formatRating(4.123)).toBe('4.1/5.0');
      expect(formatRating(2.999)).toBe('3.0/5.0');
    });
  });

  describe('truncateText', () => {
    it('should return original text if shorter than max length', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
      expect(truncateText('Test', 5)).toBe('Test');
    });

    it('should truncate text if longer than max length', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
      expect(truncateText('This is a long text', 10)).toBe('This is a ...');
    });

    it('should handle exact length', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncateText('', 5)).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date in US format', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toMatch(/January 15, 2024/);
    });
  });

  describe('formatTime', () => {
    it('should format time in 12-hour format', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatTime(date);
      expect(result).toMatch(/2:30 PM/);
    });
  });

  describe('formatDateTime', () => {
    it('should combine date and time formatting', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatDateTime(date);
      expect(result).toMatch(/January 15, 2024 at (0?2:30 PM|14:30)/);
    });
  });
});