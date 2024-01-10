import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { useEffect, useState } from "react";
import { SPOTIFY_CLIENT_ID } from "@env";
import global from "../../styles";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default Home = () => {
  const [oauthToken, setOauthToken] = useState(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-playback-state",
        "user-read-currently-playing",
      ],
      usePKCE: false,
      redirectUri: "sjoint://spotify-auth-callback",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      setToken(response);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>{oauthToken ? oauthToken : SPOTIFY_CLIENT_ID}</Text>
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
