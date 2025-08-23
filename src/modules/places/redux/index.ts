
// modules/places/redux/index.ts
import { configureStore } from '@reduxjs/toolkit';
import placesSlice from './slices/placesSlice';

export const placesStore = configureStore({
    reducer: {
        places: placesSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export type PlacesRootState = ReturnType<typeof placesStore.getState>;
export type PlacesAppDispatch = typeof placesStore.dispatch;

// Export the slice for use in the main store
export * from './slices/placesSlice';
export { default as placesReducer } from './slices/placesSlice';

