import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, goback }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Appbar.Header style={{}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </View>
  );
};

export default Header;
