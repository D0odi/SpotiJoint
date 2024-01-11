import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { useEffect, useState } from "react";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "@env";
import global from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons/EvilIcons";
import axios from "axios";
import client from "../../api/client";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default Home = ({ route }) => {
  const { token } = route.params;
  const [oauthSpotify, setOauthSpotify] = useState(null);
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
      ],
      usePKCE: false,
      redirectUri: SPOTIFY_REDIRECT_URI,
    },
    discovery
  );

  const getRefreshToken = async (code) => {
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
    const fetchRefreshToken = async () => {
      if (response?.type === "success") {
        console.log(response.params);
        const { code } = response.params;
        setOauthSpotify(code);
        try {
          const access_token = await getRefreshToken(code);
          console.log(access_token);
        } catch (error) {
          console.error("Error fetching refresh token:", error);
        }
      }
    };

    fetchRefreshToken();
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          promptAsync();
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: 50, height: 50, marginRight: 3 }}
            source={require("../../../assets/spotify_icon.png")}
          />
          <Text
            style={{ color: global.font, fontWeight: "bold", fontSize: 26 }}
          >
            Spotify
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: global.background,
  },
});
