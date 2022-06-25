import React from "react";
import { View, Image, StyleSheet } from "react-native";

import AppText from "../Config/AppText";
import colours from "../Config/colors";

export default function Cards({ title, subTitle, image }) {
  return (
    <View style={styles.cards}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleStyle}>{title}</AppText>
        <AppText
          style={[styles.subTitleStyle, { fontSize: 18, color: colours.black }]}
        >
          {subTitle}
        </AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cards: {
    backgroundColor: colours.white,
    borderRadius: 15,
    overflow: "hidden",
    // margiBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },

  detailsContainer: {
    padding: 20,
    backgroundColor: colours.lightGreen,
  },

  titleStyle: {
    fontSize: 20,
    color: colours.primary,
  },

  subTitleStyle: {
    fontSize: 20,
    color: colours.secondary,
  },
});
