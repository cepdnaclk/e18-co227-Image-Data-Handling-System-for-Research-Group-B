import React from "react";
import { StyleSheet, Text, SafeAreaView, View, StatusBar } from "react-native";
import * as SecureStore from "expo-secure-store";

import ProfileCard from "../components/ProfileCard";
import SubmitButton from "../components/SubmitButton";
import client2 from "../API/client_refreshToken";
import { useLogin } from "../context/loginProvider";
import Header from "../components/Header";

function Profile({ navigation }) {
  const { user, setUser, setIsLoggedIn, setRole } = useLogin();

  async function deleteToken(key) {
    await SecureStore.deleteItemAsync(key);
  }

  const logout = async () => {
    const res = await client2.post("/auth/logout", {}).catch((error) => {
      console.log("error: " + error.message);
    });
    // console.log(res.data.message);
    deleteToken("access");
    deleteToken("refresh");
    setIsLoggedIn(false);
    setRole(0);
    setUser({});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Header title={"Profile"} />
      </View>
      <StatusBar backgroundColor="#f1f1f1" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.profilecontainer}>
          <ProfileCard
            name={user.username}
            id={user.reg_no}
            email={user.email}
            image={require("../assets/Images/doctor.jpg")}
          />
        </View>
        <View style={styles.btnContainer}>
          <SubmitButton
            text="Add Image"
            iconName={"camerao"}
            iconSize={18}
            onPress={() => navigation.navigate("AddImagesScreen")}
          />
          <SubmitButton
            text="Sign Out"
            iconName={"logout"}
            iconSize={18}
            onPress={logout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  profilecontainer: {
    flex: 4,
    borderRadius: 30,
  },
  btnContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
