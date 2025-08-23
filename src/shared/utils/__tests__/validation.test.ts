import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidUrl,
  validateRequired,
  validateEmail,
  validatePassword
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test+label@example.org')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@@example.com')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should validate passwords with letters and numbers', () => {
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('Test1234')).toBe(true);
      expect(isValidPassword('myPass99')).toBe(true);
    });

    it('should reject invalid passwords', () => {
      expect(isValidPassword('password')).toBe(false); // no numbers
      expect(isValidPassword('12345678')).toBe(false); // no letters
      expect(isValidPassword('Pass1')).toBe(false); // too short
      expect(isValidPassword('')).toBe(false); // empty
    });

    it('should accept passwords with special characters', () => {
      expect(isValidPassword('password123!')).toBe(true);
      expect(isValidPassword('Test@123')).toBe(true);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate various phone number formats', () => {
      expect(isValidPhoneNumber('+1234567890')).toBe(true);
      expect(isValidPhoneNumber('1234567890')).toBe(true);
      expect(isValidPhoneNumber('+1 (234) 567-8900')).toBe(true);
      expect(isValidPhoneNumber('123 456 7890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhoneNumber('123')).toBe(false); // too short
      expect(isValidPhoneNumber('abc1234567')).toBe(false); // letters
      expect(isValidPhoneNumber('')).toBe(false); // empty
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://test.org')).toBe(true);
      expect(isValidUrl('https://sub.domain.com/path?query=1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should return undefined for valid values', () => {
      expect(validateRequired('valid text')).toBeUndefined();
      expect(validateRequired('a')).toBeUndefined();
    });

    it('should return error message for empty values', () => {
      expect(validateRequired('')).toBe('This field is required');
      expect(validateRequired('   ')).toBe('This field is required');
    });
  });

  describe('validateEmail', () => {
    it('should return undefined for valid emails', () => {
      expect(validateEmail('test@example.com')).toBeUndefined();
    });

    it('should return required error for empty email', () => {
      expect(validateEmail('')).toBe('This field is required');
      expect(validateEmail('   ')).toBe('This field is required');
    });

    it('should return format error for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
    });
  });

  describe('validatePassword', () => {
    it('should return undefined for valid passwords', () => {
      expect(validatePassword('password123')).toBeUndefined();
    });

    it('should return required error for empty password', () => {
      expect(validatePassword('')).toBe('This field is required');
    });

    it('should return format error for weak passwords', () => {
      expect(validatePassword('weak')).toBe('Password must be at least 8 characters with letters and numbers');
      expect(validatePassword('onlyletters')).toBe('Password must be at least 8 characters with letters and numbers');
    });
  });
});