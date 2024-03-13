import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

export default function HistoryCodeQrScreen() {
  const [people, setPeople] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Cargar las personas almacenadas al iniciar la aplicación
    loadPeople();
  }, [selectedDate]);

 

  const loadPeople = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storedPeople = await AsyncStorage.multiGet(keys);
      const peopleArray = storedPeople.map(([key, value]) => JSON.parse(value));

      // filtrar personas por fecha seleccionada
      /*const filteredPeople = selectedDate ?   
            peopleArray.filter(person => person.fecha === selectedDate) : peopleArray;*/
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
            <Text style={styles.personInfo}>{`Nombre: ${person.name}\nCorreo electrónico: ${person.email}\nTeléfono: ${person.phone}\nFecha: ${person.timestamp}`}</Text>
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
