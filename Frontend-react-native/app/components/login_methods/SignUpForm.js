import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <FormContainer>
      <FormInput
        control={control}
        placeholder="Big Boy Billy Bob"
        name="name"
        label="Name"
      />
      <FormInput
        control={control}
        placeholder="BBBB"
        name="nickname"
        label="Nickname"
      />
      <FormInput
        control={control}
        placeholder="example@email.com"
        name="email"
        label="Email"
      />
      <FormInput
        control={control}
        placeholder="***********"
        name="password"
        label="Password"
      />
      <FormSubmitBtn label={"Sign up"} onPress={handleSubmit(onSubmit)} />
    </FormContainer>
  );
};

export default SignUpForm;
