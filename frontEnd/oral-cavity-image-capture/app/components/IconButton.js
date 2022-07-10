import React from "react";

import { StyleSheet, TouchableHighlight } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function IconButton({ iconName, iconSize, onPress }) {
  return (
    <TouchableHighlight style={styles.IconButton} onPress={onPress}>
      <FontAwesome5 name={iconName} size={iconSize} color="#000" />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  IconButton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: "#8fa5e3",
  },
});
