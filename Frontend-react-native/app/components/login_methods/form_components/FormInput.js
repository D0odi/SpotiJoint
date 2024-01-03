import { Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

export default FormInput = ({ control, placeholder, name, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
        <>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        </>
      )}
      rules={{
        required: {
          value: true,
          message: "Field is required!",
        },
      }}
    />
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
