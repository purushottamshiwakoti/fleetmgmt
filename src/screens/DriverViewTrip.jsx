import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import axios from "axios";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DriverViewTrip = () => {
  const { logout, id } = useAuthStore();
  console.log(id);
  const [vehicle, setVehicle] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fechVehicle = async () => {
      try {
        const response = await axios.get(
          `https://fleetmgmt.vercel.app/api/assignTrip/${id}`
        );
        const { assignTrip } = response.data;
        console.log(response.data);
        setVehicle(assignTrip);
      } catch (error) {
        console.log(error);
      }
    };
    fechVehicle();
  }, []);
  console.log(vehicle);
  return (
    <View>
      <Appbar.Header style={{}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

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
      <Text style={{ marginLeft: 50, fontSize: 20 }}>
        {" "}
        Trip Assigned to you
      </Text>
      <View style={{ margin: 20 }}>
        <View>
          {vehicle.length ? (
            vehicle.map((item) => (
              <ScrollView horizontal>
                <List.Item
                  title={`Start Location: ${item.trip.startLocation} End Location:${item.trip.endLocation} `}
                  description={`Start Date: ${
                    item.trip.startDate.split("T")[0]
                  } End Date: ${item.trip.endDate.split("T")[0]}`}
                  key={item.id}
                />
              </ScrollView>
            ))
          ) : (
            <Text>No Trip assigned yet</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DriverViewTrip;
