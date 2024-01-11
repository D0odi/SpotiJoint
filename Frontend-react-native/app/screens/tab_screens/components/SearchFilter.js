import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import global from "../../../styles";
import client from "../../../api/client";

export default SearchFilter = ({ input, users, token, _id }) => {
  const [friends, setFriends] = useState([]);
  const [friendsRequests, setFriendsRequests] = useState([]);
  const retrieveFriends = async () => {
    try {
      const response = await client.get("/friends", {
        headers: {
          Accept: "application/json",
          Auth: `JWT ${token}`,
        },
      });
      setFriends(response.data.data.friends);
      setFriendsRequests(response.data.data.friends_req_out);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const call = async () => {
      await retrieveFriends();
    };
    call();
    console.log(friendsRequests);
    console.log(friends);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: global.background }}>
      <FlashList
        data={users}
        renderItem={({ item }) => {
          if (
            input != "" &&
            !friendsRequests.includes(item._id) &&
            !friends.includes(item._id) &&
            item._id != _id
          ) {
            return <UserCard {...item} token={token} />;
          }
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};
