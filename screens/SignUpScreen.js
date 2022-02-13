import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import styles from '../styles/SignUpStyle';

import HeaderWithLogo from '../components/HeaderWithLogo';
import SignUpInput from '../components/SignUpInput';
import ContinueButton from '../components/ContinueButton';

const CancelButton = (props) => {
  return(
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={styles.cancelButton}
    >
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  )
}

const MainContent = () => {
  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContentContainer}
    >

      <Text style={styles.mainContentTitle}>Create your account</Text>

      <SignUpInput placeholder={"Name"} />
      <SignUpInput placeholder={"Phone number or email address"} />
      <SignUpInput placeholder={"Date of birth"} />
    </KeyboardAvoidingView>
  );
}

const SignUpButton = () => {

}

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <HeaderWithLogo />
      <CancelButton navigation={navigation}/>

      <MainContent />

      <ContinueButton text={"Next"} />
    </View>
  )
}

export default SignUpScreen