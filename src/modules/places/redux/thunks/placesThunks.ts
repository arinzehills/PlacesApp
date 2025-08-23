import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlacesApiError, PlacesApiService } from '../../services';
import { Place } from '../slices/placesSlice';

export const searchPlaces = createAsyncThunk<
  Place[],
  string,
  {
    rejectValue: string;
  }
>(
  'places/searchPlaces',
  async (query, { rejectWithValue }) => {
    try {
      const places = await PlacesApiService.fetchAutocomplete(query);
      return places;
    } catch (error) {
      if (error instanceof PlacesApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred while searching places');
    }
  }
);

export const fetchPlaceDetails = createAsyncThunk<
  Place,
  string,
  {
    rejectValue: string;
  }
>(
  'places/fetchPlaceDetails',
  async (placeId, { rejectWithValue }) => {
    try {
      const place = await PlacesApiService.fetchPlaceDetails(placeId);
      return place;
    } catch (error) {
      if (error instanceof PlacesApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred while fetching place details');
    }
  }
);