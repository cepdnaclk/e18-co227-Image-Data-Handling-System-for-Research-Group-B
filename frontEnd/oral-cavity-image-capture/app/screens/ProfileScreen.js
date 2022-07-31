import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import ProfileCard from "../components/ProfileCard";
import SubmitButton from "../components/SubmitButton";
import client2 from "../API/client_refreshToken";
import { useLogin } from "../context/loginProvider";

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
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.header}>Profile</Text>
        </View>
        <View style={{ flex: 4 }}>
          <ProfileCard
            name={user.username}
            id={user.reg_no}
            email={user.email}
            image={require("../assets/Images/doctor.jpg")}
          />
        </View>
      </>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <SubmitButton
          // style={styles.submitButton}
          text="Add Image"
          iconName={"camerao"}
          iconSize={18}
          onPress={() => navigation.navigate("AddImagesScreen", {})}
        />
        <SubmitButton
          // style={styles.submitButton}
          text="Sign Out"
          iconName={"logout"}
          iconSize={18}
          onPress={logout}
        />
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
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Profile;
