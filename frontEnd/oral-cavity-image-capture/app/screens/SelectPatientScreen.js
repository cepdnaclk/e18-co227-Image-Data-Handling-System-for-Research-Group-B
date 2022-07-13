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
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

import SubmitButton from "../components/SubmitButton";
import client from "../API/client";

function SelectPatientScreen({ navigation, route }) {
  const thisUser = route.params.user;
  const imageUris = route.params.imageUris;
  const [progress, setProgress] = useState(0);
  const [onSelect, setOnSelect] = useState(true);
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
        console.log(res.data);
        try {
          if (res.data.success) {
            Alert.alert(
              "Images uploaded Successfully!",
              "Thank you for the your contribution.",

              [
                {
                  text: "OK",
                  onPress: () => {
                    console.log("user " + thisUser.role)
                    // if(thisUser.role.includes(3) && thisUser.role.includes(1)){
                      
                    //   navigation.navigate("Requests_noSignout", { user: thisUser });
                    // }else{
                      navigation.navigate("ProfileScreen", { user: thisUser });
                  //  }
                    
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
      <StatusBar backgroundColor="#eee" barStyle="dark-content" />
      <View style={styles.viewContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <SelectDropdown
            data={patients}
            // defaultValueByIndex={1}
            // defaultValue={patients[patientIndex]}
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
          {progress ? (
            <View style={styles.progressBarContiner}>
              <Text style={styles.percentage}>
                Uploading...
                {Math.floor(progress * 100)} %
              </Text>
              <Progress.Bar progress={progress} width={300} />
            </View>
          ) : null}

          {onSelect ? (
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
          ) : null}
        </ScrollView>
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
    paddingTop: "20%",
  },
  ButtonContainer: {
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContiner: {
    marginTop: 50,
    alignItems: "center",
  },
  percentage: {
    fontSize: 25,
    paddingBottom: 10,
  },
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
});

export default SelectPatientScreen;
