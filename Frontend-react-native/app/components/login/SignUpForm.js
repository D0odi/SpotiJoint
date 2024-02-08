import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { CommonActions } from "@react-navigation/native";
import { client } from "../../api/client";

const SignUpForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await client.post("/sign-up", { ...data });

      if (response.data.success) {
        console.log(data.email, data.password);
        const signInRes = await client.post("/login", {
          email: data.email,
          password: data.password,
        });

        if (signInRes.data.success) {
          const navigateAction = CommonActions.navigate({
            name: "AvatarUpload",
            params: {
              token: signInRes.data.token,
              name: signInRes.data.user.name,
            },
          });
          navigation.dispatch(navigateAction);
        } else {
          console.log(signInRes.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <FormInput
        control={control}
        placeholder="Big Boy Billy Bob"
        name="name"
        label="Name"
        rules={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters long",
          },
        }}
      />
      <FormInput
        control={control}
        placeholder="BBBB"
        name="nickname"
        label="Nickname"
        rules={{
          required: "Nickname is required",
          minLength: {
            value: 3,
            message: "Nickname must be at least 3 characters long",
          },
        }}
      />
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
      <FormSubmitBtn label={"Sign up"} onPress={handleSubmit(onSubmit)} />
    </FormContainer>
  );
};

export default SignUpForm;
