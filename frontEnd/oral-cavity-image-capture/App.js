import React, { useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import RequestScreen from "./app/screens/RequestScreen";
import AddImagesScreen from "./app/screens/AddImagesScreen";
import PatientRegisterScreen from "./app/screens/newPatientRegisterScreen";
import Patient from "./app/screens/Patient";
import SelectPatientScreen from "./app/screens/SelectPatientScreen";

const Stack = createStackNavigator();
export default function App() {
  const fetchAPI = async () => {
    try {
      const res = await axios.get("http://192.168.1.2:3000/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name={"LoginScreen"}
          component={LoginScreen}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name={"RegisterScreen"}
          component={RegisterScreen}
        />
         */}
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"RegisterScreen"}
          component={RegisterScreen}
        />

        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"ProfileScreen"}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"RequestScreen"}
          component={RequestScreen}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"AddImagesScreen"}
          component={AddImagesScreen}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"SelectPatientScreen"}
          component={SelectPatientScreen}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
          }}
          name={"PatientRegisterScreen"}
          component={PatientRegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <LoginScreen />
    // <ProfileScreen />
    // <RegisterScreen />
    // <RequestScreen />
    // <Patient />
    // <PatientRegisterScreen />
    // <AddImagesScreen />
    // <SelectPatientScreen />
  );
}
