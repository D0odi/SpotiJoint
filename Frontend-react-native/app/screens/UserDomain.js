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
  const { imageUri, name, nickname, token, _id } = route.params;
  const iconSize = 27;

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: global.spotify_white,
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            height: 55,
            borderRadius: 15,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ token: token }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                color={focused ? global.green_50 : global.blue}
                size={iconSize}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          initialParams={{ token: token, _id: _id }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                color={focused ? global.green_50 : global.blue}
                size={iconSize}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          initialParams={{ token: token }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="notifications"
                color={focused ? global.green_50 : global.blue}
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
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: focused
                      ? global.green_50
                      : global.background,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    style={{
                      height: 26,
                      width: 26,
                    }}
                    source={{ uri: imageUri }}
                  ></Image>
                </View>
              </TouchableOpacity>
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
  },
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
