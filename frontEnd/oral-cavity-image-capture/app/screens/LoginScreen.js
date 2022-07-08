import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";

import WelcomeHeader from "../components/welcomeHeader";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import Screen from "../components/Screen";
import client from "../API/client";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
});

function LoginScreen({ navigation }) {
  async function saveToken(key, val) {
    await SecureStore.setItemAsync(key, val);
  }

  const createAlert = (msg) =>
    Alert.alert("Login Denied", msg, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const login = async (values, formikActions) => {
    formikActions.resetForm();
    // formikActions.setSubmitting(false);
    
    const res = await client
      .post("/auth/login", {
        ...values,
      })
      .catch((error) => {
        return createAlert(error.message);
        console.log("error " + error.message);
      });
    
    if (res.data.success) {
      saveToken("access", res.data.access_token);
      saveToken("refresh", res.data.refresh_token);

      if (res.data.user.role.includes(3)) {
        
        navigation.navigate("ProfileScreen", {
          user: res.data.user,

        });
      } else {
        
        navigation.navigate("RequestScreen");
      }
    } else {
      createAlert(res.data.message);
    }
  };

  const [isSecured, setSecured] = useState(true);

  return (
    // full screen
    <Screen style={styles.screen}>
      <View style={{ marginTop: 20 }}>
        <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" />
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={login}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, handleChange }) => {
          const { email, password } = values;

          return (
            <>
              <View style={styles.inputFlex}>
                {/* container with all the text input fields */}

                {/* email input*/}
                <AppFormField
                  value={values.email}
                  handleChange={handleChange("email")}
                  name="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  hint={"Email"}
                  iconName="mail"
                  iconSize={15}
                  isSecured={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}

                {/* password input */}
                <AppFormField
                  value={password}
                  handleChange={handleChange("password")}
                  name="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  hint="Password"
                  iconName="lock"
                  iconSize={15}
                  isSecured={isSecured}
                  password={true}
                  showImage={<Text>Show</Text>}
                  textContentType="password"
                />

                {/* forgot password */}
                <Text style={styles.recoverPwd}> Forgot your password? </Text>
              </View>

              <View style={{ height: "25%" }}></View>

              <View style={styles.bottomFlex}>
                <SubmitButton
                  text=" Login"
                  iconName={"login"}
                  iconSize={18}
                  onPress={handleSubmit}
                />

                <Text style={{ margin: 10 }}> or </Text>

                <View style={styles.reg}>
                  <Text>Don't have an account yet?</Text>

                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("RegisterScreen")}
                  >
                    <Text style={styles.regTouch}> Register </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  inputFlex: {
    marginTop: 30,
    marginBottom: 10,
  },

  bottomFlex: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },

  recoverPwd: {
    color: "#a9abb0", // text color - ash
    textDecorationLine: "underline",
    marginTop: 15,
    textAlign: "center",
  },

  reg: {
    flexDirection: "row",
  },

  regTouch: {
    color: "#c25ced",
    marginLeft: 5,
  },
});

export default LoginScreen;
