import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colours from "../Config/colors";

export default function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  // requestPermission
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission for camera");
  };

  // handle press function
  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure  to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  // Select Image Function
  const selectImage = async () => {
    try {
      // try to insert an image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      // if there is an image, change image
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      // otherwise, display this error message
      console.log("Error reafind an image", error);
    }
  };

  // return the image input container
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {/* View Button */}
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colours.gray}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colours.lightGray,
    borderRadius: 25,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },

  image: {
    height: "100%",
    width: "100%",
  },
});
