import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import UserForm from "../components/UserForm";

export default function CreateCodeQrScreen() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    date: null
  });

  const [showForm, setShowForm] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const [showQrEntry, setShowQrEntry] = useState(false)



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

    setShowQrEntry(true)
    setShowForm(false)

  };

  const changeForm = () => {
    setShowForm(true),
      setShowQr(true)
  }

  const changeQr = () => {
    setShowQrEntry(false),
      setShowQr(false)
  }



  return (
    <View style={styles.container}>
      {!showQr &&
        <Button title="Generar nuevo código QR" onPress={() => changeForm()} />
      }

      {showQrEntry &&
        <View>
          <QRCode
            value={JSON.stringify(userInfo)}
            size={200}
            color="black"
            backgroundColor="white"
          />

          {Object.keys(userInfo).map((key, index) => (
            <View>
              <Text key={index}>
                {`${key}: ${key === "fecha" ? new Date(userInfo[key]).toLocaleDateString() : userInfo[key]
                  }`}</Text>
              </View>
          ))}

              <Button title="Listo" onPress={() => changeQr()} />
            </View>
      }


          {showForm &&
            <UserForm onSubmit={handleSubmit} />
          }




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
