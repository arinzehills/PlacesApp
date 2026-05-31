import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTheme } from "@/shared/context/ThemeContext";
import { useProfile } from "@/modules/profile/hooks/useProfile";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatsCard } from "@/modules/profile/components/StatsCard";
import { ImpactCard } from "@/modules/profile/components/ImpactCard";
import { DarkModeToggle } from "@/modules/profile/components/DarkModeToggle";

export default function ProfilePage() {
  const { colors } = useTheme();
  const { stats } = useProfile();
  const router = useRouter();

  const handleBrowseRides = () => {
    router.push("/route-list");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Your Rewards
        </Text>
      </View>

      <View style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <StatsCard
            icon="car-electric"
            value={stats.totalRides}
            label="Rides Taken"
          />
          <StatsCard
            icon="leaf"
            value={stats.totalCO2Saved.toFixed(1)}
            label="kg CO2 Saved"
          />
          <StatsCard
            iconEmoji="⭐"
            value={stats.ecoPoints}
            label="EcoPoints"
            color={colors.primary}
          />
        </View>

        {/* Impact Card */}
        <ImpactCard co2Saved={stats.totalCO2Saved} />

        {/* Browse Rides Button */}
        <TouchableOpacity
          style={[styles.browseButton, { backgroundColor: colors.primary }]}
          onPress={handleBrowseRides}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>Browse Available Rides</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.toggleContainer}>
        <View
          style={[styles.toggleWrapper, { backgroundColor: colors.card }]}
        >
          <View style={styles.toggleLabelContainer}>
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.toggleLabel, { color: colors.text }]}>
              Dark Mode
            </Text>
          </View>
          <DarkModeToggle />
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  browseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  browseButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  toggleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  toggleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});