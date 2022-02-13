import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/InitialStyle'
import BlueWideButton from '../components/BlueWideButton'
import HeaderWithLogo from '../components/HeaderWithLogo'
import ContinueWith from '../components/ContinueWith'
import OrDivider from '../components/OrDivider';
import TermsOfAgreement from '../components/TermsOfAgreement'

const Content = (props) => {
  return(
    <View style={styles.mainContent}>

      <Text style={styles.mainContentTitle}>
        See what's happening in the world right now.
      </Text>
      <ContinueWith text={"Continue with Google"} image={require('../assets/google_logo.png')} />
      <ContinueWith text={"Continue with Apple"} image={require('../assets/apple_logo.png')} />
      <OrDivider />
      <BlueWideButton text={"Create account"} action={() => props.navigation.navigate("SignUp")}/>
      <TermsOfAgreement />
    </View>
  );
}

const Footer = (props) => {
  return(
    <View style={styles.footer}>

      <Text style={styles.footerNormalText}>Have an account already?</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("LogIn")}
      >
        <Text style={styles.footerLinkText}>Log in</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const InitialScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderWithLogo />

      <Content navigation={navigation}/>

      <Footer navigation={navigation}/>
    </View>
  )
}

export default InitialScreen
