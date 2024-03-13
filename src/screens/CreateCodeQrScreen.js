import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import UserForm from "../components/UserForm";

export default function CreateCodeQrScreen() {
  const [userInfo,setUserInfo] = useState({
      name:"",
      email:"",
      phone:"",
      date:null

  });


  const handleSubmit = (info) => {

    if (info && Object.values(info).every(value => value !== "" && value !== null)) {
      setUserInfo({
        ...info,
        date: new Date().toLocaleString()
      });
      alert("registro guardado exitosamente");
    } else {
      alert("La informacion del usuario contiene valores nulos.");
    }
       
  };

 

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <UserForm onSubmit={handleSubmit} />
      ) : (
        <View>
          <QRCode
          value={JSON.stringify(userInfo)}
          size={200}
          color="black"
          backgroundColor="white"
        />  
        {Object.keys(userInfo).map((key, index) => (
        <Text key={index}>
           {`${key}: ${
            key === "fecha" ? new Date(userInfo[key]).toLocaleDateString() : userInfo[key]
            }`}</Text>
        
        ))}
        </View>
       
        
        
      )}
      <Button title="Generar nuevo código QR" onPress={()=> setUserInfo(null)} />
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
