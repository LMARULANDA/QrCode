import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCode from "react-native-qrcode-svg";
import UserForm from "../components/UserForm";

export default function CreateCodeQrScreen() {
  const [userInfo,setUserInfo] = useState(null);


  const handleSubmit = async (info) => {
    console.log('informe');
    if (info && Object.values(info).every(value => value !== null)) {
      console.log('info', info);
      setUserInfo(JSON.stringify(info));
      console.log("informa",userInfo);
      try {
        await AsyncStorage.setItem('userInfor', JSON.stringify(info));
        //setUserInfo(JSON.stringify(info));
        //setPeople([...people, info]);
  
      } catch (error) {
        console.error("Error al guardar la información:", error);
      }
    
    
    } else {
      console.error("la informacion de la persona contiene valores null ");
    }
   
  
  };

  const handleNewQR = () => {

    //setUserInfo(null);
   
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
