import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { View, Text, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../../../styles";

const formatTime = (ms) => {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export default SongDisplay = ({ token_s }) => {
  const [songInfo, setSongInfo] = useState({});
  const fetchCurrentPlaying = async () => {
    console.log("token_s: ", token_s);
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token_s}`,
          },
        }
      );
      const data = await response.json();
      console.log("Currently Playing:", data);
      setSongInfo({
        name: data.item.name,
        progress_ms: formatTime(data.progress_ms),
      });
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
    }
  };
  useEffect(() => {
    fetchCurrentPlaying();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={fetchCurrentPlaying}>
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
          <>
            <Text style={styles.songInfo}>{songInfo.name}</Text>
            <Text style={styles.songInfo}>{songInfo.progress_ms}</Text>
          </>
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
