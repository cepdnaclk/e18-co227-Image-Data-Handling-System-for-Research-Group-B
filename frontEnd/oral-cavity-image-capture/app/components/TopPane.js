// headers like - Hey there, Welcome Back

import React from "react";
import { View, StyleSheet, Text } from "react-native";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const TopPane = ({ text, leftIcon, rightIcon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerLeftIcon}>
        <View style={styles.rightIcon}>
          <IconAntDesign size={15} name={leftIcon} />
        </View>
      </View>

      <View style={styles.outerText}>
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.outerRightIcon}>
        <View style={styles.leftIcon}>
          <Entypo size={16} name={rightIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },

  outerText: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  leftIcon: {
    backgroundColor: "#edeff2",
    height: 35,
    width: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  rightIcon: {
    backgroundColor: "#edeff2",
    height: 35,
    width: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  outerRightIcon: {
    marginEnd: "8%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  outerLeftIcon: {
    marginStart: "8%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopPane;
