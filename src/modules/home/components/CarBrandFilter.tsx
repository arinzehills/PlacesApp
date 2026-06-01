import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/context/ThemeContext";

const BRANDS = [
  { name: "All", icon: "car-multiple" },
  { name: "Honda", icon: "car" },
  { name: "Toyota", icon: "car" },
  { name: "Hyundai", icon: "car" },
];

interface Props {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

export default function CarBrandFilter({ selectedBrand, onBrandSelect }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {BRANDS.map((brand) => (
        <TouchableOpacity
          key={brand.name}
          style={[
            styles.brandButton,
            {
              backgroundColor:
                selectedBrand === brand.name ? colors.primary : colors.surface,
              borderColor: colors.border,
            },
          ]}
          onPress={() => onBrandSelect(brand.name)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={brand.icon as any}
            size={20}
            color={selectedBrand === brand.name ? "#FFFFFF" : colors.text}
            style={styles.icon}
          />
          <Text
            style={[
              styles.brandText,
              {
                color: selectedBrand === brand.name ? "#FFFFFF" : colors.text,
                fontWeight: selectedBrand === brand.name ? "600" : "500",
              },
            ]}
          >
            {brand.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  brandButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  icon: {
    marginBottom: 4,
  },
  brandText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});
