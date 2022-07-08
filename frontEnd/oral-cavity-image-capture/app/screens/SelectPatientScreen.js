import React from "react";
import { View, StyleSheet, Text } from "react-native";

import TopPane from "../components/TopPane";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";

const patients = [1, 2, 3, 4, 5];

function SelectPatientScreen({ navigation, route }) {
  const thisUser = route.params.examiner;
  const back = () => {
    navigation.navigate("AddImagesScreen", { examiner: thisUser });
  };
  return (
    // full screen
    <View style={styles.Screen}>
      <TopPane
        text={"Select Patient"}
        leftIcon={"chevron-left"}
        rightIcon={"dots-two-horizontal"}
        onPressleft={back}
      />

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
        <SubmitButton
          // style={styles.submitButton}
          text="Add new patient"
          iconName={""}
          iconSize={18}
          onPress={() =>
            navigation.navigate("PatientRegisterScreen", {
              examiner: thisUser,
            })
          }
        />
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
  Screen: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 20,
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
