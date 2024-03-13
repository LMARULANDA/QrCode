import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import UserForm from "../components/UserForm";

export default function CreateCodeQrScreen() {
  const [people, setPeople] = useState(null);
  

  const handleSubmit = async (info) => {
    try {
      await AsyncStorage.setItem(info.email, JSON.stringify(info));
      setPeople([...people, info]);
    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  };

  const handleNewQR = () => {
    //redireccionar a lista de qr o volver a cargar el componente 
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <UserForm onSubmit={handleSubmit} />
      ) : (
        <QRCode
          value={JSON.stringify(userInfo)}
          size={200}
          color="black"
          backgroundColor="white"
        />
      )}
      <Button title="Generar nuevo código QR" onPress={handleNewQR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
