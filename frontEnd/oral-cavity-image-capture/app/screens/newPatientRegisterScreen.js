import React from "react";
import { View, StyleSheet, Alert, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import colors from "../config/colors";
import client from "../API/client";

// global variables
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//const selectGender = ["Female", "Male"];

// validationSchema
const validationSchema = Yup.object().shape({
  patient_name: Yup.string().required().label("Patient Name"),
  patient_district: Yup.string().required().label("District"),
  patient_age: Yup.number().required().label("Age"),
  patient_gender: Yup.string().required().label("Gender"),
  patient_contact_no: Yup.string()
    .required()
    .matches(phoneRegExp)
    .label("Contact Number"),
  patient_habbits: Yup.string().required().label("Habbits"),
  description: Yup.string().required().label("Description"),
});

function PatientRegisterScreen({ navigation, route }) {
  const imageUris = route.params.imageUris;
  const [selected, setSelected] = React.useState("");
  const selectGender = ["Female", "Male"];

  const successAlert = () =>
    Alert.alert(
      "Patient Added Successfully!",
      "You may now select the patient from the list.",

      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("SelectPatientScreen", {
              imageUris: imageUris,
            }),
        },
      ]
    );

  const notsuccessAlert = (msg) =>
    Alert.alert("Failed!", msg, [
      {
        text: "OK",
        onPress: () => navigation.navigate("PatientRegisterScreen"),
      },
    ]);

  const action = async (values, formikActions) => {
    console.log(values);
    const res = await client
      .post("/patient/add", {
        ...values,
      })
      .catch((error) => {
        //notsuccessAlert(res.data.message);
        console.log("error");
      });
    console.log(res.data);
    if (res.data.success) {
      successAlert();
    } else {
      notsuccessAlert(res.data.message);
    }
  };
  const back = () => {
    Alert.alert(
      "Are You Sure?",
      "Cancelling Patient Register may loss the entered data.",

      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("SelectPatientScreen", {}),
        },
        {
          text: "No",
          onPress: () => navigation.navigate("PatientRegisterScreen"),
        },
      ]
    );
  };

  return (
    // full screen
    <View style={styles.Screen}>
      {/* <TopPane
        text={"Add New Patient"}
        leftIcon={"chevron-left"}
        rightIcon={"dots-two-horizontal"}
        onPressleft={back}
      /> */}

      {/* <Text style={styles.header}>Add New Patient</Text> */}

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
        validationSchema={validationSchema}
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
              <View style={styles.FormContainer}>
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
                      // placeholder={"hint"}
                      defaultButtonText={"Select Gender"}
                      onSelect={(selectedItem, index) => {
                        values.patient_gender = selectedItem;
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <IconAntDesign
                            name={"down"}
                            style={{ paddingStart: 5 }}
                          />
                        );
                      }}
                      dropdownIconPosition={"left"}
                      buttonStyle={styles.dropdownBtnStyle}
                      buttonTextStyle={styles.dropdownBtnTxtStyle}
                      dropdownStyle={styles.dropdownDropdownStyle}
                      rowStyle={styles.dropdownRowStyle}
                      rowTextStyle={styles.dropdownRowTxtStyle}
                      selectedRowStyle={styles.dropdownSelectedRowStyle}
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
              </View>

              <View style={styles.ButtonContainer}>
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
  Screen: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  FormContainer: {
    flex: 1,
    marginBottom: 20,
    // paddingTop: 40,
    // height: "70%",
    // paddingBottom: 20,
    // backgroundColor: "red",
  },

  ButtonContainer: {
    width: "100%",
    bottom: "auto",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },

  selectOptionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginTop: "5%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdownBtnStyle: {
    borderColor: colors.ash,
    height: 50,
    width: "90%",
    borderRadius: 15,
    backgroundColor: colors.ash,
    marginBottom: 10,
  },
  dropdownBtnTxtStyle: {
    color: "#000",
    fontSize: 14,
    textAlign: "left",
    paddingStart: 15,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#edeff2",
    borderRadius: 12,
    height: 100,
  },
  dropdownRowStyle: {
    backgroundColor: "#edeff2",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: {
    color: "#000",
    textAlign: "center",
    // fontWeight: "bold",
  },
});
export default PatientRegisterScreen;
