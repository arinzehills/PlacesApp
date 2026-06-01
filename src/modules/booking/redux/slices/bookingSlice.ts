import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "@/modules/rides/types";

interface BookingDetails {
  id: string;
  ride: Ride;
  pickupLocation: string;
  destination: string;
  timestamp: number;
}

interface BookingState {
  currentBooking: BookingDetails | null;
  bookingHistory: BookingDetails[];
  status: "idle" | "confirming" | "confirmed" | "completed" | "cancelled";
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookingHistory: [],
  status: "idle",
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<BookingDetails | null>) => {
      state.currentBooking = action.payload;
      state.status = "confirming";
      state.error = null;
    },
    confirmBooking: (state) => {
      if (state.currentBooking) {
        state.bookingHistory.push(state.currentBooking);
        state.status = "confirmed";
        state.currentBooking = null; // Clear after confirming
      }
    },
    completeBooking: (state) => {
      state.status = "completed";
    },
    cancelBooking: (state) => {
      state.currentBooking = null;
      state.status = "cancelled";
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.status = "idle";
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentBooking,
  confirmBooking,
  completeBooking,
  cancelBooking,
  clearCurrentBooking,
  setError,
} = bookingSlice.actions;

export default bookingSlice.reducer;