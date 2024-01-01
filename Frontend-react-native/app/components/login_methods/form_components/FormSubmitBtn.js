import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default FormSubmitBtn = ({ label }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={{ fontSize: 18, color: "#fff" }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
