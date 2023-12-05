import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ViewThings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ margin: 20 }}>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("ViewVehicles");
          }}
        >
          View Assigned Vehicles
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("ViewTrips");
          }}
        >
          View Trips
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("ViewDriver");
          }}
        >
          View Drivers
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("ViewAssignVehicle");
          }}
        >
          View Assigned Vehicles
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("ViewAssignTrips");
          }}
        >
          View Assigned Trips
        </Button>
      </View>
    </ScrollView>
  );
};

export default ViewThings;
