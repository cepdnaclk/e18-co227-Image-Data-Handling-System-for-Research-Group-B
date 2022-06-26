import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import WelcomeHeader from "../components/welcomeHeader";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/submitButton";
import Screen from "../components/Screen";
import client from "../API/client"; 

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Full Name"),
  reg_no: Yup.string().required().label("Registration Number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null]),
});

function RegisterScreen(props) {

  const signUp = async (values, formikActions) => {
    console.log(values);
    const res = await client.post('/auth/signup', {
      ...values,
    })
    console.log(res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  }


  return (
    // full screen
    <Screen>
      {/* container with the headers */}
      <WelcomeHeader topLine="Hey there," bottomLine="Create an Account" />

      <View style={styles.all}>
        <View style={styles.topFlex}>
          <Formik
            initialValues={{
              username: "",
              reg_no: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={signUp}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <KeyboardAwareScrollView contentContainerStyle={{}}>
                  <AppFormField
                    isSecured={false}
                    iconName="user"
                    iconSize={15}
                    hint={"Full Name"}
                    name="username"
                  />

                  <AppFormField
                    isSecured={false}
                    iconName="user"
                    iconSize={15}
                    hint={"Registration Number"}
                    name="reg_no"
                  />

                  <AppFormField
                    isSecured={false}
                    iconName="mail"
                    iconSize={15}
                    hint={"Email"}
                    name="email"
                  />
                  <AppFormField
                    isSecured={true}
                    iconName="lock"
                    iconSize={15}
                    hint={"Password"}
                    name="password"
                  />
                  <AppFormField
                    isSecured={true}
                    iconName="lock"
                    iconSize={15}
                    hint={"Confirm Password"}
                    name="passwordConfirm"
                  />
                </KeyboardAwareScrollView>
                {/* container with the register button and text below */}
                <View style={styles.submitButton}>
                  <SubmitButton
                    style={styles.btnPosition}
                    text="Request to Register"
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.bottomFlex}>
          <Text style={{ margin: 10 }}> or </Text>

          <Text>
            Already have an account?
            <Text style={{ color: "#c25ced" }}> Login </Text>
          </Text>
        </View>
      </View>

      {/* </View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  all: {
    justifyContent: "space-between",
  },

  bottomFlex: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  submitButton: {
    marginTop: "25%",
    alignItems: "center",
  },

  topFlex: {
    justifyContent: "center",
    marginTop: "10%",
  },
});

export default RegisterScreen;
