import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import UserCard from "./UserCard";

export default SearchFilter = ({ input, data, setInput }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        renderItem={({ item }) => {
          if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return <UserCard item={item} />;
          }
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};
