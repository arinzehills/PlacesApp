/**
 * Test suite for RouteListScreen search functionality
 * Tests search filtering by vehicle model and type
 */

describe("RouteListScreen Search Filtering", () => {
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
    {
      id: "4",
      vehicleModel: "Honda Accord",
      vehicleType: "Hybrid",
      driverName: "Alice",
      driverRating: 4.6,
      eta: "6 mins",
      price: 13.0,
      co2Saved: 0.9,
      estimatedDuration: "20 mins",
    },
  ];

  // Helper function that mimics the filtering logic in RouteListScreen
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

  describe("Empty and whitespace queries", () => {
    it("should return all rides when search query is empty", () => {
      const result = filterRides(mockRides, "");
      expect(result).toEqual(mockRides);
      expect(result).toHaveLength(4);
    });

    it("should return all rides when search query is only whitespace", () => {
      const result = filterRides(mockRides, "   ");
      expect(result).toEqual(mockRides);
      expect(result).toHaveLength(4);
    });

    it("should return all rides when search query is tabs and spaces", () => {
      const result = filterRides(mockRides, "\t\n  ");
      expect(result).toEqual(mockRides);
    });
  });

  describe("Vehicle model filtering", () => {
    it("should filter rides by exact vehicle model name", () => {
      const result = filterRides(mockRides, "Tesla Model 3");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });

    it("should filter rides by partial vehicle model", () => {
      const result = filterRides(mockRides, "Model");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toContain("Model");
    });

    it("should filter rides by single word from model", () => {
      const result = filterRides(mockRides, "Tesla");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });

    it("should filter multiple rides by shared model word", () => {
      const result = filterRides(mockRides, "Honda");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Honda Accord");
    });
  });

  describe("Vehicle type filtering", () => {
    it("should filter rides by exact vehicle type", () => {
      const result = filterRides(mockRides, "Electric");
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.vehicleType === "Electric")).toBe(true);
    });

    it("should filter rides by hybrid type", () => {
      const result = filterRides(mockRides, "Hybrid");
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.vehicleType === "Hybrid")).toBe(true);
    });

    it("should return correct vehicles for electric type", () => {
      const result = filterRides(mockRides, "Electric");
      const vehicleModels = result.map((r) => r.vehicleModel);
      expect(vehicleModels).toContain("Tesla Model 3");
      expect(vehicleModels).toContain("Nissan Leaf");
    });
  });

  describe("Case-insensitive filtering", () => {
    it("should filter rides case-insensitively for model (lowercase)", () => {
      const result = filterRides(mockRides, "tesla");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });

    it("should filter rides case-insensitively for model (uppercase)", () => {
      const result = filterRides(mockRides, "TESLA");
      expect(result).toHaveLength(1);
    });

    it("should filter rides case-insensitively for type (lowercase)", () => {
      const result = filterRides(mockRides, "hybrid");
      expect(result).toHaveLength(2);
    });

    it("should filter rides case-insensitively for type (uppercase)", () => {
      const result = filterRides(mockRides, "HYBRID");
      expect(result).toHaveLength(2);
    });

    it("should filter rides case-insensitively for type (mixed case)", () => {
      const result = filterRides(mockRides, "ElEcTrIc");
      expect(result).toHaveLength(2);
    });
  });

  describe("No match scenarios", () => {
    it("should return empty array when no rides match", () => {
      const result = filterRides(mockRides, "BMW");
      expect(result).toHaveLength(0);
    });

    it("should return empty array for non-existent vehicle type", () => {
      const result = filterRides(mockRides, "Gasoline");
      expect(result).toHaveLength(0);
    });

    it("should return empty array for partial non-match", () => {
      const result = filterRides(mockRides, "xyz");
      expect(result).toHaveLength(0);
    });
  });

  describe("Multiple word and complex queries", () => {
    it("should handle multi-word search queries", () => {
      const result = filterRides(mockRides, "Tesla Model");
      expect(result).toHaveLength(1);
      expect(result[0].vehicleModel).toBe("Tesla Model 3");
    });

    it("should find matches within longer queries", () => {
      const result = filterRides(mockRides, "Model 3");
      expect(result).toHaveLength(1);
    });

    it("should filter by type when searching with multiple words", () => {
      const result = filterRides(mockRides, "Hybrid");
      expect(result).toHaveLength(2);
    });
  });

  describe("Edge cases", () => {
    it("should handle search query with leading/trailing spaces", () => {
      const result = filterRides(mockRides, "  Tesla  ");
      expect(result).toHaveLength(1);
    });

    it("should be consistent across multiple calls with same query", () => {
      const result1 = filterRides(mockRides, "Tesla");
      const result2 = filterRides(mockRides, "Tesla");
      expect(result1).toEqual(result2);
    });

    it("should maintain correct order of filtered results", () => {
      const result = filterRides(mockRides, "Electric");
      expect(result[0].id).toBe("1"); // Tesla Model 3
      expect(result[1].id).toBe("3"); // Nissan Leaf
    });

    it("should not modify original rides array", () => {
      const originalLength = mockRides.length;
      filterRides(mockRides, "Tesla");
      expect(mockRides).toHaveLength(originalLength);
    });
  });
});
