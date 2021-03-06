import React from "react";
import { View, Image, StyleSheet } from "react-native";

import AppText from "../config/AppText";
import colours from "../config/colors";
import SubmitButton from "./SubmitButton";

export default function ProfileCard({ name, id, email, image }) {
  return (
    <View style={styles.all}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <Image style={styles.image} source={image} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.name}>{name}</AppText>
            <AppText style={[styles.id]}>{id}</AppText>
            <AppText style={styles.email}>{email}</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  all: {
    alignItems: "center",
    
    
  },
  profile: {
    flexDirection: "row",
    marginLeft: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: colours.lightGray,
    overflow: "hidden",
  },

  card: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    width: "90%",
    backgroundColor: colours.lightGray,
    borderRadius: 15,
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  detailsContainer: {
    paddingLeft: 30,
    justifyContent: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    color: colours.black,
  },

  id: {
    paddingTop: 15,
    fontSize: 15,
    color: colours.black,
  },

  email: {
    color: colours.gray,
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "italic",
  },
  submitButton: {
    width: "45%",
  },

  btnStyle: {
    height: 30,
  },
});
