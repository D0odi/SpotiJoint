import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  const { imageUri, name, nickname } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
        <View style={{ justifyContent: "center", padding: 10 }}>
          <Text style={styles.userName}>{name}</Text>
          <Text>{nickname}</Text>
        </View>
        {/* Add more user info here if needed */}
      </View>

      <DrawerItemList {...props} />
      {/* You can add additional DrawerItems here if needed */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 10,
    flexDirection: "row",
    // Add any additional styling you need
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // Add any additional styling for the avatar
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    // Add any additional styling for the username
  },
  // Add styles for other elements
});

export default CustomDrawerContent;
