import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import client from "../api/client";
import global from "../styles";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default AvatarUplaod = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const params = route.params;
  const { name } = params.user;
  const { token } = params;
  const { setLoggedInUser, setToken } = useContext(AppContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      console.log("cancelled");
    }
  };

  const uploadImage = async (uri, generated) => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: uri,
      type: generated ? "image/png" : "image/jpeg",
    });

    try {
      const res = await client.post("/upload-profile-pic", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Auth: `JWT ${token}`,
        },
      });

      if (res.data.success) {
        const user = res.data.user;
        user.avatar = uri;
        setToken(token);
        setLoggedInUser(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "UserDomain",
              },
            ],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.avatarContainer,
            { borderStyle: image ? "solid" : "dashed" },
          ]}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                overflow: "hidden",
              }}
            />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: global.spotify_white,
              }}
            >
              Upload Image
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            uploadImage(`https://api.multiavatar.com/${name}.png`, true)
          }
        >
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
        {image ? (
          <TouchableOpacity
            onPress={() => uploadImage(image, false)}
            style={{
              backgroundColor: global.spotify_grey,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={styles.uplaodBtn}>Upload</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global.background,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    backgroundColor: global.spotify_grey,
    height: 160,
    width: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: global.spotify_white,
    alignItems: "center",
    justifyContent: "center",
  },
  uplaodBtn: {
    color: global.spotify_white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  skipBtn: {
    color: global.spotify_white_50,
    margin: 17,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.7,
  },
});
