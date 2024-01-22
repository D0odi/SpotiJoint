import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { useEffect, useState, useContext } from "react";
import SongDisplay from "./components/SongDisplay";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "@env";
import global from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../../api/client";
import SpotifyBtn from "./components/SpotifyBtn";
import Spotify from "../../api/spotify";
import { AppContext } from "../../contexts/AppContext";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default Home = ({ route }) => {
  const { token_s, spotifyAPI, setToken_s, setSpotifyAPI } =
    useContext(AppContext);

  const [userInfo_s, setUserInfo_s] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token_s && spotifyAPI) {
        console.log("spotifyApi check: ", spotifyAPI.check());
        const userInfo = await spotifyAPI.fetchUserProfile(token_s);
        setUserInfo_s(userInfo);
      }
    };

    if (token_s && spotifyAPI) {
      fetchUserProfile();
    }
  }, [token_s]);

  return (
    <View style={styles.container}>
      {token_s && userInfo_s && (
        <>
          <View style={styles.outerContainer}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: userInfo_s.avatar }}
              />
              <Text style={[styles.name, styles.text_info]}>
                {userInfo_s.name}
              </Text>
              <View style={styles.dot} />
              <Text style={[styles.location, styles.text_info]}>
                {userInfo_s.location}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("./components/assets/spotify_icon.png")}
                />
              </View>
            </View>
          </View>
          <View style={styles.currentSong}>
            <SongDisplay token_s={token_s} />
          </View>
        </>
      )}
      <View style={styles.friends}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentSong: {
    height: 70,
    backgroundColor: global.spotify_white,
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  friends: {
    flex: 1,
    backgroundColor: global.spotify_white,
    padding: 10,
    borderRadius: 15,
    marginBottom: 65,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: global.background,
  },
  userContainer: {
    flex: 1,
    backgroundColor: global.spotify_white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
  },
  outerContainer: {
    flexDirection: "row",
    padding: 2,
    marginBottom: 10,
    borderRadius: 17,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text_info: {
    fontSize: 13,
    fontWeight: "bold",
    color: global.spotify_black,
  },
  name: {
    textAlign: "right",
    marginLeft: 10,
  },
  location: {
    textAlign: "left",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2.5,
    backgroundColor: global.spotify_black_light,
    marginHorizontal: 10,
  },
});
