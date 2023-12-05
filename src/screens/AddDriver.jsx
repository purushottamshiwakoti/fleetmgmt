import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddDriver = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [contact, setContact] = useState("");

  const handleAddDriver = async () => {
    try {
      const response = await axios.post(
        "https://fleetmgmt.vercel.app/api/driver",
        { fullname, email, password, license, contact }
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
        <Text style={{ fontSize: 20 }}>Add Driver</Text>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <TextInput
            style={{ marginTop: 10 }}
            label="Full Name"
            value={fullname}
            mode="outlined"
            onChangeText={(text) => setFullname(text)}
          />
          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            value={password}
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            label="License"
            value={license}
            mode="outlined"
            onChangeText={(text) => setLicense(text)}
          />
          <TextInput
            label="Contact Number"
            value={contact}
            mode="outlined"
            onChangeText={(text) => setContact(text)}
          />
        </View>
        <Button
          mode="elevated"
          disabled={contact.length < 1}
          onPress={handleAddDriver}
        >
          Add
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddDriver;
