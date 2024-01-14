import { View, Text, StyleSheet } from "react-native";
import global from "../../styles";
import React, { useState, useCallback } from "react";
import { TextInput } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import Ionicons from "react-native-vector-icons/Ionicons";
import client from "../../api/client";
import { set } from "react-hook-form";
import UserCardSearch from "./components/UserCardSearch";

export default Search = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(Date.now());
  const { token, _id } = route.params;

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleTextInputChange = (text) => {
    setInput(text);
    debouncedRetrieveUsers(text);
  };

  const debouncedRetrieveUsers = useCallback(
    debounce(async (text) => {
      if (text === "") {
        setUsers([]);
        return;
      }
      await retrieveUsers(text);
    }, 500),
    [retrieveUsers]
  );

  const retrieveUsers = async (text) => {
    const response = await client.get(
      `/users?search=${encodeURIComponent(text)}`,
      {
        headers: {
          Accept: "application/json",
          Auth: `JWT ${token}`,
          Filter: "search-screen",
        },
      }
    );
    console.log("HERE ", response.data.filtered_users);
    const updatedUsers = response.data.filtered_users.map((user) => ({
      ...user,
      version: (user.version || 0) + 1,
    }));
    setUsers(updatedUsers);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.search_bar, styles.shadow]}>
        <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
          <Ionicons name="search" size={20} color={global.background_darker} />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={global.spotify_black}
          style={styles.search_input}
          onChangeText={(text) => handleTextInputChange(text)}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: global.background,
          marginBottom: 65,
        }}
      >
        <FlashList
          data={users}
          renderItem={({ item }) => {
            return <UserCardSearch {...item} token={token} />;
          }}
          keyExtractor={(item) => item._id + "_" + item.version}
          estimatedItemSize={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
    padding: 10,
  },
  search_bar: {
    marginBottom: 10,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignContent: "center",
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
