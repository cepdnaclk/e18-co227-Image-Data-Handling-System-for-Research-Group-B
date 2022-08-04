import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#0b0070",
  },
});

export default Header;
