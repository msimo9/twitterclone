import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

const HeaderWithLogo = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.headerLogo}
        source={require('../assets/twitter_logo.png')}
      />
    </View>
  )
}

export default HeaderWithLogo

const styles = StyleSheet.create({
    header:{
        position: "absolute",
        top: Constants.statusBarHeight,
        width: "80%",
        height: "8%",
        justifyContent: "center",
        alignItems: "center",
    },
    headerLogo:{
        width: 30,
        height: 30,
    },
})