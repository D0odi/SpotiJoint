import { View, Text, StyleSheet } from "react-native";
import global from "../../styles";

export default Search = () => {
  return (
    <View style={styles.container}>
      <Text>Search screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: global.background,
  },
});
