import {
  setCurrentBooking,
  confirmBooking,
  cancelBooking,
  clearCurrentBooking,
} from "@/modules/booking/redux/slices/bookingSlice";
import { store } from "@/store";
import { Ride } from "@/modules/rides/types";

describe("useBooking Hook - Redux Actions Integration", () => {
  const mockRide: Ride = {
    id: "1",
    vehicleType: "Electric",
    vehicleModel: "Tesla Model 3",
    driverName: "Sarah Johnson",
    driverRating: 4.9,
    eta: "3 mins",
    price: 7.5,
    co2Saved: 1.4,
    estimatedDuration: "12 mins",
  };

  it("should initialize booking state as empty", () => {
    const state = store.getState();
    expect(state.booking.currentBooking).toBeNull();
    expect(state.booking.bookingHistory).toBeDefined();
    expect(state.booking.status).toBe("idle");
    expect(state.booking.error).toBeNull();
  });

  it("should set current booking with ride details", () => {
    const booking = {
      id: "booking-1",
      ride: mockRide,
      pickupLocation: "San Francisco",
      destination: "Downtown",
      timestamp: Date.now(),
    };

    store.dispatch(setCurrentBooking(booking));
    const state = store.getState();

    expect(state.booking.currentBooking).toEqual(booking);
    expect(state.booking.currentBooking?.ride).toEqual(mockRide);
    expect(state.booking.status).toBe("confirming");
  });

  it("should confirm booking and add to history", () => {
    const booking = {
      id: "booking-2",
      ride: mockRide,
      pickupLocation: "San Francisco",
      destination: "Downtown",
      timestamp: Date.now(),
    };

    store.dispatch(setCurrentBooking(booking));
    store.dispatch(confirmBooking());
    const state = store.getState();

    expect(state.booking.bookingHistory.length).toBeGreaterThan(0);
    expect(state.booking.currentBooking).toBeNull();
    expect(state.booking.status).toBe("confirmed");
  });

  it("should cancel booking without adding to history", () => {
    const booking = {
      id: "booking-cancel",
      ride: mockRide,
      pickupLocation: "San Francisco",
      destination: "Downtown",
      timestamp: Date.now(),
    };

    const initialHistoryLength = store.getState().booking.bookingHistory.length;

    store.dispatch(setCurrentBooking(booking));
    store.dispatch(cancelBooking());
    const state = store.getState();

    expect(state.booking.currentBooking).toBeNull();
    expect(state.booking.bookingHistory.length).toBe(initialHistoryLength);
    expect(state.booking.status).toBe("cancelled");
  });

  it("should clear current booking without affecting history", () => {
    const booking = {
      id: "booking-clear",
      ride: mockRide,
      pickupLocation: "San Francisco",
      destination: "Downtown",
      timestamp: Date.now(),
    };

    const initialHistoryLength = store.getState().booking.bookingHistory.length;

    store.dispatch(setCurrentBooking(booking));
    store.dispatch(clearCurrentBooking());
    const state = store.getState();

    expect(state.booking.currentBooking).toBeNull();
    expect(state.booking.bookingHistory.length).toBe(initialHistoryLength);
    expect(state.booking.status).toBe("idle");
  });
});