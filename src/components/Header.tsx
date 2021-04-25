import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/user.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    async function getUsernameFromStorage() {
      const name = await AsyncStorage.getItem('@plant_manager:user');
      setUsername(name || '');
    }

    getUsernameFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image 
        source={userImg}
        style={styles.avatar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    marginTop: getStatusBarHeight(),
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 36,
    color: colors.heading,
  },
});