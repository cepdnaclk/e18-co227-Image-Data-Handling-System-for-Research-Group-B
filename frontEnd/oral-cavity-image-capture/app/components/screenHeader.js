// headers like - Hey there, Welcome Back

import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

const screenHeader = ({ topLine, bottomLine }) =>  {
  return (

      <View style={styles.container}>
        <Text>{topLine}</Text>
        <Text style={styles.heading}>{bottomLine}</Text>
      </View>

  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
    
  },

  heading: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },

});

export default screenHeader;
