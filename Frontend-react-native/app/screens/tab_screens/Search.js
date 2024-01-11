import { View, Text, StyleSheet } from "react-native";
import global from "../../styles";
import React, { useState, useCallback } from "react";
import { TextInput } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import SearchFilter from "./components/SearchFilter";
import Ionicons from "react-native-vector-icons/Ionicons";
import client from "../../api/client";
import { set } from "react-hook-form";

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

export default Search = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const { token, _id } = route.params;

  const handleTextInputChange = (text) => {
    setInput(text);
    debouncedRetrieveUsers(text);
  };

  const debouncedRetrieveUsers = useCallback(
    debounce(async (text) => {
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
        },
      }
    );
    console.log(response.data.data);
    setUsers(response.data.data);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.search_bar, styles.shadow]}>
        <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
          <Ionicons name="search" size={20} color={global.background_darker} />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={global.font}
          style={styles.search_input}
          onChangeText={(text) => handleTextInputChange(text)}
        />
      </View>
      <SearchFilter input={input} users={users} token={token} _id={_id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  search_bar: {
    marginBottom: 10,
    height: 50,
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
