import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import global from "../../../styles";
import client from "../../../api/client";

export default UserCardSearch = ({ name, nickname, _id, avatar, token }) => {
  const [clicked, setClicked] = useState(false);

  const sendFriendRequest = async () => {
    try {
      const res = await client.post(
        "/add-friend",
        {
          _id: _id,
        },
        {
          headers: {
            Accept: "application/json",
            Auth: `JWT ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    setClicked(true);
    sendFriendRequest();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        marginVertical: 3,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{
            width: 35,
            height: 35,
          }}
        />
      </View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: 13,
            color: global.spotify_white,
            fontWeight: "bold",
          }}
        >
          {name.length > 20 ? name.substring(0, 20) + "..." : name}
        </Text>
        <Text style={{ fontSize: 11, color: global.spotify_light_grey }}>
          {nickname.length > 20 ? nickname.substring(0, 20) + "..." : nickname}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          marginRight: 10,
        }}
        onPress={() => {
          handlePress();
        }}
        disabled={clicked}
        activeOpacity={0.4}
      >
        <View
          style={{
            backgroundColor: clicked
              ? global.spotify_white
              : global.spotify_grey,
            borderRadius: 10,
            padding: 6,
            borderWidth: 1.5,
            borderColor: clicked ? global.spotify_grey : global.spotify_white,
          }}
        >
          <Ionicons
            name={clicked ? "checkmark" : "person-add"}
            size={20}
            color={clicked ? global.spotify_black : global.spotify_white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
