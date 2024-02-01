import React from "react";
import "react-native-gesture-handler";
import { Platform, UIManager, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import LoginScreen from "./app/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AvatarUpload from "./app/screens/AvatarUpload";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import UserDomain from "./app/screens/UserDomain";
import global from "./app/styles";
import { ContextProvider } from "./app/contexts/AppContext.js";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={AvatarUpload} name="AvatarUpload" />
      <Stack.Screen component={UserDomain} name="UserDomain" />
    </Stack.Navigator>
  );
};

export default function App() {
  NavigationBar.setBackgroundColorAsync(global.background);
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor={global.background} />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ContextProvider>
  );
}
