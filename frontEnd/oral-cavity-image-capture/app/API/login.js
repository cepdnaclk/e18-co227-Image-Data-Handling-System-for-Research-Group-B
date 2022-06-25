import { Alert } from "react-native";
import { Formik } from "formik";

import client from "../API/client";

function LoginFunction(props) {

    const buttonAlert = () =>
    Alert.alert(
      "Login Denied!",
      "This may be due to Wrong Credentials or Unaccepted signup Request. Please make sure you have signed up and try again later.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


  const login = async (values, formikActions) => {
    //console.log(values);
    const res = await client.post("/auth/login", {
      ...values,
    });
    console.log(res.data);
    if (res.data.success) {
      console.log(res.data.user.username);
    } else {
      buttonAlert();
    }
    //formikActions.resetForm(true);
    // formikActions.setSubmitting(false);
  };
}


export default LoginFunction;