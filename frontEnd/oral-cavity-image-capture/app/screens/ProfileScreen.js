import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  View,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import SubmitButton from "../components/SubmitButton";
import client1 from "../API/client";
import client2 from "../API/client_refreshToken";

function Profile({ navigation, route }) {
  const thisUser = route.params.user;

  async function deleteToken(key) {
    await SecureStore.deleteItemAsync(key);
  }

  const logout = async () => {
    const res = await client2.post("/auth/logout", {}).catch((error) => {
      console.log("error: " + error.message);
    });
    console.log(res.data.message);
    deleteToken("access");
    deleteToken("refresh");
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.header}>Profile</Text>
        </View>
        <View style={{ flex: 2 }}>
          <ProfileCard
            name={thisUser.username}
            id={thisUser.reg_no}
            email={thisUser.email}
            image={require("../assets/Images/doctor.jpg")}
          />
        </View>
      </>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <SubmitButton
          // style={styles.submitButton}
          text="Add Image"
          iconName={"camerao"}
          iconSize={18}
          onPress={() =>
            navigation.navigate("AddImagesScreen", {
              examiner: thisUser,
            })
          }
        />
        <SubmitButton
          // style={styles.submitButton}
          text=" Sign Out"
          iconName={"logout"}
          iconSize={18}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Profile;
