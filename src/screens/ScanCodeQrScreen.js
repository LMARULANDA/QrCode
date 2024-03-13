import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";

export default function ScanCodeQrScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Código QR escaneado: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Escanea el código QR</Text>
          <Button title="Escanear de nuevo" onPress={() => setScanned(false)} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scanText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
});
