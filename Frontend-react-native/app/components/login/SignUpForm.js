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
        const login_res = await client.post("/login", {
          email: data.email,
          password: data.password,
        });

        if (login_res && login_res.data.success) {
          const { user, token } = login_res.data;
          const navigateAction = CommonActions.navigate({
            name: "AvatarUpload",
            params: {
              token: token,
              username: user.username,
            },
          });
          navigation.dispatch(navigateAction);
        } else {
          console.log(login_res.data.message);
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
        name="username"
        label="Username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters long",
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
