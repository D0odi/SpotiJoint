import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../../../styles";
import { AppContext } from "../../../contexts/AppContext";
import { socket } from "../../../api/client";
import TextTicker from "react-native-text-ticker";
import * as Progress from "react-native-progress";
import { set } from "react-hook-form";

const extractArtistNames = (a) => {
  a.forEach((artist) => {
    return artist.name;
  });
};

export default SongDisplay = () => {
  const [songInfo, setSongInfo] = useState({});
  const [songProgress, setSongProgress] = useState(0);
  const { token_s, loggedInUser, spotifyAPI } = useContext(AppContext);
  const user_id = loggedInUser._id;
  const friends = loggedInUser.friends;

  const fetchCurrentPlaying = async () => {
    const songInfo = await spotifyAPI.fetchCurrentPlaying(token_s);
    console.log("SongInfo: ", songInfo);
    if (songInfo) {
      socket.emit("currently-playing", { songInfo, friends });
      console.log("Song emitted: ", songInfo.name);
      setSongInfo(songInfo);
      setSongProgress(songInfo.progress_ms / songInfo.duration_ms);
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
      {songInfo && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: songInfo.songImage }}
            style={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                marginLeft: 5,
              }}
            >
              <Text style={styles.songInfo}>{songInfo.progress_ms}</Text>
              <TextTicker
                style={{ fontSize: 12 }}
                duration={20000}
                loop
                bounce={false}
                repeatSpacer={50}
                marqueeDelay={50}
              >
                {songInfo.name}
              </TextTicker>
            </View>
            <Progress.Bar
              progress={songProgress}
              height={4}
              width={Dimensions.get("window").width - 93}
              color={global.spotify_white}
              borderRadius={0}
              borderWidth={0}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingLeft: 5,
    height: 80,
  },
  fetch: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  songInfo: {
    fontSize: 14,
    color: "black",
  },
});
