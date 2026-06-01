import bookingReducer, {
  setCurrentBooking,
  confirmBooking,
  cancelBooking,
  clearCurrentBooking,
} from "../bookingSlice";
import { Ride } from "@/modules/rides/types";

describe("bookingSlice - confirmBooking", () => {
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

  const mockBooking = {
    id: "booking-1-123456",
    ride: mockRide,
    pickupLocation: "San Francisco",
    destination: "Downtown",
    timestamp: 1234567890,
  };

  const initialState = {
    currentBooking: null,
    bookingHistory: [],
    status: "idle" as const,
    error: null,
  };

  it("should add currentBooking to bookingHistory when confirming", () => {
    const stateWithBooking = {
      ...initialState,
      currentBooking: mockBooking,
      status: "confirming" as const,
    };
    const state = bookingReducer(stateWithBooking, confirmBooking());
    expect(state.bookingHistory).toHaveLength(1);
    expect(state.bookingHistory[0]).toEqual(mockBooking);
  });

  it("should set status to confirmed after confirming booking", () => {
    const stateWithBooking = {
      ...initialState,
      currentBooking: mockBooking,
      status: "confirming" as const,
    };
    const state = bookingReducer(stateWithBooking, confirmBooking());
    expect(state.status).toBe("confirmed");
  });

  it("should clear currentBooking after confirming", () => {
    const stateWithBooking = {
      ...initialState,
      currentBooking: mockBooking,
      status: "confirming" as const,
    };
    const state = bookingReducer(stateWithBooking, confirmBooking());
    expect(state.currentBooking).toBeNull();
  });

  it("should not add to history if currentBooking is null", () => {
    const state = bookingReducer(initialState, confirmBooking());
    expect(state.bookingHistory).toHaveLength(0);
    expect(state.status).toBe("idle");
  });

  it("should accumulate multiple bookings in history", () => {
    let state = initialState;

    // First booking
    const firstBooking = { ...mockBooking, id: "booking-1" };
    const stateAfterFirst = bookingReducer(
      { ...initialState, currentBooking: firstBooking, status: "confirming" as const },
      confirmBooking()
    );

    // Second booking
    const secondBooking = {
      ...mockBooking,
      id: "booking-2",
      ride: { ...mockRide, id: "2", co2Saved: 0.8 },
    };
    const stateAfterSecond = bookingReducer(
      { ...stateAfterFirst, currentBooking: secondBooking, status: "confirming" as const },
      confirmBooking()
    );

    expect(stateAfterSecond.bookingHistory).toHaveLength(2);
    expect(stateAfterSecond.bookingHistory[0].id).toBe("booking-1");
    expect(stateAfterSecond.bookingHistory[1].id).toBe("booking-2");
  });
});

describe("bookingSlice - setCurrentBooking", () => {
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

  const mockBooking = {
    id: "booking-1-123456",
    ride: mockRide,
    pickupLocation: "San Francisco",
    destination: "Downtown",
    timestamp: 1234567890,
  };

  const initialState = {
    currentBooking: null,
    bookingHistory: [],
    status: "idle" as const,
    error: null,
  };

  it("should set currentBooking to provided booking", () => {
    const state = bookingReducer(initialState, setCurrentBooking(mockBooking));
    expect(state.currentBooking).toEqual(mockBooking);
  });

  it("should set status to confirming when setting current booking", () => {
    const state = bookingReducer(initialState, setCurrentBooking(mockBooking));
    expect(state.status).toBe("confirming");
  });

  it("should clear error when setting current booking", () => {
    const stateWithError = { ...initialState, error: "Some error" };
    const state = bookingReducer(
      stateWithError,
      setCurrentBooking(mockBooking)
    );
    expect(state.error).toBeNull();
  });
});

describe("bookingSlice - cancelBooking", () => {
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

  const mockBooking = {
    id: "booking-1-123456",
    ride: mockRide,
    pickupLocation: "San Francisco",
    destination: "Downtown",
    timestamp: 1234567890,
  };

  it("should clear currentBooking when cancelling", () => {
    const stateWithBooking = {
      currentBooking: mockBooking,
      bookingHistory: [],
      status: "confirming" as const,
      error: null,
    };
    const state = bookingReducer(stateWithBooking, cancelBooking());
    expect(state.currentBooking).toBeNull();
  });

  it("should set status to cancelled", () => {
    const stateWithBooking = {
      currentBooking: mockBooking,
      bookingHistory: [],
      status: "confirming" as const,
      error: null,
    };
    const state = bookingReducer(stateWithBooking, cancelBooking());
    expect(state.status).toBe("cancelled");
  });

  it("should not affect bookingHistory when cancelling", () => {
    const existingBooking = { ...mockBooking, id: "booking-0" };
    const stateWithHistory = {
      currentBooking: mockBooking,
      bookingHistory: [existingBooking],
      status: "confirming" as const,
      error: null,
    };
    const state = bookingReducer(stateWithHistory, cancelBooking());
    expect(state.bookingHistory).toHaveLength(1);
    expect(state.bookingHistory[0]).toEqual(existingBooking);
  });
});