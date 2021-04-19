import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../components/Button';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {
  const [ visibility, setVisibility ] = useState(false);

  function handleVisibility() { setVisibility(!visibility) };

  return (
    <SafeAreaView style={ styles.container }> 
      <Text style={ styles.title }>
        Rege { '\n'}
        as suas { '\n'}
        plantas
      </Text>
      { visibility && <Image source={ wateringImg } style={ styles.img }/> }
      <Text style={ styles.subtitle }>
        Esquece-se de regar as suas plantas? 
        A Plant Manager é perfeita para a/o ajudar a lembrar-se sempre que precisar.
      </Text>
      <Button title={ visibility ? 'esconder' : 'mostrar' } onPress={ handleVisibility } />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'space-between',
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
    width: 292,
    height: 284,
  }
})