import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "./tab_screens/Home";
import Notifications from "./tab_screens/Notifications";
import Search from "./tab_screens/Search";
import Profile from "./tab_screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import global from "../styles";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default UserDomain = ({ route, navigation }) => {
  const { imageUri, name, nickname } = route.params;
  const iconSize = 30;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          height: 70,
          borderRadius: 15,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home" color={global.font} size={iconSize} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="notifications"
              color={global.font}
              size={iconSize}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Ionicons name="search" color={global.font} size={iconSize} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 1,
                borderColor: focused ? global.light_swamp : "white",
                borderWidth: 2,
                borderRadius: 100,
              }}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                  borderColor: global.dark_swamp,
                  borderWidth: 1.5,
                }}
                source={{ uri: imageUri }}
              ></Image>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
