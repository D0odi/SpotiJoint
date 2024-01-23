import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../../../styles";
import { AppContext } from "../../../contexts/AppContext";
import { socket } from "../../../api/client";

export default SongDisplay = () => {
  const [songInfo, setSongInfo] = useState({});
  const { token_s, loggedInUser, spotifyAPI } = useContext(AppContext);
  const user_id = loggedInUser._id;
  const socket_id = socket.id;

  const fetchCurrentPlaying = async () => {
    const songInfo = await spotifyAPI.fetchCurrentPlaying(token_s);
    setSongInfo(songInfo);
  };

  useEffect(() => {
    fetchCurrentPlaying();
  }, [spotifyAPI]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: global.spotify_black,
            }}
          >
            <Text style={styles.fetch}>Fetch</Text>
          </View>
        </TouchableOpacity>
        {songInfo && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginLeft: 15,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={styles.songInfo}>{songInfo.name}</Text>
            <Text style={styles.songInfo}>{songInfo.progress_ms}</Text>
            <Image
              source={{ uri: songInfo.songImage }}
              style={{ width: 54, height: 54, borderRadius: 15 }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  fetch: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  songInfo: {
    padding: 10,
    fontSize: 14,
    color: "black",
  },
});
