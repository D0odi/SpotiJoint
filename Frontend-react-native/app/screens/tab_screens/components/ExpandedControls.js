import LottieView from "lottie-react-native";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import global from "../../../styles.js";

export default ExpandedControls = () => {
  const [clickedHeart, setClickedHeart] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 7,
        }}
      >
        <TouchableOpacity
          style={{
            width: 36,
            marginLeft: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="play" size={35} color={global.spotify_green} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => setClickedHeart(!clickedHeart)}
            style={{
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name={clickedHeart ? "heart" : "heart-o"}
              size={23}
              color={global.spotify_green}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome
              name="paragraph"
              size={23}
              color={global.spotify_green}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 7,
          paddingRight: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: 50,
          }}
        ></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
