import { CommonActions } from "@react-navigation/native";
import { client, login } from "../../api/client";
import FormContainer from "./form_components/FormContainer";
import FormInput from "./form_components/FormInput";
import FormSubmitBtn from "./form_components/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();
  const { setLoggedInUser, setToken } = useContext(AppContext);

  // data
  const onSubmit = async (data) => {
    try {
      const { user, token, err } = login(...data);
      console.log(`LOGIN: ${user}`);

      if (!err) {
        setLoggedInUser(user);
        setToken(token);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "UserDomain" }],
          })
        );
      } else {
        console.log(err);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit1 = async (email) => {
    console.log(`LOGIN: ${email}`);
    const password = "1234";
    try {
      const res = await client.post("/login", {
        // ...data
        email,
        password,
      });

      console.log("LOGIN: ", res.data);
      const { user, token, success } = res.data;

      if (success) {
        setLoggedInUser(user);
        setToken(token);
        const storage_res = await AsyncStorage.multiSet([
          ["time_stamp", Date.now().toString()],
          ["token", res.data.token],
          ["email", email],
          ["password", password],
        ]);
        if (!storage_res) {
          console.log("storage success");
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "UserDomain",
              },
            ],
          })
        );
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
      <FormSubmitBtn
        label={"DooDik"}
        onPress={() => onSubmit1("d@gmail.com")}
      />
      <FormSubmitBtn
        label={"test1"}
        onPress={() => onSubmit1("t1@gmail.com")}
      />
      <FormSubmitBtn
        label={"test2"}
        onPress={() => onSubmit1("t2@gmail.com")}
      />
    </FormContainer>
  );
};

export default LoginForm;
