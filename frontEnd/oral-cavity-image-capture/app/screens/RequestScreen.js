import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  View,
} from "react-native";

import * as SecureStore from "expo-secure-store";

import RequestCard from "../components/RequestCard";
import SubmitButton from "../components/SubmitButton";
import client from "../API/client";
import client2 from "../API/client_refreshToken";

class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsedata: [],
      loading: true,
    };
  }

  deleteToken = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  logout = async () => {
    const res = await client2.post("/auth/logout", {}).catch((error) => {
      console.log("error: " + error.message);
    });
    console.log(res.data.message);
    this.deleteToken("access");
    this.deleteToken("refresh");
    this.props.navigation.navigate("LoginScreen");
  };

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
      <SafeAreaView style={{ flex: 1 }}>
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Requests</Text>
          </View>
          <View style={styles.infoContainer}>
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
        <View style={styles.buttonContainer}>
          <SubmitButton
            text=" Sign Out"
            iconName={"logout"}
            iconSize={18}
            onPress={this.logout}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
  },

  headerContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContainer: {
    flex: 6,
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RequestScreen;
