import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

import SubmitButton from "../components/SubmitButton";
import client from "../API/client";

function SelectPatientScreen({ navigation, route }) {
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
        "You didn't select or capture images to upload. Please add images to upload.",

        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("AddImagesScreen");
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
        console.log(res.data);
        try {
          if (res.data.success) {
            setProgress(0),
              Alert.alert(
                "Images uploaded Successfully!",
                "Thank you for the your contribution.",

                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("Home");
                    },
                  },
                ]
              );
          }
        } catch {}
      } catch (error) {
        console.log(error);
        setProgress(0);
        Alert.alert(
          "Unable to upload images Successfully!",
          "Unable to upload images succcessfully due to network error. Pleas try again",

          [
            {
              text: "OK",
              onPress: () => {
                getPatients();
                console.log(patients);
              },
            },
          ]
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
      <View style={styles.viewContainer}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.dropdownContainer}>
            <SelectDropdown
              data={patients}
              onSelect={(selectedItem, index) => {
                patientIndex = index;
                console.log(selectedItem, index);
              }}
              defaultButtonText={"Select patient"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#000"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdownDropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
              selectedRowStyle={styles.dropdownSelectedRowStyle}
              search
              searchInputStyle={styles.dropdownsearchInputStyleStyle}
              searchInputTxtColor={"#fff"}
              searchPlaceHolder={"Search here"}
              searchPlaceHolderColor={"#F8F8F8"}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={"search"} color={"#FFF"} size={18} />;
              }}
              onFocus={() => {
                // setOnSelect(false);
              }}
              onBlur={() => {
                // setOnSelect(true);
              }}
            />
            {/* {progress ? (
              <View style={styles.progressBarContiner}>
                <Text style={styles.percentage}>
                  Uploading...
                  {Math.floor(progress * 100)} %
                </Text>
                <Progress.Bar progress={progress} width={300} />
              </View>
            ) : null} */}
          </View>
          {/* <KeyboardAwareScrollView> */}
          <View style={styles.ButtonContainer}>
            {progress ? (
              <View style={styles.progressBarContiner}>
                <Text style={styles.percentage}>
                  Uploading...
                  {Math.floor(progress * 100)} %
                </Text>
                <Progress.Bar progress={progress} width={300} />
              </View>
            ) : null}
            <SubmitButton
              text="Add new patient"
              iconName={""}
              iconSize={18}
              onPress={() =>
                navigation.navigate("PatientRegisterScreen", {
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
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveAreaViewContainer: { flex: 1 },
  viewContainer: { flex: 1 },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingTop: 30,
  },
  dropdownContainer: { flex: 1 },
  dropdownBtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#edeff2",
    borderRadius: 8,
  },
  dropdownBtnTxtStyle: {
    color: "#000",
    textAlign: "left",
    // paddingLeft: 30,
    // fontWeight: "bold",
    fontSize: 13,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#edeff2",
    borderRadius: 12,
    height: "50%",
  },
  dropdownRowStyle: {
    backgroundColor: "#edeff2",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: {
    color: "#000",
    textAlign: "left",
    // paddingLeft: 30,
    // fontWeight: "bold",
  },
  dropdownSelectedRowStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
  dropdownsearchInputStyleStyle: {
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
  },
  progressBarContiner: {
    alignItems: "center",
    marginBottom: 20,
  },
  percentage: {
    fontSize: 12,
    paddingBottom: 10,
  },
  ButtonContainer: {
    height: 200,
    bottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectPatientScreen;
