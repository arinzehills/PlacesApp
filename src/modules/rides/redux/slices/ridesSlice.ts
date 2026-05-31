import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "@/modules/rides/types";

interface RidesState {
  availableRides: Ride[];
  selectedRide: Ride | null;
  loading: boolean;
  error: string | null;
  filters: {
    vehicleType: "all" | "Electric" | "Hybrid";
    sortBy: "eta" | "price" | "co2";
  };
}

const initialState: RidesState = {
  availableRides: [],
  selectedRide: null,
  loading: false,
  error: null,
  filters: {
    vehicleType: "all",
    sortBy: "eta",
  },
};

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setAvailableRides: (state, action: PayloadAction<Ride[]>) => {
      state.availableRides = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedRide: (state, action: PayloadAction<Ride | null>) => {
      state.selectedRide = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<RidesState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearRides: (state) => {
      state.availableRides = [];
      state.selectedRide = null;
    },
  },
});

export const {
  setAvailableRides,
  setSelectedRide,
  setLoading,
  setError,
  setFilters,
  clearRides,
} = ridesSlice.actions;

export default ridesSlice.reducer;