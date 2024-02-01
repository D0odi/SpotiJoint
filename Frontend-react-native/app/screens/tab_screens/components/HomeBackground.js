import React from "react";
import { StyleSheet, Text, Image } from "react-native";

export const HomeBackground = () => {
  return (
    <Image
      source={require("./assets/spotify_icon.png")} // Replace with the path to your image
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={15}
    ></Image>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
});
