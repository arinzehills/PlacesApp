// modules/places/redux/slices/placesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlaceDetails, searchPlaces } from '../thunks';

export interface Place {
    id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
    address?: string;
    placeId?: string;
}

export interface SearchQuery {
    id: string;
    query: string;
    timestamp: number;
}

interface PlacesState {
    results: Place[];
    history: Place[];
    searchHistory: SearchQuery[];
    selectedPlace: Place | null;
    loading: boolean;
    error: string | null;
    searchLoading: boolean;
    detailsLoading: boolean;
}

const initialState: PlacesState = {
    results: [],
    history: [],
    selectedPlace: null,
    loading: false,
    error: null,
    searchLoading: false,
    detailsLoading: false,
    searchHistory: []
};

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setResults: (state, action: PayloadAction<Place[]>) => {
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },
        addToHistory: (state, action: PayloadAction<Place>) => {
            const place = action.payload;
            const existingIndex = state.history.findIndex(
                (item) => item.placeId === place.placeId ||
                    (item.lat === place.lat && item.lng === place.lng)
            );

            if (existingIndex !== -1) {
                state.history.splice(existingIndex, 1);
            }

            state.history.unshift(place);

            if (state.history.length > 20) {
                state.history = state.history.slice(0, 20);
            }
        },
        setSelectedPlace: (state, action: PayloadAction<Place | null>) => {
            state.selectedPlace = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
        clearHistory: (state) => {
            state.history = [];
        },
        removeFromHistory: (state, action: PayloadAction<string>) => {
            const placeId = action.payload;
            state.history = state.history.filter(
                (place) => place.placeId !== placeId && place.id !== placeId
            );
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPlaces.pending, (state) => {
                state.searchLoading = true;
                state.error = null;
            })
            .addCase(searchPlaces.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.results = action.payload;
                state.error = null;
            })
            .addCase(searchPlaces.rejected, (state, action) => {
                state.searchLoading = false;
                state.error = action.payload || 'Failed to search places';
                state.results = [];
            })
            .addCase(fetchPlaceDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchPlaceDetails.fulfilled, (state, action) => {
                state.detailsLoading = false;
                state.selectedPlace = action.payload;
                state.error = null;

                const place = action.payload;
                const existingIndex = state.history.findIndex(
                    (item) => item.placeId === place.placeId ||
                        (item.lat === place.lat && item.lng === place.lng)
                );

                if (existingIndex !== -1) {
                    state.history.splice(existingIndex, 1);
                }

                state.history.unshift(place);

                if (state.history.length > 20) {
                    state.history = state.history.slice(0, 20);
                }
            })
            .addCase(fetchPlaceDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload || 'Failed to fetch place details';
            });
    },
});

export const {
    setResults,
    addToHistory,
    setSelectedPlace,
    clearResults,
    clearHistory,
    removeFromHistory,
    setLoading,
    setError,
} = placesSlice.actions;

export default placesSlice.reducer;