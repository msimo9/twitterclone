import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';


const ContinueButton = (props) => {
  return (
    <TouchableOpacity
        style={props.active ? styles.buttonActive : styles.buttonInactive}
        onPress={props.action}
    >
      <Text style={props.active ? styles.buttonTextActive : styles.buttonTextInactive}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ContinueButton

const styles = StyleSheet.create({
    buttonActive:{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#1DA1F2",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        right: "5%"
    },
    buttonInactive:{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#d1d1d1",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        right: "5%"
    },
    buttonTextActive:{
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold"
    },
    buttonTextInactive:{
        color: "#575757",
        fontSize: 10,
        fontWeight: "bold"
    }
})