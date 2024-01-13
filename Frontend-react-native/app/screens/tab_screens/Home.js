import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { useEffect, useState } from "react";
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

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default Home = ({ route }) => {
  const { token } = route.params;
  const [token_s, setToken_s] = useState(
    "BQDs1Gq-XMFt7DsKdRFrjksZoUpzuw9frFrXotfTkpaXAEOCgQHY6wxrIg7SqMc0dtFzW417rJ47UB54yXIpHOzmTa_hSaFD03FuDIltP2SeHmTWov7Gls4nZvxjETKwOYkuWa_jDikwZb-c4K-RKRSz20e4BPHH5OflHTMWKGL9UonmaSpjT0DjmEcc2TZa5GF0BZ-nl_PS5rZjx7H2_cT1yO_7Yx2IOhN72A"
  );
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
      redirectUri: SPOTIFY_REDIRECT_URI,
    },
    discovery
  );

  const getAccessToken = async (code) => {
    const res = await client.post(
      "/exchange",
      {
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
          Auth: `JWT ${token}`,
        },
      }
    );

    return res.data.access_token;
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (response?.type === "success") {
        console.log(response.params);
        const { code } = response.params;
        try {
          const access_token = await getAccessToken(code);
          console.log(access_token);
          setToken_s(access_token);
        } catch (error) {
          console.error("Error fetching refresh token:", error);
        }
      }
    };

    fetchAccessToken();
  }, [response]);

  const [userInfo_s, setUserInfo_s] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token_s}`,
          },
        });
        const data = await response.json();
        console.log("User Profile:", data);
        setUserInfo_s({
          avatar: data.images[0].url,
          name: data.display_name,
          location: data.country,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (token_s) {
      fetchUserProfile();
    }
  }, [token_s]);

  return (
    <View style={styles.container}>
      {token_s && userInfo_s ? (
        <>
          <View style={styles.outerContainer}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: userInfo_s.avatar }}
              />
              <View style={styles.dot} />
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
          <View style={styles.friends}></View>
        </>
      ) : (
        <SpotifyBtn promptAsync={promptAsync} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  currentSong: {
    height: 70,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  friends: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: global.spotify_black,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
  },
  outerContainer: {
    flexDirection: "row",
    padding: 2,
    backgroundColor: global.spotify_black,
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
    color: global.spotify_white,
  },
  name: {
    textAlign: "right",
  },
  location: {
    textAlign: "left",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2.5,
    backgroundColor: global.spotify_white,
    marginHorizontal: 10,
  },
});
