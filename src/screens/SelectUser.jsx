import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ margin: 20 }}>
          <Card>
            <Card.Title />
            <Card.Content></Card.Content>
            <Card.Cover
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2206/2206368.png",
              }}
            />
            <Card.Actions>
              <Button
                onPress={() => {
                  navigation.navigate("AdminLogin");
                }}
              >
                Admin Login
              </Button>
            </Card.Actions>
          </Card>
          <Card style={{ marginTop: 10 }}>
            <Card.Title />
            <Card.Content></Card.Content>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpdmVyfGVufDB8fDB8fHww",
              }}
            />
            <Card.Actions>
              <Button
                onPress={() => {
                  navigation.navigate("DriverLogin");
                }}
              >
                Driver Login
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SelectUser;
