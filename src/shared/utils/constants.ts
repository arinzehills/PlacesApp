export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://api.placesapp.com';

export const STORAGE_KEYS = {
  USER_TOKEN: '@placesapp/user_token',
  USER_PREFERENCES: '@placesapp/user_preferences',
  CACHED_PLACES: '@placesapp/cached_places',
} as const;

export const SCREEN_NAMES = {
  HOME: 'Home',
  PLACES: 'Places',
  PLACE_DETAILS: 'PlaceDetails',
  ADD_PLACE: 'AddPlace',
  PROFILE: 'Profile',
} as const;

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C7C7CC',
} as const;

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;