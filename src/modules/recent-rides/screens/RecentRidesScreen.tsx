import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "@/shared/context/ThemeContext";
import { EmptyState } from "@/shared/components/EmptyState";
import { RecentRideItem } from "@/modules/recent-rides/components";
import { BookingBottomSheet } from "@/modules/booking/screens/booking-confirmation/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ridesData from "@/data/rides.json";

export default function RecentRidesScreen() {
  const { colors } = useTheme();
  const bookingHistory = useSelector((state: RootState) => state.booking.bookingHistory);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const selectedRide = selectedRideId
    ? ridesData.rides.find((r) => r.id === selectedRideId)
    : null;

  const handleRidePress = (rideId: string) => {
    setSelectedRideId(rideId);
  };

  const handleCloseModal = () => {
    setSelectedRideId(null);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Recent Rides</Text>
      </View>

      <FlatList
        data={bookingHistory}
        renderItem={({ item }) => (
          <RecentRideItem
            item={item}
            onPress={handleRidePress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="history"
            title="No Recent Rides"
            subtitle="Your completed rides will appear here"
          />
        }
      />

      {/* Rebook Modal */}
      {selectedRide && (
        <BookingBottomSheet
          ride={selectedRide}
          buttonLabel="Rebook Ride"
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});