import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/HomeStyle'
import HeaderWithLogo from '../components/HeaderWithLogo'
import HeaderProfilePicture from '../components/HeaderProfilePicture'
import AddTweetButton from '../components/AddTweetButton'
import TweetsFeed from '../components/TweetsFeed'



const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <HeaderProfilePicture
          navigation={navigation}
        />
        <HeaderWithLogo />

        <TweetsFeed />

        <AddTweetButton navigation={navigation}/>
    </View>
  )
}

export default HomeScreen;