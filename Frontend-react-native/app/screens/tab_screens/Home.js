import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { useEffect, useState } from "react";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@env";
import global from "../../styles";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default Home = () => {
  const [oauthToken, setOauthToken] = useState(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-playback-state",
        "user-read-currently-playing",
      ],
      usePKCE: false,
      redirectUri: "exp://100.64.1.230:8081",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log(access_token);
      setOauthToken(access_token);
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
