import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

import Profile from "../ProfileScreen";
import RequestScreen from "../newRequestScreen";

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#000"
      shifting={true}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#8fa5e3",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"home"} size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RequestSccreen"
        component={RequestScreen}
        options={{
          tabBarLabel: "Request",
          tabBarColor: "#8fa5d3",
          tabBarBadge: 9,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"user-plus"} size={18} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
