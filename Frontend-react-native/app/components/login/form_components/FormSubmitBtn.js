import { TouchableOpacity, StyleSheet, Text } from "react-native";
import global from "../../../styles";

export default FormSubmitBtn = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        style={{
          fontSize: 13,
          color: global.spotify_white,
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: global.spotify_grey,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
