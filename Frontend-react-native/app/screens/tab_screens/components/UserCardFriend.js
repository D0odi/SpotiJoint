import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import TextTicker from "react-native-text-ticker";
import global from "../../../styles.js";
import { socket } from "../../../api/client.js";
import { CollapsableContainer } from "./CollapsableContainer.js";
import * as Progress from "react-native-progress";
import { FlashList } from "@shopify/flash-list";

const barWidth = Dimensions.get("window").width - 74;
export const UserCardFriend = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const offset = useRef(new Animated.Value(50)).current;
  // const barOffset = useRef(new Animated.Value(-barWidth)).current;

  const toggleAnimation = () => {
    Animated.timing(offset, {
      toValue: expanded ? 50 : 0,
      duration: 450,
      useNativeDriver: false,
    }).start();
    // Animated.timing(barOffset, {
    //   toValue: expanded ? -barWidth : 0,
    //   duration: 450,
    //   useNativeDriver: true,
    // }).start();
  };

  const borderRadius = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 20],
  });

  const barY = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -4],
  });

  const onItemPress = () => {
    toggleAnimation();
    setExpanded(!expanded);
  };

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
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.friend}
        onPress={onItemPress}
      >
        {currentSong && (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              transform: [{ translateY: barY }],
            }}
          >
            <Progress.Bar
              progress={currentSong.progress_ms / currentSong.duration_ms}
              height={4}
              width={barWidth}
              color={global.spotify_light_grey}
              borderRadius={4}
              borderWidth={0}
            />
          </Animated.View>
        )}
        <View
          style={{
            margin: 7,
            marginTop: 8,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginLeft: 7,
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
        </View>
        {currentSong && (
          <Animated.View
            style={{
              overflow: "hidden",
              borderRadius,
              position: "absolute",
              right: 0,
              top: 0,
              width: 64,
              height: 64,
              transform: [{ translateX: offset }],
            }}
          >
            <Image
              style={{
                width: 64,
                height: 64,
              }}
              source={{ uri: currentSong.songImage }}
            />
          </Animated.View>
        )}
        <CollapsableContainer expanded={expanded}>
          <View style={{ height: 40 }}></View>
        </CollapsableContainer>
      </TouchableOpacity>
    </View>
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
    backgroundColor: global.spotify_grey,
    borderRadius: 5,
    marginBottom: 6,
    overflow: "hidden",
  },
});
