import React from 'react';
import { 
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {

  return (
    <SafeAreaView style={ styles.container }> 
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
      >
        <Feather
          name="chevron-right"
          style={ styles.buttonIcon } />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title : {
    fontSize: 42,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle : {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 40,
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