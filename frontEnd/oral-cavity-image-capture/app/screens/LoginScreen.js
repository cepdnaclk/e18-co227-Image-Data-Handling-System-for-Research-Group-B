import React from "react";
import { View, StyleSheet, Text } from "react-native";

import WelcomeHeader from "../components/WelcomeHeader";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

function LoginScreen(props) {
  return (
    // full screen
    <View
      style={{
        flex: 1,
      }}
    >
      {/* container with the headers */}
      <View style={styles.topFlex}>
        <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" />
      </View>

      {/* container with all the text input fields */}
      <View style={styles.inputFlex}>
        <InputField
          isSecured={false}
          iconName="mail"
          iconSize={15}
          hint={"Email"}
        />
        <InputField
          isSecured={true}
          iconName="lock"
          iconSize={15}
          hint={"Password"}
        />

        <Text style={styles.recoverPwd}> Forgot your password? </Text>
      </View>

      {/* the empty white space */}
      <View
        style={{
          flex: 1,
        }}
      />

      {/* container with the login button and 'Don't have an account yet?' text */}
      <View style={styles.bottomFlex}>
        <SubmitButton text=" Login" iconName={"login"} iconSize={18} />

        <Text style={{ margin: 20 }}> or </Text>

        <Text>
          {" "}
          Don't have an account yet?{" "}
          <Text style={{ color: "#c25ced" }}> Register </Text>{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  topFlex: {
    marginTop: "5%",
    flex: 1,
  },

  inputFlex: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },

  recoverPwd: {
    color: "#a9abb0", // text color - ash
    textDecorationLine: "underline",
  },

});

export default LoginScreen;
