import {
  TouchableOpacity,
  Touchable,
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
import LottieView from "lottie-react-native";
import ExpandedControls from "./ExpandedControls.js";

const barWidth = Dimensions.get("window").width - 74;
export const UserCardFriend = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [online, setOnline] = useState(false);
  const songName = useRef(null);
  const rythmAnimation = useRef(null);

  const offset = useRef(new Animated.Value(50)).current;

  const toggleAnimation = () => {
    Animated.timing(offset, {
      toValue: expanded ? 50 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const imageborderRadius = offset.interpolate({
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

  const animatedOpacity = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  const rythmOffset = offset.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -20],
  });

  const onItemPress = () => {
    if (currentSong) {
      toggleAnimation();
      setExpanded(!expanded);
    }
  };

  useEffect(() => {
    const handleFriendSong = ({ songInfo, user_id }) => {
      if (!songInfo) {
        return setCurrentSong(null);
      }
      if (user_id === item._id) {
        setOnline(true);
        console.log(songInfo);
        if (currentSong === null || songName.current != songInfo.name) {
          console.log("Song changed: ", songInfo.name, songName.current);
          setCurrentSong(songInfo);
          songName.current = songInfo.name;
          rythmAnimation.current?.reset();
          rythmAnimation.current?.play();
        } else {
          console.log("Song updated: ", songInfo.progress_ms);
          setCurrentSong((prev) => ({
            ...prev,
            progress_ms: songInfo.progress_ms,
          }));
          if (!songInfo.is_playing && rythmAnimation.current) {
            rythmAnimation.current?.pause();
          } else {
            rythmAnimation.current?.play();
          }
        }
      }
    };
    socket.on("friends-song", handleFriendSong);
    return () => {
      socket.off("friends-song", handleFriendSong);
      setOnline(false);
    };
  }, [socket]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.friend}
        onPress={onItemPress}
      >
        <View
          style={{
            width: 5.5,
            aspectRatio: 1,
            backgroundColor: online ? global.spotify_green : "grey",
            position: "absolute",
            left: 6,
            top: 6,
            borderRadius: 10,
            zIndex: 2,
          }}
        />
        {currentSong && (
          <Animated.View
            style={[
              styles.bar,
              { opacity: animatedOpacity, transform: [{ translateY: barY }] },
            ]}
          >
            <Progress.Bar
              progress={currentSong.progress_ms / currentSong.duration_ms}
              height={2}
              width={barWidth - 16}
              color={global.spotify_light_grey}
              borderWidth={0}
            />
          </Animated.View>
        )}
        <View style={styles.friend_info}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.friend_info_text}>
            <Text style={[styles.text, { fontSize: 13 }]}>{item.username}</Text>
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
          {currentSong && (
            <Animated.View
              style={[
                styles.actionIcon,
                {
                  opacity: rythmOpacity,
                  transform: [{ translateX: rythmOffset }],
                },
              ]}
            >
              <LottieView
                loop
                ref={rythmAnimation}
                style={{ width: 20, aspectRatio: 1 }}
                source={require("./assets/rythm.json")}
                speed={0.4}
              />
            </Animated.View>
          )}
        </View>
        {currentSong && (
          <Animated.Image
            style={[
              styles.song_image,
              {
                opacity: animatedOpacity,
                transform: [{ translateX: offset }],
                borderTopLeftRadius: imageborderRadius,
                borderBottomLeftRadius: imageborderRadius,
              },
            ]}
            source={{ uri: currentSong.songImage }}
          />
        )}
        <CollapsableContainer expanded={expanded}>
          <ExpandedControls />
        </CollapsableContainer>
      </TouchableOpacity>
    </View>
  );
};

const dummyPics = [
  "https://i.scdn.co/image/ab67616d00001e024fe0b5be5a42d53d5bc645f7",
  "https://i.scdn.co/image/ab67616d00001e024fe0b5be5a42d53d5bc645f7",
  "https://i.scdn.co/image/ab67616d00001e024fe0b5be5a42d53d5bc645f7",
  "https://i.scdn.co/image/ab67616d00001e024fe0b5be5a42d53d5bc645f7",
  "https://i.scdn.co/image/ab67616d00001e024fe0b5be5a42d53d5bc645f7",
];

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
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
  bar: {
    position: "absolute",
    top: 64,
    left: 7,
  },
  friend_info: {
    margin: 7,
    marginTop: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  friend_info_text: {
    flex: 2,
    justifyContent: "center",
    marginLeft: 7,
    marginRight: 44,
  },
  actionIcon: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  song_image: {
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    width: 65,
    height: 65,
  },
});
