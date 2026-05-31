import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/shared/context/ThemeContext";
import { RideCard } from "@/modules/rides/components";
import ridesData from "@/data/rides.json";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  // Get first 3 rides for preview
  const previewRides = ridesData.rides.slice(0, 3);

  const handleViewMore = () => {
    router.push("/route-list");
  };

  const handleWhereToPress = () => {
    router.push("/route-list");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Let's hit the road
        </Text>
      </View>

      {/* Where to field */}
      <View style={styles.whereToSection}>
        <TouchableOpacity
          onPress={handleWhereToPress}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.whereToInput,
              { backgroundColor: colors.surface },
            ]}
            pointerEvents="none"
          >
            <Text style={{ color: colors.textTertiary, fontSize: 16 }}>
              Where to?
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Rides preview section */}
      <View style={styles.ridesSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Available Rides
        </Text>
        {previewRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onPress={() => console.log("Ride selected:", ride.id)}
          />
        ))}

        {/* View More Link */}
        <TouchableOpacity
          style={styles.viewMoreLink}
          onPress={handleViewMore}
        >
          <Text style={[styles.viewMoreText, { color: colors.primary }]}>
            View More Rides
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={16}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  whereToSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  whereToInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  ridesSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  viewMoreLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 8,
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00C853",
  },
});