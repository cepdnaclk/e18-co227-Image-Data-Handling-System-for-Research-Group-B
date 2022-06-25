import React, { useRef } from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

export default function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  style,
}) {
  const scrollToEnd = useRef();

  return (
    <View style={style}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true} //
        onContentSizeChange={() => scrollToEnd.current.scrollToEnd()}
        ref={scrollToEnd}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}

          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    height: "90%",
  },
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
