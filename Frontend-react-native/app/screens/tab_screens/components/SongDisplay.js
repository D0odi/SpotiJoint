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
  const friends = loggedInUser.friends;

  const fetchCurrentPlaying = async () => {
    const songInfo = await spotifyAPI.fetchCurrentPlaying(token_s);
    if (songInfo) {
      socket.emit("currently-playing", { songInfo, friends });
      console.log("Song emitted: ", songInfo.name);
      setSongInfo(songInfo);
    } else {
      setSongInfo(null);
    }
  };

  useEffect(() => {
    fetchCurrentPlaying();
    const intervalId = setInterval(fetchCurrentPlaying, 5000);
    return () => clearInterval(intervalId);
  }, [spotifyAPI]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {songInfo && (
          <View
            style={{
              flexDirection: "row",
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
