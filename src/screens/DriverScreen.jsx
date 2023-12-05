import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import { Appbar, Button } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const DriverScreen = () => {
  const { logout, email, id } = useAuthStore();
  console.log({ email });
  console.log({ id });
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Appbar.Header style={{}}>
        <Appbar.Content title={`Welcome`} />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            logout();
            alert("Logged out successfully");
            navigation.navigate("SelectUser");
          }}
        />
      </Appbar.Header>
      <SafeAreaView>
        <Button
          onPress={() => {
            navigation.navigate("DriverViewVehicle");
          }}
        >
          View Vehicles
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("DriverViewTrip");
          }}
        >
          View Trips
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DriverScreen;
