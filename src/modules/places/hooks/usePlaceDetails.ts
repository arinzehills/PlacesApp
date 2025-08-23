import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { fetchPlaceDetails } from '../redux/thunks';
import { usePlaces } from './usePlaces';

export const usePlaceDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPlace, detailsLoading, error } = usePlaces();

  const fetchDetails = useCallback(
    async (placeId: string) => {
      if (!placeId) {
        console.warn('usePlaceDetails: placeId is required');
        return;
      }

      try {
        const result = await dispatch(fetchPlaceDetails(placeId));
        return result.payload;
      } catch (error) {
        console.error('Failed to fetch place details:', error);
        throw error;
      }
    },
    [dispatch]
  );

  return {
    selectedPlace,
    loading: detailsLoading,
    error,
    fetchDetails,
  };
};