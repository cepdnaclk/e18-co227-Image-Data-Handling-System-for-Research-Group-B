// *************** todo : ADD A VERTICAL SCROLL

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";

import TopPane from "../components/TopPane";
import InputsWithoutIcon from "../components/InputsWithoutIcon";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";
import DescriptionBox from "../components/DescriptionBox";

const gender = ["Female", "Male"];

function PatientRegisterScreen(props) {
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
          text={"Register New Patient"}
          leftIcon={"left"}
          rightIcon={"dots-two-horizontal"}
        />
      </View>

      {/* container with all the text input fields */}
      <KeyboardAwareScrollView>
        <View style={styles.inputFlex}>
          <InputsWithoutIcon isSecured={false} hint={"Patient Name"} />
          <InputsWithoutIcon isSecured={false} hint={"District"} />
          <InputsWithoutIcon isSecured={false} hint={"Age"} />
          <SelectOption
            hint={"Select Gender"}
            dataSet={gender}
            thisHeight={45}
            fontSize={14}
          />
          <InputsWithoutIcon isSecured={false} hint={"Contact Number"} />
          <InputsWithoutIcon isSecured={false} hint={"Habbits"} />
          <DescriptionBox isSecured={false} hint={"Description"} />
        </View>
      </KeyboardAwareScrollView>

      {/* container with the button */}
      <View style={styles.bottomFlex}>
        <SubmitButton text="Register Patient" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topFlex: {
    justifyContent: "center",
    marginTop: "5%",
    flex: 2,
  },

  inputFlex: {
    // since a KeyboardAwareScroll is added, felx: 6 is no longer needed
    // flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomFlex: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10%",
  },
});

export default PatientRegisterScreen;