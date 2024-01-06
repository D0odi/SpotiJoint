import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import client from "../../api/client";

const SignUpForm = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await client
      .post("/signup", {
        ...data,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
