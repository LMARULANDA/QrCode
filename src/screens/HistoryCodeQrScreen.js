import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function HistoryCodeQrScreen() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Cargar las personas almacenadas al iniciar la aplicación
    loadPeople();
  }, []);

 

  const loadPeople = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storedPeople = await AsyncStorage.multiGet(keys);
      const peopleArray = storedPeople.map(([key, value]) => JSON.parse(value));
      setPeople(peopleArray);
    } catch (error) {
      console.error('Error al cargar las personas:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.qrCodesContainer}>
        {people.map((person, index) => (
          <View key={index} style={styles.qrCodeContainer}>
            <QRCode
              value={JSON.stringify(person)}
              size={200}
              color="black"
              backgroundColor="white"
            />
            <Text style={styles.personInfo}>{`Nombre: ${person.name}\nCorreo electrónico: ${person.email}\nTeléfono: ${person.phone}`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    margin: 10,
  },
  personInfo: {
    marginTop: 10,
    textAlign: 'center',
  },
});
