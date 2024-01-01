import { Text, TextInput, StyleSheet } from "react-native";

export default FormInput = ({ placeholder, label }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    paddingBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1b1b33",
    height: 45,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 15,
  },
});
