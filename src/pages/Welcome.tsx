import React from 'react';
import { 
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.wrapper }>
        <Text style={ styles.title }>
          Rege { '\n'}
          as suas { '\n'}
          plantas
        </Text>
        <Image
          source={ wateringImg }
          style={ styles.img }
          resizeMode="contain"
        />
        <Text style={ styles.subtitle }>
          Esquece-se de regar as suas plantas? 
          A Plant Manager é perfeita para a/o ajudar a lembrar-se sempre que precisar.
        </Text>
        <TouchableOpacity 
          style={ styles.button }
          activeOpacity={ .3 }
          onPress={handleStart}
        >
          <Feather
            name="chevron-right"
            style={ styles.buttonIcon } />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title : {
    fontFamily: fonts.heading,
    fontSize: 42,
    lineHeight: 48,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle : {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    color: colors.heading,
  },
  img : {
    height: Dimensions.get('window').width * .7,
  },
  button : {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    height: 56,
    paddingHorizontal: 16,
  },
  buttonIcon : {
    fontSize: 32,
    color: colors.white
  }
})