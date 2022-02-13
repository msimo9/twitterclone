import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect} from 'react';
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

const MainContent = (props) => {
  
  //state for user inputs
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  //validation state for user inputs
  const [nameValid, setNameValid] = useState(false);
  const [contactValid, setContactValid] = useState(false);
  const [dateBirthValid, setDateBirthValid] = useState(false);
  const [allValid, setAllValid] = useState(false);


  const checkValidation = () => {
    if(nameValid && contactValid && dateBirthValid){
      setAllValid(true);
    }else{
      setAllValid(false);
    }
  }

  const checkName = (value) => {
    setName(value);

    var regName = new RegExp(/^([\w]{3,})+\s+([\w\s]{3,})+$/i);
    if(regName.test(value)){
      setNameValid(true);
    }else{
      setNameValid(false);
    }
    checkValidation();
  }
  const checkContact = (value) => {
    setContact(value);
    if(value.length >= 8){
      setContactValid(true);
    }else{
      setContactValid(false);
    }
    checkValidation();
  }

  const checkBirthDate = (value) => {
    setDateOfBirth(value);
    if(value.length>=6){
      setDateBirthValid(true);
    }else{
      setDateBirthValid(false);
    }
    checkValidation();
  }

  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContentContainer}
    >

      <Text style={styles.mainContentTitle}>Create your account</Text>

      <SignUpInput placeholder={"Name"} value={name} action={checkName}/>
      <SignUpInput placeholder={"Phone number or email address"} action={checkContact}/>
      <SignUpInput placeholder={"Date of birth"} action={checkBirthDate}/>

      <ContinueButton text={"Next"} active={allValid ? true : false} action={() => allValid ? props.navigation.navigate("Tab") : null} />
    </KeyboardAvoidingView>
  );
}

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <HeaderWithLogo />
      <CancelButton navigation={navigation}/>

      <MainContent navigation={navigation}/>
    </View>
  )
}

export default SignUpScreen