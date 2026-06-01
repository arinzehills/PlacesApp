import { useEffect, useState } from "react";
import * as Location from "expo-location";
import ridesData from "@/data/rides.json";
import { Ride } from "@/modules/rides/types";
import { useTheme } from "@/shared/context/ThemeContext";
import { useMapLocation } from "@/modules/map/hooks";
import { useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setCurrentBooking } from "@/modules/booking/redux/slices/bookingSlice";
import { BookingBottomSheet, LocationCard, MapView } from "./components";

export default function BookingConfirmationScreen() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { userLocation } = useMapLocation();
  const params = useLocalSearchParams();
  const rideId = params.rideId as string;
  const [locationName, setLocationName] = useState("Current Location");

  const ride = ridesData.rides.find((r) => r.id === rideId) as Ride;

  useEffect(() => {
    const getLocationName = async () => {
      if (userLocation) {
        try {
          const addresses = await Location.reverseGeocodeAsync({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          });
          if (addresses.length > 0) {
            const address = addresses[0];
            const name = address.city || address.district || address.name || "Current Location";
            setLocationName(name);
          }
        } catch (error) {
          console.error("Error getting address:", error);
        }
      }
    };

    getLocationName();
  }, [userLocation]);

  // Set current booking when ride and location are available
  useEffect(() => {
    if (ride && locationName) {
      dispatch(
        setCurrentBooking({
          id: `booking-${ride.id}-${Date.now()}`,
          ride,
          pickupLocation: locationName,
          destination: "Destination", // Placeholder - in real app would be user-selected
          timestamp: Date.now(),
        })
      );
    }
  }, [ride, locationName, dispatch]);

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text>Ride not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Location Card */}
      <LocationCard location={locationName} />

      {/* Map area */}
      <MapView ride={ride} />

      {/* Bottom Sheet */}
      <BookingBottomSheet ride={ride} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
