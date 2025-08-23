import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from '../../../shared/utils';
import { AppDispatch } from '../../../store';
import { searchPlaces } from '../redux/thunks';
import { usePlaces } from './usePlaces';

interface UsePlaceAutocompleteOptions {
  debounceMs?: number;
  minLength?: number;
}

export const usePlaceAutocomplete = (options: UsePlaceAutocompleteOptions = {}) => {
  const { debounceMs = 300, minLength = 3 } = options;
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { results, searchLoading, error } = usePlaces();

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length >= minLength) {
        dispatch(searchPlaces(searchQuery.trim()));
      }
    }, debounceMs),
    [dispatch, minLength, debounceMs]
  );

  useEffect(() => {
    if (query.trim().length >= minLength) {
      debouncedSearch(query);
    } else if (query.trim().length === 0) {
      // Clear results when query is empty
      dispatch(searchPlaces(''));
    }
  }, [query, debouncedSearch, minLength, dispatch]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    results,
    loading: searchLoading,
    error,
    handleQueryChange,
    clearQuery,
    hasMinLength: query.trim().length >= minLength,
  };
};