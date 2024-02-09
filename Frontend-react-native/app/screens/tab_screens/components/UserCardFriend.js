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
import LottieView from "lottie-react-native";

const barWidth = Dimensions.get("window").width - 74;
export const UserCardFriend = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const offset = useRef(new Animated.Value(50)).current;

  const toggleAnimation = () => {
    Animated.timing(offset, {
      toValue: expanded ? 50 : 0,
      duration: 450,
      useNativeDriver: false,
    }).start();
  };

  const borderRadius = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [5, 20],
  });

  const barY = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -4],
  });

  const rythmOpacity = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
  });

  const rythmOffset = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -20],
  });

  const onItemPress = () => {
    toggleAnimation();
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleFriendSong = ({ songInfo, user_id }) => {
      if (!songInfo) {
        return setCurrentSong(null);
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
              flex: 2,
              justifyContent: "center",
              marginLeft: 7,
              marginRight: 44,
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
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              opacity: rythmOpacity,
              transform: [{ translateX: rythmOffset }],
            }}
          >
            <LottieView
              loop
              autoPlay
              style={{ width: 20, aspectRatio: 1 }}
              source={require("./assets/rythm.json")}
              speed={Math.random() * 0.5 + 0.3}
            />
          </Animated.View>
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
        <CollapsableContainer expanded={expanded}></CollapsableContainer>
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
