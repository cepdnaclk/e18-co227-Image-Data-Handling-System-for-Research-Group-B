import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputsWithoutIcon = ({ isSecured, hint }) => {
  return (
    <TextInput
      secureTextEntry={isSecured}
      style={styles.input}
      padding={10}
      placeholder={hint}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#edeff2",
    paddingStart: 20,
    height: 45,
    marginBottom: 10,
  },
});

export default InputsWithoutIcon;
