import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import SelectList from "react-native-dropdown-select-list";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import TopPane from "../components/TopPane";
import InputsWithoutIcon from "../components/InputsWithoutIcon";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";
import DescriptionBox from "../components/DescriptionBox";
import AppFormField from "../components/AppFormField";
import colors from "../config/colors";
import client from "../API/client";

// global variables
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//const selectGender = ["Female", "Male"];

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

function PatientRegisterScreen({ navigation }) {
  const [selected, setSelected] = React.useState("");
  const selectGender = ["Female", "Male"];

  const successAlert = () =>
    Alert.alert(
      "Patient Added Successfully!",
      "You may now select the patient from the list.",

      [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
    );

  const notsuccessAlert = (msg) =>
    Alert.alert("Failed!", msg, [
      { text: "OK", onPress: () => navigation.navigate("RegisterScreen") },
    ]);

  const action = async (values, formikActions) => {
    console.log(values);
    const res = await client
      .post("/patient/add", {
        ...values,
      })
      .catch((error) => {
        //notsuccessAlert(res.data.message);
        console.log("eror");
      });
    console.log(res.data);
    if (res.data.success) {
      successAlert();
    } else {
      notsuccessAlert(res.data.message);
    }
  };

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
          text={"Add New Patient"}
          leftIcon={"left"}
          rightIcon={"dots-two-horizontal"}
        />
      </View>

      {/* container with all the text input fields */}
      {/* container with all the text input fields */}
      <Formik
        initialValues={{
          patient_name: "",
          patient_district: "",
          patient_age: "",
          patient_gender: "",
          patient_contact_no: "",
          patient_habbits: "",
          description: "",
        }}
        onSubmit={action}
        //validationSchema={validationSchema}
      >
        {({ handleSubmit, values }) => {
          const {
            patient_name,
            patient_district,
            patient_age,
            patient_gender,
            patient_contact_no,
            patient_habbits,
            description,
          } = values;

          return (
            <>
              <KeyboardAwareScrollView>
                <AppFormField
                  value={patient_name}
                  isSecured={false}
                  iconName="user"
                  iconSize={15}
                  hint={"Patient Name"}
                  name="patient_name"
                />

                <AppFormField
                  value={patient_district}
                  isSecured={false}
                  iconName="enviromento"
                  iconSize={15}
                  hint={"District"}
                  name="patient_district"
                />

                <AppFormField
                  value={patient_age}
                  isSecured={false}
                  iconName="solution1"
                  iconSize={15}
                  hint={"Age"}
                  name="patient_age"
                  keyboadType="number"
                  // textContentType="number"
                />
                <View style={styles.selectOptionContainer}>
                  <SelectDropdown
                    data={selectGender}
                    //placeholder={"hint"}
                    defaultButtonText={"Select Gender"}
                    renderDropdownIcon={() => {
                      return (
                        <IconAntDesign
                          name={"down"}
                          style={{ paddingStart: 5 }}
                        />
                      );
                    }}
                    dropdownIconPosition={"left"}
                    buttonTextStyle={{
                      color: "#bab5b6",
                      fontSize: 14,
                      textAlign: "left",
                      paddingStart: 15,
                    }}
                    buttonStyle={{
                      borderColor: colors.ash,
                      height: 50,
                      width: "90%",
                      borderRadius: 15,
                      backgroundColor: colors.ash,
                      marginBottom: 10,
                    }}
                    onSelect={(selectedItem, index) => {
                      values.patient_gender = selectedItem;
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>

                <AppFormField
                  value={patient_contact_no}
                  isSecured={false}
                  iconName="phone"
                  iconSize={15}
                  hint={"Contact Number"}
                  name="patient_contact_no"
                />

                <AppFormField
                  value={patient_habbits}
                  isSecured={false}
                  iconName="smileo"
                  iconSize={15}
                  hint={"Habbits"}
                  name="patient_habbits"
                />

                <AppFormField
                  value={description}
                  isSecured={false}
                  iconName="database"
                  iconSize={15}
                  hint={"Description"}
                  name="description"
                />
              </KeyboardAwareScrollView>

              <View style={styles.bottomFlex}>
                <SubmitButton
                  iconName={"pluscircleo"}
                  iconSize={18}
                  text=" Add New Patient"
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        }}
      </Formik>
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

  selectOptionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PatientRegisterScreen;
