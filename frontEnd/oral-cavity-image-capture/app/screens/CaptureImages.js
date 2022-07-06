import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ImageInputList from "../components/ImageInputList";
import IconButton from "../components/IconButton";
import TopPane from "../components/TopPane";

export default function CaptureImages() {
  const [imageUris, setImageUris] = useState([]);

  // add image
  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };

  // remove image
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri != uri));
  };

  return (
    <View style={styles.Screen}>
      <TopPane text={"Add image"} leftIcon={"left"} />
      <View style={styles.imageContainer}>
        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <IconButton
          iconName={"camera"}
          iconSize={24}
          onPress={console.log("submitted")}
        />
        <IconButton
          iconName={"images"}
          iconSize={24}
          onPress={console.log("submitted")}
        />
        <IconButton
          iconName={"chevron-right"}
          iconSize={24}
          onPress={console.log("submitted")}
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
    paddingTop: 25,
    paddingBottom: 60,
    // backgroundColor: "green",
  },
  imageContainer: {
    // backgroundColor: "red",
  },
  ButtonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  temp: {
    flexDirection: "column",
    height: 300,
  },
});
