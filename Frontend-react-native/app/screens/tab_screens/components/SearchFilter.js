import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import UserCard from "./UserCard";
import global from "../../../styles";

export default SearchFilter = ({ input, users, token }) => {
  return (
    <View style={{ flex: 1, backgroundColor: global.background }}>
      <FlashList
        data={users}
        renderItem={({ item }) => {
          if (
            input != "" &&
            item.name.toLowerCase().includes(input.toLowerCase())
          ) {
            console.log(item);
            return <UserCard {...item} token={token} />;
          }
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};
