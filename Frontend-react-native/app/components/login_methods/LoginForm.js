import client from "../../api/client";
import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const LoginForm = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await client.post("/login", {
        ...data,
      });

      if (res.data.success) {
        console.log(res.data.token);
        navigation.navigate("UserProfile");
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
      <FormSubmitBtn label={"Login"} onPress={handleSubmit(onSubmit)} />
    </FormContainer>
  );
};

export default LoginForm;
