import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, TextInput, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Pressable } from 'react-native';
import { styles } from './shared';
import { RootStackScreenProps } from '../../types';

const CONSTANTS = {
  TITLE: 'Sign Up !',
  INPUT_TEXT: 'Enter Mobile Number',
  HELPER_TEXT: 'Already have an account ?',
  HELPER_BTN: 'Sign In',
  MAIN_BTN: 'Submit',
};

const RegisterScreen = ({ navigation }: RootStackScreenProps<'Register'>) => {
  const [phone, setPhone] = useState('+86');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef<any>(null);
  const { TITLE, INPUT_TEXT, HELPER_TEXT, HELPER_BTN, MAIN_BTN } = CONSTANTS;
  const onSubmit = async () => {};
  return (
    <KeyboardAvoidingView enabled style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.red}></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>{TITLE}</Text>
          <View style={styles.inputBox}>
            <Text style={{ fontSize: 20, color: 'grey' }}>{INPUT_TEXT}</Text>
            <TextInput value={phone} style={styles.phone} autoFocus keyboardType="phone-pad" textContentType="telephoneNumber" onChangeText={(text) => setPhone(text)} />
          </View>
          <View style={styles.helperBox}>
            <Text style={styles.helperTitle}>{HELPER_TEXT}</Text>
            <Button onPress={() => navigation.navigate('Login')} title={HELPER_BTN} />
          </View>

          <Pressable onPress={onSubmit} style={styles.submitBtn}>
            <Text style={styles.submitText}>{MAIN_BTN}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
