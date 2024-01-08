import React from "react";
import "react-native-gesture-handler";
import LoginScreen from "./app/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AvatarUpload from "./app/screens/AvatarUpload";
import { SafeAreaView } from "react-native-safe-area-context";
import UserDomain from "./app/screens/UserDomain";
import global from "./app/styles";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      style={{ backgroundColor: global.background }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={AvatarUpload} name="AvatarUpload" />
      <Stack.Screen component={UserDomain} name="UserDomain" />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: global.background }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
