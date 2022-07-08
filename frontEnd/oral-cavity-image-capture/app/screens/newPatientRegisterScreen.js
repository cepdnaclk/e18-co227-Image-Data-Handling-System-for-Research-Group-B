import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import TopPane from "../components/TopPane";
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
  patient_habbits: Yup.string().required().label("Habitats"),
  description: Yup.string().required().label("Description"),
});

function PatientRegisterScreen({ navigation, route }) {
  const thisUser = route.params.examiner;
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
  const back = () => {
    Alert.alert(
      "Cancell Patient Registering!",
      "You may loss the entered data.",

      [
        {
          text: "Cancel",
          onPress: () =>
            navigation.navigate("SelectPatientScreen", { examiner: thisUser }),
        },
        { text: "Continue", onPress: () => {} },
      ]
    );
  };

  return (
    // full screen
    <View style={styles.Screen}>
      <TopPane
        text={"Add New Patient"}
        leftIcon={"chevron-left"}
        rightIcon={"dots-two-horizontal"}
        onPressleft={back}
      />

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
    flex: 4,
    paddingTop: 20,
    paddingBottom: 20,
    // backgroundColor: "red",
  },
  ButtonContainer: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    // backgroundColor: "blue",
  },
  selectOptionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PatientRegisterScreen;