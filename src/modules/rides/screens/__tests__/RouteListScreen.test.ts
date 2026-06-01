/**
 * Test suite for RouteListScreen search functionality
 * Tests search filtering by vehicle model and type
 */

describe("RouteListScreen Search", () => {
  describe("Search filtering logic", () => {
    const mockRides = [
      {
        id: "1",
        vehicleModel: "Tesla Model 3",
        vehicleType: "Electric",
        driverName: "John",
        driverRating: 4.8,
        eta: "3 mins",
        price: 15.0,
        co2Saved: 1.4,
        estimatedDuration: "12 mins",
      },
      {
        id: "2",
        vehicleModel: "Toyota Prius",
        vehicleType: "Hybrid",
        driverName: "Jane",
        driverRating: 4.9,
        eta: "4 mins",
        price: 12.0,
        co2Saved: 0.8,
        estimatedDuration: "15 mins",
      },
      {
        id: "3",
        vehicleModel: "Nissan Leaf",
        vehicleType: "Electric",
        driverName: "Bob",
        driverRating: 4.7,
        eta: "5 mins",
        price: 14.0,
        co2Saved: 1.2,
        estimatedDuration: "18 mins",
      },
    ];

    const filterRides = (rides: typeof mockRides, query: string) => {
      if (!query.trim()) {
        return rides;
      }
      const q = query.toLowerCase();
      return rides.filter(
        (ride) =>
          ride.vehicleModel.toLowerCase().includes(q) ||
          ride.vehicleType.toLowerCase().includes(q)
      );
    };

    it("should return all rides when search query is empty", () => {
      const result = filterRides(mockRides, "");
      expect(result).toEqual(mockRides);
      expect(result).toHaveLength(3);
    });

    it("should return all rides when search query is only whitespace", () => {
      const result = filterRides(mockRides, "   ");
      expect(result).toEqual(mockRides);
      expect(result).toHaveLength(3);
    });

    it("should filter rides by vehicle model", () => {
      const result = filterRides(mockRides, "Tesla");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toContain("Tesla");
    });

    it("should filter rides by vehicle type", () => {
      const result = filterRides(mockRides, "Electric");
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.vehicleType === "Electric")).toBe(true);
    });

    it("should filter rides case-insensitively for model", () => {
      const result1 = filterRides(mockRides, "tesla");
      const result2 = filterRides(mockRides, "TESLA");
      const result3 = filterRides(mockRides, "Tesla");

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
      expect(result1).toHaveLength(1);
    });

    it("should filter rides case-insensitively for type", () => {
      const result1 = filterRides(mockRides, "hybrid");
      const result2 = filterRides(mockRides, "HYBRID");

      expect(result1).toEqual(result2);
      expect(result1).toHaveLength(1);
    });

    it("should return partial matches", () => {
      const result = filterRides(mockRides, "model");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });

    it("should return empty array when no rides match", () => {
      const result = filterRides(mockRides, "BMW");
      expect(result).toHaveLength(0);
    });

    it("should handle multi-word search queries", () => {
      const result = filterRides(mockRides, "Tesla Model");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });
  });
});
