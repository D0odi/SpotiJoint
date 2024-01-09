import { Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import global from "../../../styles.js";

export default FormInput = ({
  control,
  rules = {},
  placeholder,
  name,
  label,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <>
          <Text
            style={[styles.label, { color: error ? "red" : global.font }]}
          >{`${error ? error.message : label}`}</Text>
          <TextInput
            style={[styles.input, { borderColor: error ? "red" : global.font }]}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        </>
      )}
      rules={rules}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    paddingBottom: 3,
    color: "#1b1b33",
  },
  input: {
    borderWidth: 1,
    borderColor: "#1b1b33",
    height: 35,
    borderRadius: 8,
    fontSize: 13,
    paddingLeft: 10,
    marginBottom: 13,
  },
});
