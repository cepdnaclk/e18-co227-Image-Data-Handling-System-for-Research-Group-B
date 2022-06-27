import React, { Component } from "react";
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      loading: true,
    };
  }

  componentDidMount() {
    client
      .get("/user/get-user")
      .then((data) => {
        this.setState({ userdata: data }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
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
              data={this.state.userdata.data}
              keyExtractor={this._keyExtractor}
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
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <SubmitButton
            // style={styles.submitButton}
            text=" Capture Image"
            iconName={"camerao"}
            iconSize={19}
            onPress={() => console.log("Sign Out")}
          />

          <SubmitButton
            // style={styles.submitButton}
            text=" Sign Out"
            iconName={"logout"}
            iconSize={18}
            onPress={() => console.log("Sign Out")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    
  },
});

export default Profile;
