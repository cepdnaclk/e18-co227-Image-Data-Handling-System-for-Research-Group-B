import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import GuidlinesScreen from "../screens/GuidlinesScreen";
import RegisterScreen from "../screens/RegisterScreen";

const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="GuidlinesScreen" component={GuidlinesScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </RootStack.Navigator>
);

export default RootStackScreens;
