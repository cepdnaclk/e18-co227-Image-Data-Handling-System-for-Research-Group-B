import React from "react";
import { View, StyleSheet, Text } from "react-native";

import WelcomeHeader from "../components/screenHeader";
import InputField from "../components/InputField";
import SubmitButton from "../components/submitButton";

function RegisterScreen(props) {
  return (
    // full screen
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {/* container with the headers */}
      <View style={styles.topFlex}>
        <WelcomeHeader topLine="Hey there," bottomLine="Create an Account" />
      </View>

      {/* container with all the text input fields */}
      <View style={styles.inputFlex}>
        <InputField
          isSecured={false}
          iconName="user"
          iconSize={15}
          hint={"Full Name"}
        />
        <InputField
          isSecured={false}
          iconName="user"
          iconSize={15}
          hint={"Registration Number"}
        />
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
        <InputField
          isSecured={true}
          iconName="lock"
          iconSize={15}
          hint={"Confirm Password"}
        />
      </View>

      {/* the empty white space */}
      <View
        style={{
          flex: 0.5,
        }}
      ></View>

      {/* container with the register button and text below */}
      <View style={styles.bottomFlex}>
        <SubmitButton text="Request to Register" />

        <Text style={{ margin: 20 }}> or </Text>

        <Text>
          {" "}
          Already have an account?
          <Text style={{ color: "#c25ced" }}> Login </Text>
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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
});

export default RegisterScreen;
