import {Text, View } from 'react-native'
import React, { useState } from 'react'

import styles from '../styles/LogInStyle';
import HeaderWithLogo from '../components/HeaderWithLogo';
import CancelButton from '../components/CancelButton';
import SignUpInput from '../components/SignUpInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Footer = (props) => {
  return(
    <View style={props.valid ? styles.buttonContainerActive : styles.buttonContainerInactive}>
      <TouchableOpacity
        onPress={props.login ? ()=>props.navigation.navigate("Tab") : props.valid ? props.action : null }
        style={styles.nextButton}
      >
        {props.login ? <Text style={styles.nextTitle}>Log In</Text> : <Text style={styles.nextTitle}>Next</Text>}
      </TouchableOpacity>
    </View>
  )
}

const LogInScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordField, setShowPasswordField] = useState(false);
  const [secureText, setSecureText] = useState(true);
  console.log(passwordField);
  

  const checkUsername = (value) => {
    setUsername(value);
    
    if(username.length >= 6 && username.indexOf(' ')===-1){
      setUsernameValid(true);
    }else{
      setUsernameValid(false);
    }
  }

  const showPasswordField = () => {
    setShowPasswordField(true);
    console.log("---",passwordField);
  }

  return (
    <View style={styles.container}>
      
      <HeaderWithLogo />
      <CancelButton navigation={navigation}/>

      <View
        style={styles.contentContainer}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.mainContentTitle}>To get started, first enter</Text>
          <Text style={styles.mainContentTitle}>your phone, email, or</Text>
          <Text style={styles.mainContentTitle}>@username</Text>
        </View>

        <SignUpInput placeholder={"Phone, email, or username"} value={username} action={value => checkUsername(value)} />

        {passwordField && <SignUpInput placeholder={"Password"} value={password} action={value => setPassword(value)} password={secureText} />}
        
        {
          passwordField
          &&
          <Text onPress={()=>setSecureText(!secureText)} style={styles.revealPassword}>
            {secureText ? "Reveal password" : "Hide password"}
          </Text>
        }
        
        <Footer valid={usernameValid} login={passwordField} action={showPasswordField} navigation={navigation}/>

        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </View>

    </View>
  )
}

export default LogInScreen;