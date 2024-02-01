import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import TextTicker from "react-native-text-ticker";
import global from "../../../styles.js";
export const UserCardFriend = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.friend}
        onPress={() => setExpanded(!expanded)}
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
              Puk pukileo ss Puk pukileo ssPuk pukileo ssPuk pukileo ssPuk
              pukileo ssPuk pukileo ssPuk pukileo ssPuk pukileo ssPuk pukileo
              ssPuk pukileo ssPuk pukileo ss
            </TextTicker>
          </View>
        </View>

        {expanded && <View style={{ height: 100 }}></View>}
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
    padding: 7,
    backgroundColor: global.spotify_grey,
    borderRadius: 5,
    marginBottom: 6,
  },
});
