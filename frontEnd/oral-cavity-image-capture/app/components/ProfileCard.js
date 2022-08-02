import React from "react";
import { View, Image, StyleSheet } from "react-native";

import AppText from "../config/AppText";
import colours from "../config/colors";

export default function ProfileCard({ name, id, email, image }) {
  return (
    <View style={styles.all}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <Image style={styles.image} source={image} />
          <AppText style={styles.name}>{name}</AppText>
        </View>
        <View style={styles.detailsContainer}>
          <AppText style={styles.label}>Registration Number</AppText>
          <AppText style={styles.info}>{id}</AppText>
          <AppText style={styles.label}>Email</AppText>
          <AppText style={styles.info}>{email}</AppText>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  all: {
    alignItems: "center",
  },
  card: {
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    width: "100%",
    // backgroundColor: colours.lightGray,
    borderRadius: 15,
    overflow: "hidden",
  },
  profile: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 20,
    borderBottomColor: "#999",
    borderBottomWidth: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    paddingLeft: 10,
    paddingRight: 100,
    justifyContent: "center",
  },

  label: {
    paddingTop: 30,
    fontSize: 15,
    color: colours.gray,
    fontFamily: "Roboto",
  },
  info: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: colours.black,
  },

  name: {
    color: "#000",
    fontSize: 25,
    fontWeight: "500",
    paddingTop: 20,
    paddingLeft: 20,
  },
  submitButton: {
    width: "45%",
  },

  btnStyle: {
    height: 30,
  },
});
