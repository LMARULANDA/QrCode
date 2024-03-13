import React from "react";
import { View, Text } from "react-native";
import repositories from "../data/repositories";

const QrcodeList = () => {
  return (
    <View>
      {repositories.map((repo) => (
        <View key={repo.id}>
          <Text>{repo.id}</Text>
          <Text>{repo.fullName}</Text>
          <Text>{repo.password}</Text>
          <Text>{repo.phoneNumber}</Text>
        </View>
      ))}
    </View>
  );
};

export default QrcodeList;
