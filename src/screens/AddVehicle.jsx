import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Appbar, Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const AddVehicle = () => {
  const [vehicleModel, setVehicleModel] = React.useState("");
  const navigation = useNavigation();
  const [plateNumber, setPlateNumber] = React.useState("");

  const handleAddVehicle = async () => {
    try {
      const response = await axios.post(
        "https://fleetmgmt.vercel.app/api/vehicle",
        { vehicleModel, plateNumber }
      );
      const { message } = response.data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <Header title={"Add Vehicle"} />
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20 }}>Add Vehicle</Text>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <TextInput
            label="Vehicle Model"
            value={vehicleModel}
            mode="outlined"
            onChangeText={(text) => setVehicleModel(text)}
          />
          <TextInput
            style={{ marginTop: 10 }}
            label="Plate Number"
            value={plateNumber}
            mode="outlined"
            onChangeText={(text) => setPlateNumber(text)}
          />
        </View>
        <Button
          mode="elevated"
          disabled={plateNumber.length < 1}
          onPress={handleAddVehicle}
        >
          Add
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddVehicle;
