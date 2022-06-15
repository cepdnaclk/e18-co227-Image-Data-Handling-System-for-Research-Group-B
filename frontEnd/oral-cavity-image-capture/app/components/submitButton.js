// for the icon + login/register button

import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from "react-native-vector-icons/AntDesign";

// text - text to be distpalyed on the button
// pass iconName, iconSize if there is an icon
const submitButton = ({ text, iconName, iconSize }) => {
  return (
    <TouchableHighlight style={styles.btnLogin} underlayColor="#fff">
      <Text style={[styles.textLogin]}>
        {" "}
        <IconAntDesign size={iconSize} name={iconName} /> {text}{" "}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#8fa5e3",
    borderRadius: 30,
  },

  textLogin: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default submitButton;
