import { StyleSheet, Text, View, TouchableOpacity, ProgressViewIOSComponent} from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

const ConfirmTweet = (props) => {
  return (
    <TouchableOpacity
        onPress={props.active ? ()=>props.callback() : null}
        style={props.active ? styles.addTweetButtonActive : styles.addTweetButtonInactive}
    >
      <Text style={props.active ? styles.tweetText : styles.tweetTextInactive}>Tweet</Text>
    </TouchableOpacity>
  )
}

export default ConfirmTweet

const styles = StyleSheet.create({
    addTweetButtonActive:{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#1DA1F2",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: Constants.statusBarHeight*1.5,
        right: "5%"
    },
    addTweetButtonInactive:{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#d1d1d1",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: Constants.statusBarHeight*1.5,
        right: "5%"
    },
    tweetText:{
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold"
    },
    tweetTextInactive:{
      color: "#575757",
      fontSize: 10,
      fontWeight: "bold"
    }
})