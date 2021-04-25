import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';

import { PlantProps, savePlant } from '../libs/storage';

import waterdropIcon from '../assets/waterdrop.png';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant : PlantProps
}

export function PlantSave() {
  const [selectedDateTime, SetSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const navigation = useNavigation();
  
  const { plant } = route.params as Params;

  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android') setShowDatePicker(oldState => !oldState);
    if(dateTime && isBefore(dateTime, new Date())) {
      SetSelectedDateTime(new Date);
      return Alert.alert('Selecione uma data no futuro ⏰')
    }
    if(dateTime) SetSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerOnAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Que bom! Uma nova planta!',
        subtitle: `A ${plant.name} foi adicionada à sua coleção.`,
        buttonTitle: 'continuar',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });

    } catch(error) {
      Alert.alert('não foi possível gravar a sua planta 🤔')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri 
            uri={plant.photo}
            height={150}
            width={150}
          />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterdropIcon}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>
            Selecione a hora ideal para ser recordada/o
          </Text>

          {showDatePicker && (
            <DateTimePicker 
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerOnAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`${format(selectedDateTime, 'HH.mm')} alterar`}
              </Text>
            </TouchableOpacity>
          )}
          
          <Button 
            title="adicionar planta"
            onPress={handleSavePlant}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 16,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    marginTop: -60,
    // position: 'relative',
    // bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 16,
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});