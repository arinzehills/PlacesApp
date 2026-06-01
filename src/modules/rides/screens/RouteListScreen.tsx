import ridesData from "@/data/rides.json";
import { RideCard } from "@/modules/rides/components";
import { useTheme } from "@/shared/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RouteListScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleRecentRides, setVisibleRecentRides] = useState(["1", "2", "3"]);
  const rides = ridesData.rides;

  // Get last 3 rides for recent section
  const recentRides = useMemo(
    () => rides.slice(0, 3).filter((ride) => visibleRecentRides.includes(ride.id)),
    [rides, visibleRecentRides]
  );

  const filteredRides = useMemo(() => {
    if (!searchQuery.trim()) {
      return rides;
    }
    const query = searchQuery.toLowerCase();
    return rides.filter(
      (ride) =>
        ride.vehicleModel.toLowerCase().includes(query) ||
        ride.vehicleType.toLowerCase().includes(query)
    );
  }, [searchQuery, rides]);

  const handleRemoveRecentRide = (rideId: string) => {
    setVisibleRecentRides((prev) => prev.filter((id) => id !== rideId));
  };

  const handleRidePress = (rideId: string) => {
    router.push({
      pathname: "/booking",
      params: { rideId },
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Available Rides
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <MaterialCommunityIcons name="close" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Search Ride"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          testID="ride-search-input"
        />
      </View>

      {/* Recent Rides Section */}
      {isSearchFocused && recentRides.length > 0 && (
        <View
          style={[
            styles.recentRidesContainer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.recentRidesTitle, { color: colors.text }]}>
            Recent Rides
          </Text>
          {recentRides.map((ride) => (
            <View
              key={ride.id}
              style={[
                styles.recentRideItem,
                { borderBottomColor: colors.border },
              ]}
              testID={`recent-ride-item-${ride.id}`}
            >
              <Text style={[styles.recentRideName, { color: colors.text }]}>
                {ride.vehicleModel}
              </Text>
              <View style={styles.recentRideRight}>
                <Text style={[styles.recentRideType, { color: colors.primary }]}>
                  {ride.vehicleType}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveRecentRide(ride.id)}
                  testID={`remove-recent-ride-${ride.id}`}
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Rides List */}
      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rideWrapper}>
            <RideCard ride={item} onPress={() => handleRidePress(item.id)} />
          </View>
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No rides found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  recentRidesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  recentRidesTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  recentRideItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recentRideName: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  recentRideRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recentRideType: {
    fontSize: 12,
    fontWeight: "600",
  },
  cancelIcon: {
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  rideWrapper: {
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
  },
});
