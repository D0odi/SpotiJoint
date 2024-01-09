import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default FormSubmitBtn = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ fontSize: 13, color: "#fff" }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 39,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
