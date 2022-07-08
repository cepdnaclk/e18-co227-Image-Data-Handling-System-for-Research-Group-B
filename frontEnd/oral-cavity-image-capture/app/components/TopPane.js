// headers like - Hey there, Welcome Back

import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import Entypo from "react-native-vector-icons/Entypo";

const TopPane = ({ text, leftIcon, rightIcon, onPressleft, onPressright }) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerLeftIcon}>
        <View style={styles.leftIcon}>
          <TouchableHighlight style={styles.leftIcon} onPress={onPressleft}>
            <Entypo size={27} name={leftIcon} />
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.outerText}>
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.outerRightIcon}>
        <View style={styles.rightIcon}>
          <TouchableHighlight style={styles.leftIcon} onPress={onPressright}>
            <Entypo size={27} name={rightIcon} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  text: {
    fontSize: 24,
    color: "black",
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
    borderRadius: 8,
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
