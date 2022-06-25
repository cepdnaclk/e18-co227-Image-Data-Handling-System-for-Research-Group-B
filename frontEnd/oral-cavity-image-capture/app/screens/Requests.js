import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Button } from "react-native";
import axios from "axios";

import RequestCard from "../components/RequestCard";
import Screen from "../components/Screen";
import client from "../API/client";

class Requests extends Component {

  // async function doGetRequest() {

  //   let res = await client.get('/admin/get-requests');
  
  //   let data = res.data;
  //   console.log(data);
  //   let requestsList = [
  //     {
  //       name: "Kushan",
  //       id: "001",
  //       email: "kushan@gmail.com",
  //       image: require("../assets/Images/doctor.jpg"),
  //     },
    
  //   ];
  // }
  
  // doGetRequest();

  constructor(props) {
    super(props);
    this.state = {
      responsedata: [],
        loading: true
    }
  }

    componentDidMount() {
    client.get('/admin/get-requests')
        .then(data => {
            this.setState({ responsedata: data }, () => {
                this.setState({ loading: false });
            });
        })
        .catch(error => {
            console.log(error);
        });

      }

render() {
  return (
    <Screen>
      <>
        <Text style={styles.header}>Requests</Text>

        <FlatList
          data={this.state.responsedata.data}
          keyExtractor={this._keyExtractor}
          renderItem={({ item: requestItem }) => (
            <RequestCard
              name={requestItem.username}
              id={requestItem.reg_no}
              email={requestItem.email}
              image={require("../assets/Images/doctor.jpg")}
            />
          )}
        />
      </>
      
    </Screen>
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

export default Requests;
