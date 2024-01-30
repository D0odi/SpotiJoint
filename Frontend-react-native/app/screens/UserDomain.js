import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import Home from "./tab_screens/Home";
import Notifications from "./tab_screens/Notifications";
import Search from "./tab_screens/Search";
import Profile from "./tab_screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import global from "../styles";
import Spotify from "../api/spotify";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "@env";
import {
  useAuthRequest,
  ResponseType,
  makeRedirectUri,
} from "expo-auth-session";
import { AppContext } from "../contexts/AppContext";
import { socket } from "../api/client";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const redirectUri = makeRedirectUri({
  useProxy: true,
  scheme: "my-scheme",
  path: "/callback",
});

export default UserDomain = ({ route, navigation }) => {
  const { setToken_s, setSpotifyAPI, loggedInUser, token } =
    useContext(AppContext);
  const { avatar } = loggedInUser;
  const iconSize = 27;

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: redirectUri, //SPOTIFY_REDIRECT_URI,
      state: token,
    },
    discovery
  );

  const spotifyConnect = async () => {
    console.log("Tab press event triggered. Redirect uri: ", redirectUri);

    const response = await promptAsync();
    console.log("Authentication prompt opened.");

    const api = await Spotify(token);
    setSpotifyAPI(api);
    console.log("Spotify API set.");

    console.log(api.check());

    const access_token = await api.fetchAccessToken(response, redirectUri);

    console.log("Access token fetched ans set:", access_token);
    setToken_s(access_token);
  };

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("user-connected", loggedInUser._id);
      console.log(
        `Emmited: user-connected ${loggedInUser._id}, socket.id: ${socket.id}`
      );
    };

    socket.connect();
    socket.on("connect", handleConnect);

    return () => {
      console.log("Disconnecting socket...");
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", global.background]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
          height: 60,
          zIndex: 1,
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            heigth: 60,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            height: 60,
            zIndex: 2,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons
                  name="home"
                  color={
                    focused ? global.spotify_white : global.spotify_light_grey
                  }
                  size={iconSize}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Ionicons
                  name="search"
                  color={
                    focused ? global.spotify_white : global.spotify_light_grey
                  }
                  size={iconSize}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Spotify"
          component={Home}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  spotifyConnect();
                  navigation.navigate("Home");
                }}
              >
                <View style={{ width: 50, height: 50 }}>
                  <Entypo
                    name="spotify"
                    size={50}
                    color={global.spotify_green}
                  />
                </View>
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications"
                  color={
                    focused ? global.spotify_white : global.spotify_light_grey
                  }
                  size={iconSize}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  style={{
                    height: iconSize,
                    width: iconSize,
                    borderWidth: 1,
                    borderColor: focused
                      ? global.spotify_white
                      : global.spotify_light_grey,
                    borderRadius: 15,
                  }}
                  source={{ uri: avatar }}
                />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
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
});
