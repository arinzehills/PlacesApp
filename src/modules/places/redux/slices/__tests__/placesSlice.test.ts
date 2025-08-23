import placesReducer, {
  Place,
  setResults,
  addToHistory,
  setSelectedPlace,
  clearResults,
  clearHistory,
  setLoading,
  setError
} from '../placesSlice';

const initialState = {
  results: [],
  history: [],
  selectedPlace: null,
  loading: false,
  error: null,
  searchLoading: false,
  detailsLoading: false,
  searchHistory: []
};

describe('placesSlice', () => {
  describe('setResults', () => {
    it('should set results and clear loading/error', () => {
      const places: Place[] = [
        {
          id: '1',
          name: 'Test Place',
          description: 'Test Description',
          lat: 40.7128,
          lng: -74.0060
        }
      ];

      const state = placesReducer(
        { ...initialState, loading: true, error: 'Some error' },
        setResults(places)
      );

      expect(state.results).toEqual(places);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('addToHistory', () => {
    it('should add place to history', () => {
      const place: Place = {
        id: '1',
        name: 'Test Place',
        description: 'Test Description',
        lat: 40.7128,
        lng: -74.0060
      };

      const state = placesReducer(
        initialState,
        addToHistory(place)
      );

      expect(state.history).toContain(place);
      expect(state.history).toHaveLength(1);
    });

    it('should not add duplicate places to history', () => {
      const place: Place = {
        id: '1',
        name: 'Test Place',
        description: 'Test Description',
        lat: 40.7128,
        lng: -74.0060
      };

      let state = placesReducer(
        initialState,
        addToHistory(place)
      );

      state = placesReducer(
        state,
        addToHistory(place)
      );

      expect(state.history).toHaveLength(1);
    });
  });

  describe('setSelectedPlace', () => {
    it('should set selected place', () => {
      const place: Place = {
        id: '1',
        name: 'Test Place',
        description: 'Test Description',
        lat: 40.7128,
        lng: -74.0060
      };

      const state = placesReducer(
        initialState,
        setSelectedPlace(place)
      );

      expect(state.selectedPlace).toEqual(place);
    });

    it('should clear selected place when null', () => {
      const place: Place = {
        id: '1',
        name: 'Test Place',
        description: 'Test Description',
        lat: 40.7128,
        lng: -74.0060
      };

      let state = placesReducer(
        initialState,
        setSelectedPlace(place)
      );

      state = placesReducer(
        state,
        setSelectedPlace(null)
      );

      expect(state.selectedPlace).toBeNull();
    });
  });

  describe('clearResults', () => {
    it('should clear results', () => {
      const places: Place[] = [
        {
          id: '1',
          name: 'Test Place',
          description: 'Test Description',
          lat: 40.7128,
          lng: -74.0060
        }
      ];

      let state = placesReducer(
        initialState,
        setResults(places)
      );

      state = placesReducer(
        state,
        clearResults()
      );

      expect(state.results).toEqual([]);
    });
  });

  describe('clearHistory', () => {
    it('should clear history', () => {
      const place: Place = {
        id: '1',
        name: 'Test Place',
        description: 'Test Description',
        lat: 40.7128,
        lng: -74.0060
      };

      let state = placesReducer(
        initialState,
        addToHistory(place)
      );

      state = placesReducer(
        state,
        clearHistory()
      );

      expect(state.history).toEqual([]);
    });
  });

  describe('setLoading', () => {
    it('should set loading state', () => {
      const state = placesReducer(
        initialState,
        setLoading(true)
      );

      expect(state.loading).toBe(true);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      const errorMessage = 'Something went wrong';
      
      const state = placesReducer(
        initialState,
        setError(errorMessage)
      );

      expect(state.error).toBe(errorMessage);
    });

    it('should clear error when null', () => {
      let state = placesReducer(
        initialState,
        setError('Some error')
      );

      state = placesReducer(
        state,
        setError(null)
      );

      expect(state.error).toBeNull();
    });
  });
});