// headers like - Hey there, Welcome Back

import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import Entypo from "react-native-vector-icons/AntDesign";

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
        
          <TouchableHighlight style={styles.leftIcon} onPress={onPressright}>
            <Entypo size={22} name={rightIcon} />
          </TouchableHighlight>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
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

  outerRightIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  outerLeftIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopPane;
