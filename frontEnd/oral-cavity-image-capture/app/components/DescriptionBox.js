import React from "react";
import { StyleSheet, TextInput } from "react-native";

const DescriptionBox = ({ isSecured, hint}) => {
  return (
    <TextInput
      secureTextEntry={isSecured}
      style={styles.input}
      padding={10}
      placeholder={hint}
      multiline={true}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,    
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#edeff2",
    paddingStart: 20,
    height: 100,
    marginBottom: 15,
  },
});

export default DescriptionBox;
