import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }

  return (
    <SafeAreaView style={ styles.container }>
      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        style={ styles.container }
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={ styles.content }>
            <View style={ styles.form }>
                <View style={ styles.header }>
                  <Text style={ styles.emoji }>
                    { isFilled ? '😁' : '🤨'}
                  </Text>
                  <Text style={ styles.title }>Como te chamas?</Text>
                </View>
                <TextInput
                  placeholder="adiciona o teu nome"
                  style={ [
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.green }
                  ] }
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
                />

                <View style={ styles.footer }>
                  <Button 
                    title="Continuar"
                    onPress={handleSubmit}
                  />
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content : {
    flex: 1,
    width: '100%'
  },
  form : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54,
    width: '100%',
  },
  header: {
    alignItems: 'center',
  },
  emoji : {
    fontSize: 44,
    marginBottom: 24,
  },
  input : {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  title : {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
});