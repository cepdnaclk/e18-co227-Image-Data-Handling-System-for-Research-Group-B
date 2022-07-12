import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";

import colors from "../config/colors";
import SubmitButton from "../components/SubmitButton";

import client from "../API/client";

function SelectPatientScreen({ navigation, route }) {
  const thisUser = route.params.user;
  const imageUris = route.params.imageUris;
  const [progress, setProgress] = useState(0);
  const patients = [];
  const _ids = [];
  let patientIndex = null;

  const getPatients = async () => {
    const res = await client.get("/patient/all", {}).catch((error) => {
      console.log(error.message);
    });
    try {
      res.data.patients.map((item) => {
        patients.push(item.patient_name);
        _ids.push(item._id);
      });
    } catch (error) {
      console.log("unexpected: " + error);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getPatients();
    }
  }, [isFocused]);

  const Upload = async () => {
    console.log("called");
    const data = new FormData();
    imageUris.forEach((image, i) => {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      data.append("images[]", {
        uri: image,
        type: "image/jpeg",
        name: `_${i}.${ext}`,
      });
    });
    const _id = _ids[patientIndex];
    if (imageUris.length === 0) {
      Alert.alert(
        "No images to upload",
        "You didn't select or capture images to upload.\n Please add images to upload",

        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("AddImagesScreen", { user: thisUser });
            },
          },
        ]
      );
    } else if (patientIndex === null) {
      Alert.alert(
        "Please select patient",
        "Thank you for the your contribution.",

        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      );
    } else {
      try {
        const res = await client.post(
          `/upload/images/${_id}/${_id}/save`,
          data,
          {
            headers: {
              Accept: "Appication/json",
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: ({ loaded, total }) => {
              setProgress(loaded / total);
            },
          }
        );
        console.log(res.data.success);
        try {
          if (res.data.success) {
            Alert.alert(
              "Images uploaded Successfully!",
              "Thank you for the your contribution.",

              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("ProfileScreen", { user: thisUser });
                  },
                },
              ]
            );
          }
        } catch {}
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Unable to upload images Successfully!",
          "Unable to upload images succcessfully due to network error. Pleas try again",

          [
            {
              text: "OK",
              onPress: () => {},
            },
          ]
        );
      }
    }
  };

  const back = () => {
    navigation.navigate("AddimageScreen", { user: thisUser });
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
            color: "#000",
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
            patientIndex = index;
            console.log("selected patient is " + patientIndex);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        {progress ? (
          <View style={styles.progressBarContiner}>
            <Text style={styles.percentage}>
              {Math.floor(progress * 100)} %
            </Text>
            <Progress.Bar progress={progress} width={300} />
          </View>
        ) : null}
        {/* <Progress.Bar progress={progress} width={300} /> 
        <Progress.Pie progress={progress} size={100} />
        <Progress.Circle size={30} indeterminate={true} />
        <Progress.CircleSnail color={["red", "green", "blue"]} /> */}
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
              imageUris: imageUris,
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
    marginTop: 20,
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
  progressBarContiner: {
    marginTop: 50,
    alignItems: "center",
  },
  percentage: {
    fontSize: 25,
    paddingBottom: 10,
  },
});

export default SelectPatientScreen;
