// for the icon + textInput 

import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from "react-native-vector-icons/AntDesign";

// isSecured - pass true if a password field
const InputField = ({ isSecured, hint, iconName, iconSize }) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerFelx}>
        <View style={styles.iconFlex}>
          <IconAntDesign size={iconSize} name={iconName} />
        </View>

        <View style={styles.textinputFlex}>
          <TextInput
            secureTextEntry={isSecured}
            style={styles.input}
            padding={10}
            placeholder={hint}
          ></TextInput>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    
  },

  outerFelx: {
    marginEnd: 10,
    marginStart: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edeff2", // ash
    height: 50,
    width: "90%",
    borderRadius: 15,
    justifyContent: "center",
  },

  input: {
    width: "100%",
    borderRadius: 15,
  },

  // icon and tedxtinput is divided into flexes of 1:8 ratio in horizontal direction
  iconFlex: {
    flex: 1,
    alignItems: "center",
  },

  textinputFlex: {
    flex: 8,
    alignItems: "center",
  },
});

export default InputField;
