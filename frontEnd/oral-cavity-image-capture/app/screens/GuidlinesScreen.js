import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import IconButton from "../components/IconButton";

function GuidlinesScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.screen}>
      {/* <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" /> */}
      <View style={{ flex: 4 }}>
        <Image
          style={styles.image}
          source={require("../assets/Images/background.jpeg")}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Dear user,</Text>
        <Text style={styles.heading}>Your data is safe with us</Text>
        <Text style={styles.text}>
          Kindly follow the safety procedures we have implemented to protect
          your images and the details of the patients.
        </Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#8fa5e3" : undefined}
          />
          <Text style={styles.paragraph}>By continuing you accept our</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("GuidlinesScreen")}
          >
            <Text style={styles.regTouch}> Terms of Use </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.ButtonContainer}>
        <IconButton
          iconName={"arrow-right"}
          iconSize={20}
          iconColor={"#fff"}
          onPress={() => {
            if (isChecked === false) {
              Alert.alert(
                "Please accept the Terms of use",
                "",

                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              );
            } else {
              navigation.navigate("RegisterScreen");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 2,
    padding: 30,
    alignItems: "center",
  },
  ButtonContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    margin: 10,
  },
  heading: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 21,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    marginEnd: 5,
    marginStart: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  regTouch: {
    color: "#c25ced",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});

export default GuidlinesScreen;
