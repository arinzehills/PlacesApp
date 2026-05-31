import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/context/ThemeContext";

interface StatsCardProps {
  icon: string;
  iconEmoji?: string;
  value: string | number;
  label: string;
  color?: string;
}

export default function StatsCard({
  icon,
  iconEmoji,
  value,
  label,
  color = "#00C853",
}: StatsCardProps) {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? "#2C2C2E" : "#FFFFFF" },
      ]}
    >
      <View style={styles.iconContainer}>
        {iconEmoji ? (
          <Text style={styles.emoji}>{iconEmoji}</Text>
        ) : (
          <MaterialCommunityIcons name={icon as any} size={28} color={color} />
        )}
      </View>
      <Text
        style={[
          styles.value,
          { color: color === "#00C853" ? "#00C853" : isDark ? "#FFFFFF" : "#000000" },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          { color: isDark ? "#A1A1A6" : "#666666" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  emoji: {
    fontSize: 28,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});