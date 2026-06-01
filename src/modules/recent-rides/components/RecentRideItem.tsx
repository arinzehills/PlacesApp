import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/shared/context/ThemeContext";

interface BookingHistoryItem {
  id: string;
  ride: {
    id: string;
    vehicleType: string;
    vehicleModel: string;
    driverName: string;
    driverRating: number;
    eta: string;
    price: number;
    co2Saved: number;
    estimatedDuration: string;
  };
  timestamp: string;
}

interface Props {
  item: BookingHistoryItem;
  onPress: (rideId: string) => void;
}

export default function RecentRideItem({ item, onPress }: Props) {
  const { colors } = useTheme();
  const ride = item.ride;
  const ecoPoints = Math.round(ride.co2Saved * 10);

  return (
    <TouchableOpacity
      style={[styles.rideCard, { backgroundColor: colors.surface }]}
      onPress={() => onPress(ride.id)}
      activeOpacity={0.7}
    >
      {/* Route */}
      <View style={styles.routeRow}>
        <View style={styles.routeItem}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <Text style={[styles.location, { color: colors.text }]}>
            Pickup
          </Text>
        </View>
        <Ionicons
          name="arrow-forward"
          size={14}
          color={colors.textSecondary}
        />
        <View style={styles.routeItem}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <Text style={[styles.location, { color: colors.text }]}>
            Destination
          </Text>
        </View>
      </View>

      {/* Date */}
      <Text style={[styles.date, { color: colors.textSecondary }]}>
        {new Date(item.timestamp).toLocaleDateString()}
      </Text>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {ride.co2Saved} kg
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            CO2
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            ⭐ {ecoPoints}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Points
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            ${ride.price.toFixed(2)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Price
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rideCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  location: {
    fontSize: 13,
    fontWeight: "600",
  },
  date: {
    fontSize: 11,
    marginBottom: 10,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
