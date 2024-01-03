import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <FormContainer>
      <FormInput
        placeholder="example@gmail.com"
        name="email"
        control={control}
        label="Email"
      />
      <FormInput
        placeholder="************"
        name="password"
        control={control}
        label="Password"
      />
      <FormSubmitBtn label={"Login"} onPress={handleSubmit(onSubmit)} />
    </FormContainer>
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

export default LoginForm;
