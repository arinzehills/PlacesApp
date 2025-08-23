// HomeScreen.tsx
import { router } from "expo-router";
import * as React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { WelcomeCard } from "../components";

const HomeScreen: React.FC = () => {
  const handleExplorePress = () => {
    // Navigate to places screen
    router.push("/places");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <WelcomeCard onExplorePress={handleExplorePress} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default HomeScreen;
