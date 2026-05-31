import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setCurrentBooking,
  confirmBooking,
  cancelBooking,
  clearCurrentBooking,
} from "@/modules/booking/redux/slices/bookingSlice";
import { Ride } from "@/modules/rides/types";

interface BookingDetails {
  id: string;
  ride: Ride;
  pickupLocation: string;
  destination: string;
  timestamp: number;
}

export const useBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookingState = useSelector((state: RootState) => state.booking);

  const actions = {
    setCurrentBooking: (ride: Ride) => {
      dispatch(
        setCurrentBooking({
          id: `booking_${Date.now()}`,
          ride,
          pickupLocation: "Current Location",
          destination: "Destination",
          timestamp: Date.now(),
        })
      );
    },
    confirmBooking: () => {
      dispatch(confirmBooking());
    },
    cancelBooking: () => {
      dispatch(cancelBooking());
    },
    clearCurrentBooking: () => {
      dispatch(clearCurrentBooking());
    },
  };

  return {
    ...bookingState,
    ...actions,
  };
};