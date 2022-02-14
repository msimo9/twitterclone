import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from '../styles/HomeStyle'
import HeaderWithLogo from '../components/HeaderWithLogo'
import HeaderProfilePicture from '../components/HeaderProfilePicture'

const HomeScreen = () => {

  

  return (
    <View style={styles.container}>
        <HeaderProfilePicture />
        <HeaderWithLogo />
    </View>
  )
}

export default HomeScreen;