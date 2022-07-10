import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageContainer from "../components/ImageContainer";
import IconButton from "../components/IconButton";
import TopPane from "../components/TopPane";

export default function AddImagesScreen({ navigation, route }) {
  const thisUser = route.params.user;
  const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    requestPermission();
  }, []);

  // requestPermission
  const requestPermission = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermision =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraPermission.granted === false)
      Alert.alert("Access denined for camera");
    if (mediaLibraryPermision.granted === false)
      Alert.alert("Access denined for gallery");
  };

  const PickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!image.cancelled) {
      setImageUris([...imageUris, image.uri]);
    }
  };

  const CaptureImage = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    if (!image.cancelled) {
      setImageUris([...imageUris, image.uri]);
    }
  };

  // remove image
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri != uri));
  };

  const back = () => {
    navigation.navigate("ProfileScreen", { user: thisUser });
  };

  const next = () => {
    navigation.navigate("SelectPatientScreen", {
      user: thisUser,
      images: imageUris,
    });
  };

  return (
    <View style={styles.Screen}>
      {/* <TopPane
        text={"Add image"}
        rightIcon={"arrowright"}
        onPressright={next}
      /> */}

      <Text style={styles.header}>Add Image</Text>
      <View style={styles.imageContainer}>
        <ImageContainer imageUris={imageUris} onRemoveImage={handleRemove} />
      </View>
      <View style={styles.ButtonContainer}>
        <IconButton iconName={"camera"} iconSize={20} onPress={CaptureImage} />
        <IconButton iconName={"images"} iconSize={20} onPress={PickImage} />
        <IconButton iconName={"arrow-right"} iconSize={20} onPress={next} />
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
    alignItems: "center",
    // backgroundColor: "green",
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
    // backgroundColor: "red",
  },
  ButtonContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  header: {
    marginTop: "5%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
