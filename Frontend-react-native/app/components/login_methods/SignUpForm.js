import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";

const SignUpForm = () => {
  return (
    <FormContainer>
      <FormInput placeholder={"Big Boy Billy Bob"} label={"Full Name"} />
      <FormInput placeholder={"BBBB"} label={"Nickname"} />
      <FormInput placeholder={"example@email.com"} label={"Email"} />
      <FormInput placeholder={"***********"} label={"Password"} />
      <FormSubmitBtn label={"Sign up"} />
    </FormContainer>
  );
};

export default SignUpForm;
