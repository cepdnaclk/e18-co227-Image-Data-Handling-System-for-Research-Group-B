import React from "react";
import { View, Image, StyleSheet } from "react-native";

import AppText from "../Config/AppText";
import colours from "../Config/colors";
import SubmitButton from "./submitButton";

export default function RequestCard({ name, id, email, image }) {
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

        {/* Buttons */}
        <View style={styles.butonsContainer}>
          <SubmitButton
            style={styles.submitButton}
            btnstyle={styles.btnStyle}
            text="Accept"
            iconName={"checkcircleo"}
            iconSize={15}
            onPress={() => console.log("Accepted")}
          />

          <SubmitButton
            style={styles.submitButton}
            btnstyle={styles.btnStyle}
            text=" Reject"
            iconName={"checkcircleo"}
            iconSize={15}
            onPress={() => console.log("Rejected")}
          />
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

  butonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  card: {
    marginBottom: 15,
    paddingTop: 15,
    justifyContent: "center",
    width: "85%",
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
    fontSize: 18,
    fontWeight: "600",
    color: colours.black,
  },

  id: {
    paddingTop: 15,
    fontSize: 13,
    color: colours.black,
  },

  email: {
    color: colours.gray,
    fontSize: 12,
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