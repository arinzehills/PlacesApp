import { PlacesApiError } from '../types';

describe('PlacesApiError', () => {
  it('should create error with message', () => {
    const error = new PlacesApiError('Test error');
    
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('PlacesApiError');
    expect(error.status).toBeUndefined();
    expect(error.statusCode).toBeUndefined();
  });

  it('should create error with all properties', () => {
    const error = new PlacesApiError('Test error', 'TEST_STATUS', 400);
    
    expect(error.message).toBe('Test error');
    expect(error.status).toBe('TEST_STATUS');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('PlacesApiError');
  });
});