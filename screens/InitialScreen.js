import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/InitialStyle'
import BlueWideButton from '../components/BlueWideButton'
import HeaderWithLogo from '../components/HeaderWithLogo'

const Content = (props) => {
  return(
    <View style={styles.mainContent}>

      <Text style={styles.mainContentTitle}>
        See what's happening in the world right now.
      </Text>

      <BlueWideButton text={"Create account"} action={() => props.navigation.navigate("SignUp")}/>
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
