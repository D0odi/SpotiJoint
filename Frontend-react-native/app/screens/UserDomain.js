import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "./tab_screens/Home";
import Notifications from "./tab_screens/Notifications";
import Search from "./tab_screens/Search";
import Profile from "./tab_screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import global from "../styles";
const Tab = createBottomTabNavigator();

export default UserDomain = ({ route, navigation }) => {
  const { imageUri, name, nickname, token } = route.params;
  const iconSize = 25;

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
          height: 50,
          borderRadius: 15,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? global.light_swamp : global.font}
              size={iconSize}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{ token: token }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              color={focused ? global.light_swamp : global.font}
              size={iconSize}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              color={focused ? global.light_swamp : global.font}
              size={iconSize}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                padding: 2,
                borderColor: global.light_swamp,
                borderWidth: focused ? 2 : 0,
                borderRadius: 100,
              }}
            >
              <Image
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 100,
                  borderColor: focused ? "white" : global.font,
                  borderWidth: 1.5,
                }}
                source={{ uri: imageUri }}
              ></Image>
            </TouchableOpacity>
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
