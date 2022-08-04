import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default function ImageCard({ imageUri, onPressImage }) {
  // handle press function
  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure  to delete this image?", [
        { text: "Yes", onPress: () => onPressImage(null) },
        { text: "No" },
      ]);
    }
  };

  // return the image card
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
