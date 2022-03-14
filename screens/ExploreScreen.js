import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import styles from '../styles/ExploreStyle'
import HeaderProfilePicture from '../components/HeaderProfilePicture';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return(
    <View style={styles.header}>
      <TextInput style={styles.input}/>
    </View>
  )
}

const Settings = () => {
  return(
    <View style={styles.settingsContainer}>
      <Ionicons name={"settings-outline"} size={18} color={"#ffffff"} />
    </View>
  )
}

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderProfilePicture />
      <Header />
      <Settings />
    </View>
  )
}

export default ExploreScreen