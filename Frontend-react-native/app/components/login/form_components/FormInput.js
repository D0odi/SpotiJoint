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
            style={[
              styles.label,
              { color: error ? global.spotify_green : global.spotify_white },
            ]}
          >{`${error ? error.message : label}`}</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: error
                  ? global.spotify_green
                  : global.spotify_white,
              },
            ]}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholderTextColor={global.spotify_white_50}
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
    fontSize: 11,
    paddingBottom: 3,
  },
  input: {
    color: global.spotify_white,
    borderWidth: 1,
    height: 35,
    borderRadius: 8,
    fontSize: 13,
    paddingLeft: 10,
    marginBottom: 13,
  },
});
