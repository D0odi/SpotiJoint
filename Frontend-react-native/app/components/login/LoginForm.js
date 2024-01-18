import { CommonActions } from "@react-navigation/native";
import client from "../../api/client";
import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const LoginForm = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();

  // data
  const onSubmit = async () => {
    try {
      const res = await client.post("/login", {
        // ...data
        email: "1@gmail.com",
        password: "1234",
      });

      console.log(res.data);

      if (res.data.success) {
        const navigateAction = CommonActions.navigate({
          name: "UserDomain",
          params: {
            token: res.data.token,
            user: res.data.user,
          },
        });
        navigation.dispatch(navigateAction);
      } else {
        console.log(res.data.message);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <FormInput
        control={control}
        placeholder="example@email.com"
        name="email"
        label="Email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email must be valid",
          },
        }}
      />
      <FormInput
        control={control}
        placeholder="***********"
        name="password"
        label="Password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters long",
          },
        }}
      />
      {/* handleSubmit(onSubmit) */}
      <FormSubmitBtn label={"Login"} onPress={onSubmit} />
    </FormContainer>
  );
};

export default LoginForm;
