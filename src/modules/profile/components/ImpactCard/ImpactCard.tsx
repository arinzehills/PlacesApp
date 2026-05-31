import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/context/ThemeContext";

interface ImpactCardProps {
  co2Saved: number;
}

export default function ImpactCard({ co2Saved }: ImpactCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.primaryLight },
      ]}
    >
      <MaterialCommunityIcons
        name="leaf-circle"
        size={20}
        color={colors.primary}
      />
      <Text
        style={[
          styles.text,
          { color: colors.textSecondary },
        ]}
      >
        You've saved {co2Saved.toFixed(1)} kg of CO2 emissions by choosing eco-friendly rides! 🌱
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 24,
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});