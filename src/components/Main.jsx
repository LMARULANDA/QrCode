import React from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import QrcodeList from "./QrcodeList";

const Main = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Text>Welcome to the main screen!</Text>
      <QrcodeList />
    </View>
  );
};

export default Main;
