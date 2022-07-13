import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./ProfileScreen";
import Requests_noSignout from "./Requests_noSignout";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = ({user}) => (
  
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: colors.primary,
      activeTintColor: colors.black,

      inactiveBackgroundColor: colors.secondary,
      inactiveTintColor: colors.primary,
    }}
  >
    <Tab.Screen
      name="ProfileScreen"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
      }}
      component={ProfileScreen}
      initialParams={{
        // pass the admin data object

        // this is only for testing purpose 👇
        user: {
          username: user.username,
          reg_no: user.reg_no,
          email: user.email,
        },
      }}
    />
    <Tab.Screen
      name="Requests_noSignout"
      component={Requests_noSignout}
      options={{
        title: "Requests",
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="account-arrow-left-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function AdminDoctor({ navigation, route }) {
  const thisUser = route.params.user;
 // console.log(thisUser);
  return <TabNavigator user={thisUser}/>;
}
