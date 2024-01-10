import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default UserCard = ({ name, nickname, _id, avatar }) => {
  const handlePress = (_id) => {
    console.log(_id);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 20, height: 20 }}></View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text>{name}</Text>
        <Text>{nickname}</Text>
      </View>
      <View style={{ borderRadius: 30 }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => {
            handlePress(_id);
          }}
        >
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
