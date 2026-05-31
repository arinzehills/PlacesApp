import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "@/modules/rides/types";

interface ProfileStats {
  totalRides: number;
  totalCO2Saved: number;
  ecoPoints: number;
}

interface ProfileState {
  stats: ProfileStats;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  stats: {
    totalRides: 0,
    totalCO2Saved: 0,
    ecoPoints: 0,
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    incrementRideStats: (state, action: PayloadAction<Ride>) => {
      const ride = action.payload;
      state.stats.totalRides += 1;
      state.stats.totalCO2Saved += ride.co2Saved;
      state.stats.ecoPoints += Math.round(ride.co2Saved * 10);
    },
    setStats: (state, action: PayloadAction<ProfileStats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { incrementRideStats, setStats, setLoading, setError } =
  profileSlice.actions;

export default profileSlice.reducer;