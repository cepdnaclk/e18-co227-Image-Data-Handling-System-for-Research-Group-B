import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import ImageInputList from "../components/ImageInputList";
import AppText from "../components/AppText";
import SubmitButton from "../components/submitButton";

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
    <Screen>
      <AppText style={styles.title}>Captured Images</AppText>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        style={styles.scrollViewContainer}
      />

      <View styles={styles.SubmitButtonContainer}>
        <SubmitButton
          style={styles.SubmitButtonContainer}
          text=" Next"
          iconName={"login"}
          iconSize={18}
          onPress={console.log("submitted")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: "83%",
    marginTop: "5%",
  },

  SubmitButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
