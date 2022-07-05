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
import * as Yup from "yup";

import AppFormField from "../components/AppFormField";
import TopPane from "../components/TopPane";
import InputsWithoutIcon from "../components/InputsWithoutIcon";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";
import DescriptionBox from "../components/DescriptionBox";
import Screen from "../components/Screen";

// global variables
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const selectGender = ["Female", "Male"];

// validationSchema
const validationSchema = Yup.object().shape({
  patientName: Yup.string().required().label("Patient Name"),
  district: Yup.string().required().label("District"),
  age: Yup.number().required().label("Age"),
  gender: Yup.string().required().label("Gender"),
  contactNumber: Yup.string()
    .required()
    .matches(phoneRegExp)
    .label("Contact Number"),
  habbits: Yup.string().required().label("Habitats"),
  description: Yup.string().required().label("Description"),
});

function Patient(props) {
  return (
    // full screen
    <Screen>
      {/* container with the top pane */}
      <View style={styles.topFlex}>
        <TopPane
          text={"Register New Patient"}
          leftIcon={"left"}
          rightIcon={"dots-two-horizontal"}
        />
      </View>

      {/* container with all the text input fields */}
      <Formik
        initialValues={{
          patientName: "",
          district: "",
          age: "",
          gender: "",
          contactNumber: "",
          habbits: "",
          description: "",
        }}
        onSubmit={console.log("Submitted")}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values }) => {
          const {
            patientName,
            district,
            age,
            gender,
            contactNumber,
            habbits,
            description,
          } = values;

          return (
            <>
              {/* <KeyboardAwareScrollView> */}
              {/* <View style={styles.inputFlex}> */}

              <KeyboardAwareScrollView>
                <AppFormField
                  value={patientName}
                  isSecured={false}
                  iconName="user"
                  iconSize={15}
                  hint={"Patient Name"}
                  name="patientName"
                />

                <AppFormField
                  value={district}
                  isSecured={false}
                  iconName="enviroment"
                  iconSize={15}
                  hint={"District"}
                  name="district"
                />

                <AppFormField
                  value={age}
                  isSecured={false}
                  iconName="solution1"
                  iconSize={15}
                  hint={"Age"}
                  name="age"
                  keyboadType="number"
                  // textContentType="number"
                />
                <View style={styles.selectOptionContainer}>
                  <SelectOption
                    hint={"Select Gender"}
                    dataSet={selectGender}
                    thisHeight={45}
                    fontSize={14}
                  />
                </View>

                <AppFormField
                  value={contactNumber}
                  isSecured={false}
                  iconName="phone"
                  iconSize={15}
                  hint={"Contact Number"}
                  name="contactNumber"
                />

                <AppFormField
                  value={habbits}
                  isSecured={false}
                  iconName="smileo"
                  iconSize={15}
                  hint={"Habbits"}
                  name="habbits"
                />

                <AppFormField
                  value={description}
                  isSecured={false}
                  iconName="database"
                  iconSize={15}
                  hint={"Description"}
                  name="description"
                />

                {/* <DescriptionBox isSecured={false} hint={"Description"} /> */}
                {/* </View> */}
                {/* </KeyboardAwareScrollView> */}

                {/* container with the button */}
                <View style={styles.bottomFlex}>
                  <SubmitButton text="Register Patient" />
                </View>
              </KeyboardAwareScrollView>
            </>
          );
        }}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topFlex: {
    justifyContent: "center",
    marginTop: "10%",
    marginBottom: "10%",
    flex: 2,
  },

  inputFlex: {
    // since a KeyboardAwareScroll is added, felx: 6 is no longer needed
    // flex: 6,
    justifyContent: "center",
    // alignItems: "center",
  },

  bottomFlex: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10%",
  },

  selectOptionContainer: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Patient;
