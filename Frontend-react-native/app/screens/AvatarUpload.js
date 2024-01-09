import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import client from "../api/client";
import global from "../styles";

export default AvatarUplaod = (props) => {
  const [image, setImage] = useState(null);
  const { token, name, nickname, _id } = props.route.params;

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

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: image,
      type: "image/jpg",
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
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "UserDomain",
                params: {
                  imageUri: image,
                  name: name,
                  nickname: nickname,
                  token: token,
                  _id: _id,
                },
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
                opacity: 0.4,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Upload Image
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("UserDomain");
          }}
        >
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
        {image ? (
          <TouchableOpacity
            onPress={uploadImage}
            style={{
              backgroundColor: "rgba(27, 27, 51, 0.7)",
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
    backgroundColor: "rgba(128, 128, 97, 0.5)",
    height: 160,
    width: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "rgba(27, 27, 51, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  uplaodBtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  skipBtn: {
    margin: 17,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.7,
  },
});
