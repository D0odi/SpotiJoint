import { Animated, StyleSheet, Text, View } from "react-native";
import global from "../../styles";

export default Header = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTransalteX = 40,
  rightHeaderTransalteY = -20,
  rightHeaderOpacity,
}) => {
  return (
    <View style={{ height: 60 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Animated.Text
          style={[
            styles.header,
            { transform: [{ translateX: leftHeaderTransalteX }] },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.header,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTransalteY }],
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.sub_header}>{subHeading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: global.spotify_white,
  },
  sub_header: {
    fontSize: 15,
    color: global.spotify_white,
    textAlign: "center",
  },
});
