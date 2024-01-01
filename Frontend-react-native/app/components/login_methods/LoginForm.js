import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";

const LoginForm = () => {
  return (
    <FormContainer>
      <FormInput placeholder={"example@gmail.com"} label={"Email"} />
      <FormInput placeholder={"************"} label={"Password"} />
      <FormSubmitBtn label={"Login"} />
    </FormContainer>
  );
};

export default LoginForm;
