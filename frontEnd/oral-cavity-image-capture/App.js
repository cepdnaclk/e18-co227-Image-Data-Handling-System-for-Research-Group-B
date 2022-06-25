import React, {useEffect} from "react";
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import Profile from "./app/screens/Profile";
import Requests from "./app/screens/Requests";
import PatientRegisterScreen from "./app/screens/PatientRegisterScreen";
import SelectPatientScreen from "./app/screens/SelectPatientScreen";
import CaptureImages from "./app/screens/CaptureImages";


const Stack = createStackNavigator();
export default function App() {

  const fetchAPI = async () => {
    try{
      const res = await axios.get('http://192.168.8.153:3000/')
      console.log(res.data);

    }catch (error){
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen options={{headerShown: false}} name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name={'Profile'} component={Profile} />
        <Stack.Screen options={{headerShown: false}} name={'RegisterScreen'} component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name={'Requests'} component={Requests} />
        
      </Stack.Navigator>
    </NavigationContainer>

    // <RegisterScreen/>

  );
}
