import profileReducer, { incrementRideStats, setStats } from "../profileSlice";
import { Ride } from "@/modules/rides/types";

describe("profileSlice - incrementRideStats", () => {
  const initialState = {
    stats: {
      totalRides: 0,
      totalCO2Saved: 0,
      ecoPoints: 0,
    },
    loading: false,
    error: null,
  };

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

  it("should increment totalRides by 1", () => {
    const state = profileReducer(initialState, incrementRideStats(mockRide));
    expect(state.stats.totalRides).toBe(1);
  });

  it("should add co2Saved to totalCO2Saved", () => {
    const state = profileReducer(initialState, incrementRideStats(mockRide));
    expect(state.stats.totalCO2Saved).toBe(1.4);
  });

  it("should calculate ecoPoints correctly (co2Saved * 10)", () => {
    const state = profileReducer(initialState, incrementRideStats(mockRide));
    expect(state.stats.ecoPoints).toBe(14); // 1.4 * 10 = 14
  });

  it("should accumulate stats across multiple rides", () => {
    let state = profileReducer(initialState, incrementRideStats(mockRide));
    const secondRide: Ride = {
      ...mockRide,
      id: "2",
      co2Saved: 0.8,
    };
    state = profileReducer(state, incrementRideStats(secondRide));

    expect(state.stats.totalRides).toBe(2);
    expect(state.stats.totalCO2Saved).toBe(2.2); // 1.4 + 0.8
    expect(state.stats.ecoPoints).toBe(22); // (1.4 * 10) + (0.8 * 10) = 14 + 8
  });

  it("should handle hybrid vehicles correctly", () => {
    const hybridRide: Ride = {
      ...mockRide,
      vehicleType: "Hybrid",
      co2Saved: 0.9,
    };
    const state = profileReducer(initialState, incrementRideStats(hybridRide));
    expect(state.stats.totalCO2Saved).toBe(0.9);
    expect(state.stats.ecoPoints).toBe(9); // 0.9 * 10 = 9
  });
});

describe("profileSlice - setStats", () => {
  const initialState = {
    stats: {
      totalRides: 0,
      totalCO2Saved: 0,
      ecoPoints: 0,
    },
    loading: false,
    error: null,
  };

  it("should set stats to provided values", () => {
    const newStats = {
      totalRides: 5,
      totalCO2Saved: 6.5,
      ecoPoints: 65,
    };
    const state = profileReducer(initialState, setStats(newStats));
    expect(state.stats).toEqual(newStats);
  });
});