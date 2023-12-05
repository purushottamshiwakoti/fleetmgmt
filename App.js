import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "./src/screens/Home";
import AddVehicle from "./src/screens/AddVehicle";
import AddDriver from "./src/screens/AddDriver";
import AddTrip from "./src/screens/AddTrip";
import { enGB, registerTranslation } from "react-native-paper-dates";
import View from "./src/screens/ViewThings";
import ViewThings from "./src/screens/ViewThings";
import ViewVehicles from "./src/screens/ViewVehicles";
import ViewTrips from "./src/screens/ViewTrips";
import ViewDriver from "./src/screens/ViewDriver";
import Assign from "./src/screens/Assign";
import AssignTrip from "./src/screens/AssignTrip";
import AssignVehicle from "./src/screens/AssignVehicle";
import Profile from "./src/screens/Profile";
import SelectUser from "./src/screens/SelectUser";
import AdminLogin from "./src/screens/AdminLogin";
import DriverLogin from "./src/screens/DriverLogin";
import DriverScreen from "./src/screens/DriverScreen";
import DriverViewVehicle from "./src/screens/DriverViewVehicle";
import DriverViewTrip from "./src/screens/DriverViewTrip";
import useAuthStore from "./src/hooks/useAuth";
import ViewAssignedVehicle from "./src/screens/ViewAssignedVehicle";
import ViewAssignedTrips from "./src/screens/ViewAssignedTrips";
registerTranslation("en-GB", enGB);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Views") {
            iconName = focused ? "eye" : "eye-outline";
          } else if (route.name === "Assign") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Views" component={ViewThings} />
      <Tab.Screen name="Assign" component={Assign} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  const { id } = useAuthStore();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!id ? (
          <Stack.Group>
            <Stack.Screen name="SelectUser" component={SelectUser} />
            <Stack.Screen name="AdminLogin" component={AdminLogin} />
            <Stack.Screen name="DriverLogin" component={DriverLogin} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="DriverScreen" component={DriverScreen} />
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="AddVehicle" component={AddVehicle} />
            <Stack.Screen name="AddDriver" component={AddDriver} />
            <Stack.Screen name="AddTrip" component={AddTrip} />
            <Stack.Screen name="ViewVehicles" component={ViewVehicles} />
            <Stack.Screen name="ViewTrips" component={ViewTrips} />
            <Stack.Screen name="ViewDriver" component={ViewDriver} />
            <Stack.Screen name="AssignTrip" component={AssignTrip} />
            <Stack.Screen name="AssignVehicle" component={AssignVehicle} />
            <Stack.Screen
              name="ViewAssignVehicle"
              component={ViewAssignedVehicle}
            />
            <Stack.Screen
              name="ViewAssignTrips"
              component={ViewAssignedTrips}
            />
            <Stack.Screen
              name="DriverViewVehicle"
              component={DriverViewVehicle}
            />
            <Stack.Screen name="DriverViewTrip" component={DriverViewTrip} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
