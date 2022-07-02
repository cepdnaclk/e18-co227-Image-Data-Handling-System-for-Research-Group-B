import React from "react";
import { View, Image, StyleSheet, Alert } from "react-native";

import AppText from "../config/AppText";
import colours from "../config/colors";
import SubmitButton from "./submitButton";
import client from "../API/client";

export default function RequestCard({ name, regno, email, image, reqid, requestScreen }) {

  const createAlert = () =>
    Alert.alert("Are You Sure?", "You will not be able to recover a request after rejection", [
      { text: "Yes, Reject", onPress: () => reject() },
      { text: "Cancel", onPress: () => console.log("OK Pressed") },
    ]);
  
  const accept = async () => {
    const res = await client.post(`/admin/accept/${reqid}`).catch((error) => {
      
      console.log('id2' + error.message);
    });
    
    client
        .get("/admin/get-requests")
        .then((data) => {
          requestScreen.setState({ responsedata: data }, () => {
            requestScreen.setState({ loading: false });
          });
        })
        .catch((error) => {
          console.log(error);
        });

  };

  const reject = async () => {
    const res = await client.post(`/admin/reject/${reqid}`).catch((error) => {
      
      console.log('id2' + error.message);
    });
    
    client
        .get("/admin/get-requests")
        .then((data) => {
          requestScreen.setState({ responsedata: data }, () => {
            requestScreen.setState({ loading: false });
          });
        })
        .catch((error) => {
          console.log(error);
        });

  };

  return (
    <View style={styles.all}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <Image style={styles.image} source={image} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.name}>{name}</AppText>
            <AppText style={[styles.regno]}>{regno}</AppText>
            <AppText style={styles.email}>{email}</AppText>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.butonsContainer}>
          <SubmitButton
            style={styles.submitButton}
            btnstyle={styles.btnStyle}
            text=" Accept"
            iconName={"checkcircleo"}
            iconSize={15}
            onPress={accept}
          />

          <SubmitButton
            style={styles.submitButton}
            btnstyle={styles.btnStyle}
            text=" Reject"
            iconName={"closecircleo"}
            iconSize={15}
            onPress={createAlert}
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
    marginBottom: 20,
    marginTop: 10,
  },

  card: {
    marginBottom: 15,
    paddingTop: 15,
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
    fontSize: 18,
    fontWeight: "600",
    color: colours.black,
  },

  regno: {
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
    height: 40,
    margin: 15,
  },
});
