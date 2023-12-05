import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../components/Header";
import axios from "axios";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AssignTrip = () => {
  const [driver, setDriver] = useState([]);
  const [trip, setTrip] = useState([]);
  const [driverId, setDriverId] = useState(""); // State to store selected driver ID
  const [tripId, setTripId] = useState(""); // State to store selected trip ID

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(
          "https://fleetmgmt.vercel.app/api/driver"
        );
        console.log(response);
        const { driver } = response.data;
        setDriver(driver);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTrip = async () => {
      try {
        const response = await axios.get(
          "https://fleetmgmt.vercel.app/api/trip"
        );
        console.log(response);
        const { trip } = response.data;
        setTrip(trip);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDriver();
    fetchTrip();
  }, []);

  console.log(driver);

  const handleDriverSelection = (selectedItem, index) => {
    const selectedDriver = driver[index]; // Get the selected driver object
    setDriverId(selectedDriver.id); // Set the selected driver's ID
    console.log(selectedDriver.id); // Log the selected driver's ID
  };

  const handleTripSelection = (selectedItem, index) => {
    const selectedTrip = trip[index]; // Get the selected trip object
    setTripId(selectedTrip.id); // Set the selected trip's ID
    console.log(selectedTrip.id); // Log the selected trip's ID
  };

  const handleAssign = async () => {
    try {
      const response = await axios.post(
        "https://fleetmgmt.vercel.app/api/assignTrip",
        { tripId, deiverId: driverId }
      );
      const { message } = response.data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Header title={"Assign Trip"} />
      <Text>AssignTrip</Text>
      <View>
        <Text style={{ marginLeft: 50 }}>Assign Driver </Text>
        <SelectDropdown
          data={driver.map((item) => item.fullname)}
          onSelect={handleDriverSelection}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <View>
        <Text style={{ marginLeft: 50 }}>Assign Trip </Text>
        <SelectDropdown
          data={trip.map((item) => item.startLocation)}
          onSelect={handleTripSelection}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <Button mode="contained" onPress={handleAssign}>
        Assign
      </Button>
    </ScrollView>
  );
};

export default AssignTrip;
