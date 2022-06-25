import { Platform } from "react-native";

import colours from "./colors";

export default {
  colours,
  text: {
    color: colours.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
