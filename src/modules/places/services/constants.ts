export const API_CONFIG = {
  ENDPOINTS: {
    AUTOCOMPLETE: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    DETAILS: 'https://maps.googleapis.com/maps/api/place/details/json',
  },
  API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  DEFAULT_LANGUAGE: 'en',
  MIN_QUERY_LENGTH: 3,
  REQUEST_TIMEOUT: 10000,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const GOOGLE_PLACES_STATUS = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
  OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
  REQUEST_DENIED: 'REQUEST_DENIED',
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;