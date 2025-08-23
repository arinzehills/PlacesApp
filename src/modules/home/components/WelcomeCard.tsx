import { Button } from "@ant-design/react-native";
import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { WelcomeCardProps } from "./types";

const { width, height } = Dimensions.get("window");

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onExplorePress }) => {
  return (
    <View style={styles.container}>
      {/* 3D Map Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.phoneContainer}>
          <View style={styles.phoneScreen}>
            <View style={styles.mapBackground}>
              {/* Map Path */}
              <View style={styles.mapPath} />
              <View style={styles.mapPath2} />

              {/* Location Pin */}
              <View style={styles.locationPin}>
                <View style={styles.pinHead} />
                <View style={styles.pinPoint} />
              </View>

              {/* Path Points */}
              <View style={[styles.pathPoint, styles.startPoint]} />
              <View style={[styles.pathPoint, styles.endPoint]} />
            </View>
          </View>
          {/* Phone Frame */}
          <View style={styles.phoneFrame} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Navigate your</Text>
        <Text style={styles.mainTitle}>surroundings with</Text>
        <Text style={styles.mainTitle}>effortless confidence</Text>

        <Text style={styles.subtitle}>
          Explore new destinations, effortlessly{"\n"}
          find your path, and never lose your way!
        </Text>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* CTA Button */}
        <Button
          type="primary"
          style={styles.ctaButton}
          onPress={onExplorePress}
        >
          <Text style={styles.buttonText}>Explore Places</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  illustrationContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  phoneContainer: {
    width: 200,
    height: 300,
    position: "relative",
    transform: [
      { perspective: 1000 },
      { rotateX: "15deg" },
      { rotateY: "-10deg" },
    ],
  },

  phoneScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2c3e50",
    borderRadius: 25,
    padding: 8,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },

  phoneFrame: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderWidth: 3,
    borderColor: "#34495e",
    borderRadius: 28,
    zIndex: -1,
  },

  mapBackground: {
    flex: 1,
    backgroundColor: "#2ecc71",
    borderRadius: 18,
    position: "relative",
    overflow: "hidden",
  },

  mapPath: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: 4,
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    transform: [{ rotate: "25deg" }],
  },

  mapPath2: {
    position: "absolute",
    top: "50%",
    left: "45%",
    width: 4,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    transform: [{ rotate: "-15deg" }],
  },

  locationPin: {
    position: "absolute",
    top: "25%",
    right: "30%",
    alignItems: "center",
  },

  pinHead: {
    width: 30,
    height: 30,
    backgroundColor: "#e74c3c",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  pinPoint: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#e74c3c",
    marginTop: -2,
  },

  pathPoint: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f39c12",
  },

  startPoint: {
    top: "35%",
    left: "22%",
  },

  endPoint: {
    bottom: "25%",
    right: "25%",
  },

  content: {
    flex: 0.4,
    alignItems: "center",
    width: "100%",
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 32,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bdc3c7",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#2ecc71",
    width: 20,
  },

  ctaButton: {
    width: width - 48,
    height: 56,
    backgroundColor: "#2ecc71",
    borderRadius: 28,
    borderWidth: 0,
    elevation: 3,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default WelcomeCard;
