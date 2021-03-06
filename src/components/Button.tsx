import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  TouchableOpacityProps,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest } : ButtonProps) {
  return (
    <TouchableOpacity 
      style={ styles.container }
      activeOpacity={ .3 }
      { ...rest }
    >
      <Text style={ styles.text }>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    height: 56,
    paddingHorizontal: 16,
  },
  text : {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
})