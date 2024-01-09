import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";

export default SearchFilter = ({ input, data, setInput }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        renderItem={({ item }) => {
          if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View style={{ padding: 10 }}>
                <Text>{item.name}</Text>
              </View>
            );
          }
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};
