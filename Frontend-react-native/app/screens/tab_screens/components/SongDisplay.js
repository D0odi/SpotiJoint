import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../../../styles";
import { AppContext } from "../../../contexts/AppContext";
import { socket } from "../../../api/client";
import TextTicker from "react-native-text-ticker";
import * as Progress from "react-native-progress";
import { set } from "react-hook-form";

export default SongDisplay = () => {
  const [songInfo, setSongInfo] = useState({});
  const { token_s, loggedInUser, spotifyAPI } = useContext(AppContext);
  const user_id = loggedInUser._id;
  const friends = loggedInUser.friends;

  const extractArtistNames = (a) => {
    console.log("a: ", a);
    return a.map((artist) => {
      return artist.name;
    });
  };

  const fetchCurrentPlaying = async () => {
    const songInfo = await spotifyAPI.fetchCurrentPlaying(token_s);
    console.log("SongInfo: ", songInfo);
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
    <>
      {songInfo &&
        songInfo.name &&
        songInfo.progress_ms &&
        songInfo.duration_ms && (
          <View style={styles.container}>
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
                  borderRadius: 5,
                }}
              />
              <View
                style={{
                  justifyContent: "flex-start",
                  flex: 1,
                  marginLeft: 5,
                  backgroundColor: global.spotify_grey,
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <View style={{ marginBottom: 3 }}>
                  <Progress.Bar
                    progress={songInfo.progress_ms / songInfo.duration_ms}
                    height={4}
                    width={Dimensions.get("window").width - 93}
                    color={global.spotify_white}
                    borderRadius={0}
                    borderWidth={0}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 5,
                  }}
                >
                  <TextTicker
                    style={{ fontSize: 13, color: global.spotify_white }}
                    duration={20000}
                    loop
                    bounce={false}
                    repeatSpacer={50}
                    marqueeDelay={50}
                  >
                    {songInfo.name}
                  </TextTicker>
                  <Text
                    style={{
                      fontSize: 11,
                      color: global.spotify_light_grey,
                    }}
                  >
                    {songInfo.artists &&
                      extractArtistNames(songInfo.artists).join(", ")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 80,
  },
  fetch: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
