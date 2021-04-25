import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>();
  const [plants, setPlants] = useState<PlantProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [loading, setLoading] = useState(true);

  function handleEnvironmentSelected( environment : string ) {
    setEnvironmentSelected(environment);

    if(environment === 'all') return setFilteredPlants(plants);

    const filtered = plants?.filter(plant => plant.environments.includes(environment))
    setFilteredPlants(filtered);
  }
  
  useEffect(() => {
    // function to use async / await
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments', {
        params : {
          _sort: 'title',
          _order: 'asc'
        }
      });
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }
    fetchEnvironment();
  }, []);

  useEffect(() => {
    // function to use async / await
    async function fetchPlants() {
      const { data } = await api.get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc'
        }
      });
      setPlants(data);
      setFilteredPlants(data);
      setLoading(false);
    }
    fetchPlants();
  }, []);

  if(loading) return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Como é o ambiente</Text>
        <Text style={styles.subtitle}>onde vai colocar a sua planta?</Text>
      </View>

      <View>
        <FlatList 
          data={environments}
          renderItem={({item}) => (
            <EnvironmentButton
              title={item.title}
              isActive={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({item}) => <PlantCardPrimary data={item} />}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    margin: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})