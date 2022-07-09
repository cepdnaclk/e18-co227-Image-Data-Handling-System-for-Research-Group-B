import React from "react";
import { View, StyleSheet, Alert, Text } from "react-native";

import TopPane from "../components/TopPane";
import SubmitButton from "../components/SubmitButton";
import SelectOption from "../components/SelectOption";

const patients = [1, 2, 3, 4, 5];

function SelectPatientScreen({ navigation, route }) {
  const thisUser = route.params.user;
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
      {/* <TopPane
        text={"Select Patient"}
        leftIcon={"chevron-left"}
        rightIcon={"dots-two-horizontal"}
        onPressleft={back}
      /> */}

      <Text style={styles.header}>Select Patient</Text>

      <View style={styles.SelectOptionContainer}>
        <SelectOption
          hint={"Select Patient"}
          dataSet={patients}
          thisHeight={55}
          fontSize={15}
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
    paddingTop: 20,
  },

  SelectOptionContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  ButtonContainer: {
    bottom: "10%",
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
