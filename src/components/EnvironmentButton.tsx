import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string,
  isActive?: boolean,
}

export function EnvironmentButton({
  title,
  isActive = false,
  ...rest
} : EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        isActive && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        isActive && styles.textActive
      ]}>
        { title }
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    fontFamily: fonts.text,
    color: colors.heading,
    letterSpacing: .7,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});