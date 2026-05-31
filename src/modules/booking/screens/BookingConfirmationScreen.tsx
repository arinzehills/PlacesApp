import ridesData from "@/data/rides.json";
import { useBooking } from "@/modules/booking/hooks/useBooking";
import { useProfile } from "@/modules/profile/hooks/useProfile";
import { Ride } from "@/modules/rides/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { height: screenHeight } = Dimensions.get("window");

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rideId = params.rideId as string;
  const bottomSheetRef = useRef(null);
  const { confirmBooking } = useBooking();
  const { incrementRideStats } = useProfile();

  // Get the selected ride from data
  const ride = ridesData.rides.find((r) => r.id === rideId) as Ride;

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text>Ride not found</Text>
      </View>
    );
  }

  const ecoPoints = Math.round(ride.co2Saved * 10);

  // Snap points for bottom sheet
  const snapPoints = useMemo(() => {
    return [
      140, // Minimum (just ride card + confirm button)
      screenHeight * 0.5, // Half screen
      screenHeight * 0.85, // Full screen
    ];
  }, []);

  const handleConfirm = () => {
    // Update booking status
    confirmBooking();
    // Update profile stats (rides count, CO2 saved, EcoPoints)
    incrementRideStats(ride);
    console.log("Booking confirmed for ride:", ride.id);
    // Navigate to success screen
    router.push({
      pathname: "/booking-success",
      params: { rideId: ride.id, eta: ride.eta },
    });
  };

  return (
    <View style={styles.container}>
      {/* Map area (empty for now) */}
      <View style={styles.mapPlaceholder}>
        <MaterialCommunityIcons name="map" size={48} color="#CCC" />
        <Text style={styles.mapPlaceholderText}>Map coming soon</Text>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => router.back()}
      >
        <BottomSheetScrollView style={styles.sheetContent}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Ride Card (Always Visible) */}
          <View style={styles.rideCardMinimum}>
            <View style={styles.rideIcon}>
              <MaterialCommunityIcons
                name={
                  ride.vehicleType === "Electric" ? "lightning-bolt" : "leaf"
                }
                size={20}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.rideDetailsMinimum}>
              <Text style={styles.rideModel}>{ride.vehicleModel}</Text>
              <Text style={styles.rideType}>{ride.vehicleType}</Text>
            </View>
          </View>

          {/* Expandable Details Section */}
          <View style={styles.expandableContent}>
            {/* Divider */}
            <View style={styles.divider} />

            {/* Summary Details */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color="#666"
                />
                <Text style={styles.summaryLabel}>ETA</Text>
                <Text style={styles.summaryValue}>{ride.eta}</Text>
              </View>

              <View style={styles.summaryItem}>
                <MaterialCommunityIcons name="cash" size={18} color="#666" />
                <Text style={styles.summaryLabel}>Price</Text>
                <Text style={styles.summaryValue}>
                  ${ride.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <MaterialCommunityIcons name="leaf" size={18} color="#00C853" />
                <Text style={styles.summaryLabel}>CO2 Saved</Text>
                <Text style={[styles.summaryValue, { color: "#00C853" }]}>
                  {ride.co2Saved} kg
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* EcoPoints */}
            <View style={styles.ecoPointsSection}>
              <View style={styles.ecoPointsIcon}>
                <Text style={styles.ecoIcon}>⭐</Text>
              </View>
              <View>
                <Text style={styles.ecoPointsLabel}>EcoPoints Earned</Text>
                <Text style={styles.ecoPointsValue}>{ecoPoints} points</Text>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  mapPlaceholderText: {
    marginTop: 12,
    color: "#999",
    fontSize: 14,
  },
  sheetContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  dragHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    marginBottom: 12,
  },
  rideCardMinimum: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rideIcon: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: "#00C853",
    justifyContent: "center",
    alignItems: "center",
  },
  rideDetailsMinimum: {
    flex: 1,
    marginLeft: 12,
  },
  rideModel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  rideType: {
    fontSize: 12,
    color: "#999",
  },
  confirmButton: {
    backgroundColor: "#00C853",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  expandableContent: {
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  ecoPointsSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8F5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  ecoPointsIcon: {
    marginRight: 12,
  },
  ecoIcon: {
    fontSize: 24,
  },
  ecoPointsLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  ecoPointsValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00C853",
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
});
