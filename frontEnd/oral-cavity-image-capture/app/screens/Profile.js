import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import AppText from "../Config/AppText";
import colours from "../Config/colors";
import SubmitButton from "../components/submitButton";
import Screen from "../components/Screen";

export default function Profile({ name, id, email, image }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.profilePage}>
        <View style={styles.cards}>
          <Image style={styles.image} source={image} />
          <View style={styles.textContainer}>
            <AppText style={styles.titleStyle}>{name}</AppText>
            <AppText style={styles.id}>{id}</AppText>
            <AppText style={styles.email}>{email}</AppText>
          </View>
        </View>
      </View>

      {/* admin details text container */}
      <View style={styles.textContainer2}>
        <Text style={styles.text}>Something here</Text>
      </View>

      <View style={styles.button}>
        <SubmitButton
          // style={styles.submitButton}
          text=" Capture Image"
          iconName={"camerao"}
          iconSize={18}
          onPress={() => console.log("Check Request")}
        />
        <SubmitButton
          // style={styles.submitButton}
          text=" Sign Out"
          iconName={"logout"}
          iconSize={18}
          onPress={() => console.log("Sign Out")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cards: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: colours.lightGray,
    overflow: "hidden",
    alignContent: "center",
    marginTop: 15,
  },
  profilePage: {
    alignItems: "center",
  },

  email: {
    color: colours.lightGray,
    fontSize: 15,
    fontStyle: "italic",
  },

  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },

  textContainer: {
    padding: 20,
    backgroundColor: colours.gray,
  },

  titleStyle: {
    fontSize: 20,
    color: colours.white,
  },

  id: {
    paddingTop: 15,
    fontSize: 15,
    color: colours.lightGray,
  },

  screen: {
    flex: 1,
  },

  button: {
    // flex: 1,
    // backgroundColor: colours.danger,
    // position: "absolute",
    width: "100%",
    height: "20%",
    alignItems: "center",
    marginTop: "10%",
  },

  text: {
    marginTop: 35,
    textAlign: "center",
  },
  textContainer2: {
    // flex: 0.5,
    height: "30%",
    width: "100%",

    // backgroundColor: colours.lightGreen,
  },
  // textContainer3: {
  //   // flex: 0.5,
  //   width: "100%",
  //   height: "20%",
  //   backgroundColor: colours.danger,
  // },
});
