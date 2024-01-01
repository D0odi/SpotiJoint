import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      exanbled
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: Dimensions.get("window").width,
  },
});

export default FormContainer;
