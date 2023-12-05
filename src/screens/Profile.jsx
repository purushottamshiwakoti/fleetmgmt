import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";

const Profile = () => {
  const { logout } = useAuthStore();
  return (
    <View style={{ margin: 50 }}>
      <Button
        mode="contained"
        onPress={() => {
          logout();
          alert("Logged out successfully");
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default Profile;
