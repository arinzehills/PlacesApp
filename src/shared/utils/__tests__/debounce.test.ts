import { debounce, throttle } from '../debounce';

// Mock timers
jest.useFakeTimers();

describe('debounce', () => {
  it('should delay function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(60);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should reset delay on subsequent calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('first');
    jest.advanceTimersByTime(50);
    
    debouncedFn('second');
    jest.advanceTimersByTime(50);
    
    expect(mockFn).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(60);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('second');
  });
});

describe('throttle', () => {
  it('should limit function execution rate', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('first');
    expect(mockFn).toHaveBeenCalledWith('first');

    throttledFn('second');
    expect(mockFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(110);
    throttledFn('third');
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('third');
  });
});