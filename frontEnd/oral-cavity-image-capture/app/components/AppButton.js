import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colours from "../Config/colors";

export default function AppButton({ title, onPress, colour = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colours[colour] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.primary,
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colours.white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

// export default AppButton;
