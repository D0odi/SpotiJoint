import { View, Text, StyleSheet } from "react-native";
import global from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../api/client";
import { CommonActions } from "@react-navigation/native";
import { set } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Profile = ({ navigation }) => {
  const { flushContext } = useContext(AppContext);
  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    socket.disconnect();
    AsyncStorage.clear();
    flushContext();
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: global.spotify_white,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: global.background,
  },
});
