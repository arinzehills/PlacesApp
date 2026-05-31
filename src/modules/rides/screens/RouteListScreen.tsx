import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RideCard } from "@/modules/rides/components";
import ridesData from "@/data/rides.json";

export default function RouteListScreen() {
  const router = useRouter();
  const rides = ridesData.rides;

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <TouchableOpacity onPress={handleClose}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Rides List */}
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rideWrapper}>
            <RideCard
              ride={item}
              onPress={() => handleRidePress(item.id)}
            />
          </View>
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  rideWrapper: {
    marginBottom: 8,
  },
});