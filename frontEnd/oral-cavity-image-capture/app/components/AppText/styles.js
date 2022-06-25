import { StyleSheet, Platform } from "react-native";

import colours from "../Config/colors";

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colours.black,
    fontWeight: "bold",
  },
});

export default styles;
