import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import colors from "../config/colors";
import TopPane from "../components/TopPane";
import SubmitButton from "../components/SubmitButton";

import client from "../API/client";

//const patients = [1, 2, 3, 4, 5];

function SelectPatientScreen({ navigation, route }) {

  const thisUser = route.params.user;
  const [patients, setPatients] = React.useState([""]);
  const [patient, setPatient] = React.useState("");

  const getPatients = async () => {
    const res = await client
      .get("/patient/all", {
        
      })
      .catch((error) => {
        console.log(error.message);
      });
    try{
      setPatients(res.data.patients);
      console.log(patients.item.patient_age);
    }catch(error){
      console.log("unexpected: " + error);
    }
    
    
  };

  useEffect(() => {
    getPatients();
  }, []);
  
  const back = () => {
    navigation.navigate("AddImagesScreen", { user: thisUser });
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
        <SelectDropdown
          data={patients.patient_age}
          //placeholder={"hint"}
          defaultButtonText={"Select Patient"}
          renderDropdownIcon={() => {
            return <IconAntDesign name={"down"} style={{ paddingStart: 5 }} />;
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
            setPatient = selectedItem;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
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
              user: thisUser,
            })
          }
        />
        <View style={{ height: 10 }}></View>
        <SubmitButton text="Upload" 
        onPress={() => console.log(patient)} />
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
