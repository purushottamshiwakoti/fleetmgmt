import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import axios from "axios";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DriverViewVehicle = () => {
  const { logout, id } = useAuthStore();
  console.log(id);
  const [vehicle, setVehicle] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fechVehicle = async () => {
      try {
        const response = await axios.get(
          `https://fleetmgmt.vercel.app/api/assignVehicle/${id}`
        );
        const { assignVehicle } = response.data;
        console.log(response.data);
        setVehicle(assignVehicle);
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
        Vehicle Assigned to you
      </Text>
      <View style={{ margin: 20 }}>
        <View>
          {vehicle.length ? (
            vehicle.map((item) => (
              <List.Item
                title={`Vechile Model: ${item.vehicle.vehicleModel}`}
                description={`Plate Number: ${item.vehicle.plateNumber}`}
                key={item.id}
              />
            ))
          ) : (
            <Text>No Vehicles assigned yet</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DriverViewVehicle;
