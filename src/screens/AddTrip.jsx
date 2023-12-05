import { View, Text, SafeAreaView } from "react-native";
import Header from "../components/Header";

import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddTrip = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const navigation = useNavigation();

  const onDismissSingle = React.useCallback(() => {
    setOpenStartDatePicker(false);
    setOpenEndDatePicker(false);
  }, [setOpenStartDatePicker, setOpenEndDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenStartDatePicker(false);
      setStartDate(params.date);
    },
    [setOpenStartDatePicker, setStartDate]
  );

  const onConfirmMingle = React.useCallback(
    (params) => {
      setOpenEndDatePicker(false);
      setEndDate(params.date);
    },
    [setOpenEndDatePicker, setEndDate]
  );

  console.log({ startDate });
  console.log({ endDate });

  const handleAddTrip = async () => {
    try {
      const response = await axios.post(
        "https://fleetmgmt.vercel.app/api/trip",
        { startDate, endDate, startLocation, endLocation }
      );
      const { message } = response.data;
      navigation.goBack();
      alert(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <Header title={"Add Trip"} />
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20 }}>Add Trip</Text>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            onPress={() => setOpenStartDatePicker(true)}
            uppercase={false}
            mode="elevated"
          >
            Start Date
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openStartDatePicker}
            onDismiss={onDismissSingle}
            date={startDate}
            onConfirm={onConfirmSingle}
          />

          <Button
            onPress={() => setOpenEndDatePicker(true)}
            uppercase={false}
            mode="elevated"
            style={{ marginTop: 15 }}
          >
            End Date
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openEndDatePicker}
            onDismiss={onDismissSingle}
            date={endDate}
            onConfirm={onConfirmMingle}
          />

          <TextInput
            label="Start Location"
            style={{ marginTop: 10 }}
            value={startLocation}
            mode="outlined"
            onChangeText={(text) => setStartLocation(text)}
          />
          <TextInput
            label="End Location"
            style={{ marginTop: 10 }}
            value={endLocation}
            mode="outlined"
            onChangeText={(text) => setEndLocation(text)}
          />
        </View>
        <Button
          mode="elevated"
          disabled={endLocation.length < 1}
          onPress={handleAddTrip}
        >
          Add Trip
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddTrip;
