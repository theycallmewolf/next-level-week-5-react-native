import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { 
  RectButton,
  RectButtonProps
} from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import '../styles/colors';
import colors from '../styles/colors';
import '../styles/fonts';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string,
    photo: string,
    hour: string,
  }
}

export const PlantCardSecondary = ({ data, ...rest} : PlantProps) => {
  return (
    <RectButton style={ styles.container } {...rest}>
      <SvgFromUri 
        uri={ data.photo }
        width={50}
        height={50}
      />
      <Text style={ styles.title }>
        { data.name }
      </Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>regar às</Text>
        <Text style={styles.time}>{data.hour}</Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },
  title: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.heading,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 21,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
});