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

import RequestCard from "../components/RequestCard";
import Screen from "../components/Screen";
import SubmitButton from "../components/submitButton";
import client from "../API/client";

class RequestScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responsedata: [],
      loading: true,
    };
  }

  componentDidMount() {
    client
        .get("/admin/get-requests")
        .then((data) => {
          this.setState({ responsedata: data }, () => {
            this.setState({ loading: false });
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 2}}>
        <>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.header}>Requests</Text>
          </View>
          <View style={{ flex: 3 }}>
            <FlatList
              data={this.state.responsedata.data}
              keyExtractor={this._keyExtractor}
              renderItem={({ item: requestItem }) => (
                <RequestCard
                  reqid={requestItem._id}
                  name={requestItem.username}
                  regno={requestItem.reg_no}
                  email={requestItem.email}
                  requestScreen={this}
                  image={require("../assets/Images/doctor.jpg")}
                />
              )}
            />
          </View>
        </>
        <View
          style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}
        >
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
    marginBottom: 15,
  },
});

export default RequestScreen;
