// modules/places/hooks/usePlaces.ts
// import { AppDispatch, RootState } from '@/app/store';
import { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToHistory,
    clearHistory,
    clearResults,
    Place,
    removeFromHistory,
    setError,
    setLoading,
    setResults,
    setSelectedPlace
} from '../redux/slices/placesSlice';

export const usePlaces = () => {
    const dispatch = useDispatch<AppDispatch>();
    const placesState = useSelector((state: RootState) => state.places || {
        results: [],
        history: [],
        selectedPlace: null,
        loading: false,
        error: null,
    });

    const actions = {
        setResults: (places: Place[]) => dispatch(setResults(places)),
        addToHistory: (place: Place) => dispatch(addToHistory(place)),
        setSelectedPlace: (place: Place | null) => dispatch(setSelectedPlace(place)),
        clearResults: () => dispatch(clearResults()),
        clearHistory: () => dispatch(clearHistory()),
        removeFromHistory: (placeId: string) => dispatch(removeFromHistory(placeId)),
        setLoading: (loading: boolean) => dispatch(setLoading(loading)),
        setError: (error: string | null) => dispatch(setError(error)),
    };

    return {
        ...placesState,
        ...actions,
    };
};