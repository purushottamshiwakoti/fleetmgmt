import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Assign = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ margin: 20 }}>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("AssignVehicle");
          }}
        >
          Assign Vehicle
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("AssignTrip");
          }}
        >
          Assign Trip
        </Button>
      </View>
    </ScrollView>
  );
};

export default Assign;
