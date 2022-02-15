import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect} from 'react';
import styles from '../styles/SignUpStyle';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import HeaderWithLogo from '../components/HeaderWithLogo';
import SignUpInput from '../components/SignUpInput';
import ContinueButton from '../components/ContinueButton';
import CancelButton from '../components/CancelButton';

export const userSignUp = (email, password, fullName, navigation) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Dear ", fullName, ", you signed up successfuly!");
      navigation.navigate("Tab");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}


const MainContent = (props) => {
  
  //state for user inputs
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //validation state for user inputs
  const [nameValid, setNameValid] = useState(false);
  const [contactValid, setContactValid] = useState(false);
  const [dateBirthValid, setDateBirthValid] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);


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
  if(!showPasswordField)
  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContentContainer}
    >

      <Text style={styles.mainContentTitle}>Create your account</Text>
      
      <SignUpInput placeholder={"Name"} value={name} action={checkName}/>
      <SignUpInput placeholder={"Phone number or email address"} action={checkContact}/>
      <SignUpInput placeholder={"Date of birth"} action={checkBirthDate}/>

      <ContinueButton text={"Next"} active={allValid ? true : false} action={() => allValid ? setShowPasswordField(true) : null} />
    </KeyboardAvoidingView>
  );
  else
  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContentContainer}
    >

      <Text style={styles.mainContentTitle}>Create your account</Text>
      
      <SignUpInput placeholder={"Email"} value={username} action={value => setUsername(value)}/>
      <SignUpInput placeholder={"Password"} value={password} action={value => setPassword(value)} password={true}/>

      <ContinueButton text={"Sign Up"} active={allValid && showPasswordField ? true : false} action={() => allValid && showPasswordField? userSignUp(username, password, name, props.navigation) : null} />
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