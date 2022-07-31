import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import RequestCard from "../components/newRequestCard";
import SubmitButton from "../components/SubmitButton";
import client from "../API/client";
import client2 from "../API/client_refreshToken";
import { useLogin } from "../context/loginProvider";

export default function RequestScreen() {
  const { role, setRole, setIsLoggedIn, setUser } = useLogin();
  const [requests, setRequests] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);

  const isFocused = useIsFocused();
  let isAdminDoc = false;

  if (role === 2) {
    isAdminDoc = true;
  }
  useEffect(() => {
    if (isFocused) {
      getRequest();
    }
  }, [isFocused]);

  const deleteToken = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

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

  const getRequest = async () => {
    await client
      .get("/admin/get-requests")
      .then((res) => {
        setRequests(res.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (reqid) => {
    setRequests(requests.filter((item) => item._id !== reqid));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Requests</Text>
        </View>
        <View style={styles.infoContainer}>
          {isLoaded ? (
            <FlatList
              data={requests}
              keyExtractor={(item) => {
                return item._id.toString();
              }}
              renderItem={({ item: requestItem }) => (
                <RequestCard
                  reqid={requestItem._id}
                  name={requestItem.username}
                  regno={requestItem.reg_no}
                  email={requestItem.email}
                  image={require("../assets/Images/doctor.jpg")}
                  onClick={handleRemove}
                />
              )}
            />
          ) : null}
        </View>
      </>
      {isAdminDoc ? (
        <View style={styles.buttonContainer}>
          <SubmitButton
            text=" Sign Out"
            iconName={"logout"}
            iconSize={18}
            onPress={logout}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
  },

  headerContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContainer: {
    flex: 6,
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
