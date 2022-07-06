import React from "react";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function IconButton({ iconName, iconSize, onPress }) {
  return (
    <TouchableHighlight style={styles.IconButton} onPress={onPress}>
      <Text style={styles.textLogin}>
        <FontAwesome5 name={iconName} size={iconSize} color="black" />
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  IconButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 30,
    backgroundColor: "#8fa5e3",
  },
});
