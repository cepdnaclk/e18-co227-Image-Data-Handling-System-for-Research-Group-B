import React from "react";
import { View, StyleSheet, Text } from "react-native";

import TopPane from "../components/TopPane";
import InputsWithoutIcon from "../components/InputsWithoutIcon";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";

const patients = [1, 2, 3, 4, 5];

function SelectPatientScreen(props) {
  return (
    // full screen
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {/* container with the top pane */}
      <View style={styles.topFlex}>
        <TopPane
          text={"Select Patient"}
          leftIcon={"left"}
          rightIcon={"dots-two-horizontal"}
        />
      </View>

      {/* container with all the text input fields */}
      <View style={styles.inputFlex}>
        <SelectOption
          hint={"Select Patient"}
          dataSet={patients}
          thisHeight={55}
          fontSize={15}
        />
      </View>

      <View
        style={{
          flex: 4,
        }}
      ></View>

      {/* container with the buttons */}
      <View style={styles.bottomFlex}>
        <SubmitButton text="Register New Patient" />
        <View style={{ height: 10 }}></View>
        <SubmitButton text="Upload" />
      </View>

      {/* <View style={styles.bottomFlex}>
        <SubmitButton text="Register Patient" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  topFlex: {
    alignItems: "center",
    marginTop: "10%",
    flex: 1,
    justifyContent: "flex-end",
  },

  inputFlex: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomFlex: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
});

export default SelectPatientScreen;
