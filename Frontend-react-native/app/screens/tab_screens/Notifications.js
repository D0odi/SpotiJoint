import { View, Text, StyleSheet } from "react-native";
import global from "../../styles";

export default Notifications = () => {
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: global.background,
  },
});
