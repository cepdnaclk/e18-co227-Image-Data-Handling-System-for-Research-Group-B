import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useLogin } from "../context/loginProvider";
import RootStackScreens from "../stacks/RootStackScreens";
import MainStackScreens from "../stacks/MainStackScreens";

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainStackScreens /> : <RootStackScreens />;
};

export default MainNavigator;
