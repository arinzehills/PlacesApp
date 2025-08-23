export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, contains at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return 'This field is required';
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  const required = validateRequired(email);
  if (required) return required;
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  const required = validateRequired(password);
  if (required) return required;
  
  if (!isValidPassword(password)) {
    return 'Password must be at least 8 characters with letters and numbers';
  }
  return undefined;
};