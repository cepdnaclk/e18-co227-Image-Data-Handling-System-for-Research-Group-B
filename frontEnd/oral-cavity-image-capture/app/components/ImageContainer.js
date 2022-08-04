import React from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import ImageCard from "./ImageCard";

export default function ImageContainer({ imageUris = [], onRemoveImage }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <View key={uri} style={styles.image}>
            <ImageCard imageUri={uri} onPressImage={() => onRemoveImage(uri)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  image: {
    marginRight: 10,
    marginVertical: 10,
  },
});
