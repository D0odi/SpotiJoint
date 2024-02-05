import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import TextTicker from "react-native-text-ticker";
import global from "../../../styles.js";
import { socket } from "../../../api/client.js";
import { CollapsableContainer } from "./CollapsableContainer.js";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
export const UserCardFriend = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const handleFriendSong = ({ songInfo, user_id }) => {
      if (!songInfo) {
        setCurrentSong(null);
        return;
      }
      console.log("Received friends-song event", songInfo.name);
      if (user_id === item._id) {
        setCurrentSong(songInfo);
      }
    };
    socket.on("friends-song", handleFriendSong);
    return () => {
      socket.off("friends-song", handleFriendSong);
    };
  }, [socket]);

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp} layout={Layout}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.friend}
        onPress={onItemPress}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View
            style={{
              flex: 1,
              marginLeft: 5,
              justifyContent: "center",
            }}
          >
            <Text style={[styles.text, { fontSize: 13 }]}>{item.name}</Text>
            <TextTicker
              style={{ fontSize: 11, color: global.spotify_white_50 }}
              duration={20000}
              loop
              bounce={false}
              repeatSpacer={50}
              marqueeDelay={50}
            >
              {currentSong ? currentSong.name : "Nothing playing..."}
            </TextTicker>
          </View>
          {/* <View style={{ flex: 1 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: currentSong.songImage }}
            />
          </View> */}
        </View>
        <CollapsableContainer expanded={expanded}>
          {/* <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: currentSong.songImage }}
          /> */}
        </CollapsableContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    color: global.spotify_white,
    fontWeight: "bold",
  },
  friend: {
    padding: 7,
    backgroundColor: global.spotify_grey,
    borderRadius: 5,
    marginBottom: 6,
  },
});
