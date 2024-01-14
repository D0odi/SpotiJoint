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
        backgroundColor: "white",
        borderRadius: 15,
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
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            color: global.spotify_black,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <Text style={{ fontSize: 11, color: global.spotify_black_light }}>
          {nickname}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          marginRight: 5,
        }}
        onPress={() => {
          handlePress(name);
        }}
        disabled={clicked}
        activeOpacity={0.4}
      >
        <View
          style={{
            backgroundColor: global.background,
            borderRadius: 10,
            padding: 6,
          }}
        >
          <Ionicons
            name={clicked ? "checkmark-outline" : "person-add"}
            size={20}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
