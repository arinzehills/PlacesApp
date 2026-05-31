import { Provider as AntProvider } from "@ant-design/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, Text } from "react-native";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { store, persistor } from "@/store";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Loading...</Text>
  </View>
);

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider>
              <AntProvider>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="route-list" options={{ headerShown: false }} />
                  <Stack.Screen name="booking" options={{ headerShown: false }} />
                  <Stack.Screen name="booking-success" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </AntProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
}