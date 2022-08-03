import React, { useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import LoginProvider from "./app/context/loginProvider";
import MainNavigator from "./app/routes/loginNavigation";

export default function App() {
  const fetchAPI = async () => {
    try {
      const res = await axios.get("http://192.168.1.102:3000/");
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
      <LoginProvider>
        <MainNavigator />
      </LoginProvider>
    </NavigationContainer>
  );
}
