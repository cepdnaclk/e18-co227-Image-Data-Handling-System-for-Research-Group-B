import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

import colors from "../config/colors";
import TopPane from "../components/TopPane";
import SubmitButton from "../components/SubmitButton";

import client from "../API/client";

//const patients = [1, 2, 3, 4, 5];

function SelectPatientScreen({ navigation, route }) {
  const thisUser = route.params.user;
  const patients = [];
  let patient = "";

  const getPatients = async () => {
    const res = await client.get("/patient/all", {}).catch((error) => {
      console.log(error.message);
    });
    try {
      console.log(res.data.patients)
      res.data.patients.map(item => {
        patients.push(item.patient_name);
        
    });
      
    } catch (error) {
      console.log("unexpected: " + error);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("called")
      getPatients();
    }
  }, [isFocused]);

  const imageUris = route.params.images;

  const Upload = () =>
    Alert.alert(
      "Images uploaded Successfully!",
      "Thank you for the your contribution.",

      [
        {
          text: "OK",
          onPress: () => {
            console.log(imageUris),
              navigation.navigate("ProfileScreen", { user: thisUser });
          },
        },
      ]
    );
  const back = () => {
    navigation.navigate("AddImagesScreen", { user: thisUser });
  };
  return (
    // full screen
    <View style={styles.Screen}>
      {/* <Text style={styles.header}>Select Patient</Text> */}

      {/* container with all the text input fields */}
      <View style={styles.SelectOptionContainer}>
        <SelectDropdown
          data={patients}
          //placeholder={"hint"}
          defaultButtonText={"Select Patient"}
          renderDropdownIcon={() => {
            return <IconAntDesign name={"down"} style={{ paddingStart: 5 }} />;
          }}
          dropdownIconPosition={"right"}
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
          search={true}
          searchPlaceHolder={"Search Patient"}
          renderSearchInputLeftIcon={() => {
            return (
              <IconAntDesign name={"search1"} style={{ paddingStart: 5 }} />
            );
          }}
          onSelect={(selectedItem, index) => {
            patient = selectedItem;
            console.log("selected patient is " + patient);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      {/* container with the buttons */}
      <View style={styles.ButtonContainer}>
        <SubmitButton
          text="Add new patient"
          iconName={""}
          iconSize={18}
          onPress={() =>
            navigation.navigate("PatientRegisterScreen", {
              user: thisUser,
              images: imageUris,
            })
          }
        />
        <SubmitButton
          text="Upload"
          iconName={"upload"}
          iconSize={18}
          onPress={Upload}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 100,
  },

  SelectOptionContainer: {
    flex: 1,

    alignItems: "center",
  },
  ButtonContainer: {
    bottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: "10%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SelectPatientScreen;
