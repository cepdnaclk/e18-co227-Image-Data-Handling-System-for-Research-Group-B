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

import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import SubmitButton from "../components/submitButton";
import client from "../API/client";

function Profile({ navigation }) {
  const [userDetails, setDetails] = useState([]);

  const getDetails = () => {
    client
      .get("/user/get-user")
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

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
          <FlatList
            data={userDetails.data}
            //keyExtractor={this._keyExtractor}
            renderItem={({ item: requestItem }) => (
              <ProfileCard
                name={requestItem.username}
                id={requestItem.reg_no}
                email={requestItem.email}
                image={require("../assets/Images/doctor.jpg")}
              />
            )}
          />
        </View>
      </>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <SubmitButton
          // style={styles.submitButton}
          text=" Capture Image"
          iconName={"camerao"}
          iconSize={18}
          onPress={() => navigation.navigate("LoginScreen")}
        />
        <SubmitButton
          // style={styles.submitButton}
          text=" Sign Out"
          iconName={"logout"}
          iconSize={18}
          onPress={() => navigation.navigate("LoginScreen")}
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
