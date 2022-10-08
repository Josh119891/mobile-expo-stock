import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, TextInput, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Pressable } from 'react-native';
import { styles } from './shared';
import { RootStackScreenProps } from '../../types';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../database/firebase';

const CONSTANTS = {
  INPUT_TEXT: 'Enter OTP',
  HELPER_TEXT: 'Dont receive an OTP ?',
  HELPER_BTN: 'Resend OTP',
};

const OtpScreen = ({ navigation, route }: RootStackScreenProps<'Otp'>) => {
  const [code, setCode] = useState('');
  const { TITLE, MAIN_BTN, verificationId, confirmationResult } = route.params;
  const { INPUT_TEXT, HELPER_BTN, HELPER_TEXT } = CONSTANTS;
  const onRegister = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const { user } = await signInWithCredential(auth, credential);
      // pass uid into Welcome screen
      navigation.navigate('Welcome', { uid: (user as any).id });
    } catch (error: any) {
      alert(error.message);
    }
  };
  const onLogin = async () => {
    try {
      const { user } = await confirmationResult.confirm(code);
      // pass uid into TabOne screen
      navigation.navigate('Root', { screen: 'TabOne', params: { uid: user.uid } });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <KeyboardAvoidingView enabled style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.red}></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>{TITLE}</Text>
          <View style={styles.inputBox}>
            <Text style={{ fontSize: 20, color: 'grey' }}>{INPUT_TEXT}</Text>
            <TextInput
              secureTextEntry
              value={code}
              style={styles.phone}
              autoFocus
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={(text) => setCode(text)}
            />
          </View>
          <View style={styles.helperBox}>
            <Text style={styles.helperTitle}>{HELPER_TEXT}</Text>
            <Button onPress={() => {}} title={HELPER_BTN} />
          </View>

          <Pressable onPress={MAIN_BTN === 'Register' ? onRegister : onLogin} style={styles.submitBtn}>
            <Text style={styles.submitText}>{MAIN_BTN}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
