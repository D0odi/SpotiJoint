import { View, Text, TouchableOpacity, Image } from "react-native";
import global from "../../../styles";

export default SpotifyBtn = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity activeOpacity={0.5}>
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
              source={require("./assets/spotify_icon.png")}
            />
            <Text
              style={{
                color: global.spotify_black,
                fontWeight: "bold",
                fontSize: 26,
              }}
            >
              Spotify
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
