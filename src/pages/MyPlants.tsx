import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale'

import { Header } from '../components/Header';

import { loadPlant, PlantProps } from '../libs/storage';

import waterdropIcon from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWatering, setNextWatering] = useState<string>();
  
  useEffect(() => {
    async function loadStorageData() {
      const storagePlants = await loadPlant();
      
      const { dateTimeNotification, name } = storagePlants[0];

      const nextTime = formatDistance(
        new Date(dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextWatering(`Falta ${nextTime} para regar a tua ${name}`);
      
      setMyPlants(storagePlants);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          source={waterdropIcon} 
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>{nextWatering}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regas</Text>
        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary data={item}/>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    padding: 20,
    marginVertical: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
})