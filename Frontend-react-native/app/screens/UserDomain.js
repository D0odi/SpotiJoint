import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import { useState, useContext } from "react";
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
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                {focused && <View style={styles.line}></View>}
                <Ionicons name="home" color={global.blue} size={iconSize} />
              </>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                {focused && <View style={styles.line}></View>}
                <Ionicons name="search" color={global.blue} size={iconSize} />
              </>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Spotify"
          component={Home}
          listeners={{
            tabPress: async (e) => {
              e.preventDefault();
              console.log(
                "Tab press event triggered. Redirect uri: ",
                redirectUri
              );

              const response = await promptAsync();
              console.log("Authentication prompt opened.");

              const api = await Spotify(token);
              setSpotifyAPI(api);
              console.log("Spotify API set.");

              console.log(api.check());

              const access_token = await api.fetchAccessToken(
                response,
                redirectUri
              );

              console.log("Access token fetched ans set:", access_token);
              setToken_s(access_token);
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: global.blue,
                  borderRadius: 20,
                  padding: 7,
                  bottom: 10,
                }}
              >
                <Image
                  style={{
                    height: 35,
                    width: 35,
                  }}
                  source={require("./tab_screens/components/assets/spotify_icon.png")}
                ></Image>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                {focused && <View style={styles.line}></View>}
                <Ionicons
                  name="notifications"
                  color={global.blue}
                  size={iconSize}
                />
              </>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                {focused && <View style={styles.line}></View>}
                <View>
                  <Image
                    style={{
                      height: 26,
                      width: 26,
                    }}
                    source={{ uri: avatar }}
                  ></Image>
                </View>
              </>
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
  line: {
    position: "absolute",
    width: 27,
    height: 3,
    backgroundColor: global.blue,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    top: 0,
  },
});
