import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useLogin } from "../context/loginProvider";

import UserHome from "../screens/ProfileScreen";
import AdminHome from "../screens/newRequestScreen";
import AdminDoctorHome from "../screens/tabScreens/AdminDoctor";
import AddImagesScreen from "../screens/AddImagesScreen";
import SelectPatientScreen from "../screens/SelectPatientScreen";
import PatientRegisterScreen from "../screens/newPatientRegisterScreen";

const MainStack = createStackNavigator();

const MainStackScreens = ({ navigation }) => {
  const { role } = useLogin();

  let Home;

  if (role === 1) {
    Home = AdminDoctorHome;
  } else if (role === 2) {
    Home = AdminHome;
  } else {
    Home = UserHome;
  }
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name="Home"
        component={Home}
        // options={{
        //   title: "Profile",
        //   headerTransparent: false,
        //   headerShown: true,
        // }}
      />
      <MainStack.Screen
        name="AddImagesScreen"
        component={AddImagesScreen}
        options={{
          title: "Add Image",
          headerTransparent: true,
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="SelectPatientScreen"
        component={SelectPatientScreen}
        options={{
          title: "Select Patient",
          headerTransparent: true,
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="PatientRegisterScreen"
        component={PatientRegisterScreen}
        options={{
          title: "Register Patient",
          headerTransparent: true,
          headerShown: true,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
