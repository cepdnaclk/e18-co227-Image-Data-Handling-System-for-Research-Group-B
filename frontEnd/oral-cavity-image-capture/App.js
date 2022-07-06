import React, { useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import RequestScreen from "./app/screens/RequestScreen";
import PatientRegisterScreen from "./app/screens/PatientRegisterScreen";
import Patient from "./app/screens/Patient";
import CaptureImages from "./app/screens/CaptureImages";

const Stack = createStackNavigator();
export default function App() {
  const fetchAPI = async () => {
    try {
      const res = await axios.get("http://192.168.8.153:3000/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="LoginScreen">
    //     <Stack.Screen options={{ headerShown: false }} name={"LoginScreen"} component={LoginScreen} />
    //     <Stack.Screen options={{ headerShown: false }} name={"RegisterScreen"} component={RegisterScreen} />
    //     <Stack.Screen options={{ headerShown: false }} name={"ProfileScreen"} component={ProfileScreen} />
    //     <Stack.Screen options={{ headerShown: false }} name={"RequestScreen"} component={RequestScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <LoginScreen />
    // <ProfileScreen />
    // <RegisterScreen />
    // <RequestScreen />
    // <Patient />
    // <PatientRegisterScreen />
    <CaptureImages />
  );
}
